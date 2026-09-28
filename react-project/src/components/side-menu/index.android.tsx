import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, BackHandler, Easing, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/colors';

import { styles } from './styles.android';
import { SideMenuItem, SideMenuProps } from './types';

const DEFAULT_ITEMS: SideMenuItem[] = [
    { key: 'inicio', label: 'Início', icon: 'home-outline', route: '/dashboard' },
    { key: 'mapa', label: 'Mapa de murais', icon: 'map-outline' },
    { key: 'comunidade', label: 'Comunidade', icon: 'people-outline' },
    { key: 'favoritos', label: 'Favoritos', icon: 'heart-outline' },
    { key: 'sobre', label: 'Sobre nós', icon: 'information-circle-outline', route: '/about' },
    { key: 'config', label: 'Configurações', icon: 'settings-outline' },
];

const DRAWER_WIDTH = 272;

const MenuRow: React.FC<{ item: SideMenuItem; active: boolean; onPress: () => void }> = ({
    item,
    active,
    onPress,
}) => {
    return (
        <Pressable
            onPress={onPress}
            android_ripple={{ color: Colors.brandAlpha["18"] }}
            style={[styles.item, active && styles.itemActive]}>
            <Ionicons
                name={item.icon}
                size={19}
                color={active ? Colors.brandLight : Colors.whiteAlpha['65']}
            />
            <Text style={[styles.itemLabel, active && styles.itemLabelActive]}>{item.label}</Text>
        </Pressable>
    );
};

const SideMenuAndroid: React.FC<SideMenuProps> = ({ visible, onClose, items = DEFAULT_ITEMS }) => {
    const [mounted, setMounted] = useState(visible);
    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();
    const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    // 1) Monta o menu quando pedem para abrir.
    useEffect(() => {
        if (visible) {
            setMounted(true);
        }
    }, [visible]);

    // 2) Anima SOMENTE depois que o menu está montado. Antes o Animated.timing
    //    (native driver) disparava antes do Modal existir e o drawer ficava
    //    parado fora da tela (translateX = -DRAWER_WIDTH, backdrop opaco em 0).
    useEffect(() => {
        if (!mounted) {
            return;
        }

        const animation = Animated.parallel([
            Animated.timing(translateX, {
                toValue: visible ? 0 : -DRAWER_WIDTH,
                duration: 220,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: false,
            }),
            Animated.timing(backdropOpacity, {
                toValue: visible ? 1 : 0,
                duration: 220,
                useNativeDriver: false,
            }),
        ]);

        animation.start(({ finished }) => {
            if (finished && !visible) {
                setMounted(false);
            }
        });

        return () => animation.stop();
    }, [visible, mounted]);

    // Botão voltar do Android fecha o menu (antes isso vinha do Modal).
    useEffect(() => {
        if (!visible) {
            return;
        }
        const sub = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose();
            return true;
        });
        return () => sub.remove();
    }, [visible, onClose]);

    function handleSelect(item: SideMenuItem) {
        onClose();
        if (item.route && item.route !== pathname) {
            router.navigate(item.route as any);
        }
    }

    if (!mounted) {
        return null;
    }

    return (
        <View style={styles.overlay}>
            <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
                <Pressable style={styles.backdropPressable} onPress={onClose} />
            </Animated.View>

            <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
                <LinearGradient
                    colors={[Colors.neon.pink, Colors.neon.purple, Colors.brandLight]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.edgeGlow}
                />

                <View style={[styles.safeArea, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}>
                    <View style={styles.header}>
                        <Text style={styles.wordmark}>AteliêSP</Text>
                        <Pressable
                            onPress={onClose}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel="Fechar menu"
                            style={styles.closeButton}>
                            <Ionicons name="close" size={20} color={Colors.whiteAlpha['65']} />
                        </Pressable>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
                        {items.map((item) => (
                            <MenuRow
                                key={item.key}
                                item={item}
                                active={!!item.route && item.route === pathname}
                                onPress={() => handleSelect(item)}
                            />
                        ))}
                    </ScrollView>

                    <Text style={styles.footerNote}>Mais páginas em breve</Text>
                </View>
            </Animated.View>
        </View>
    );
};

export { SideMenuAndroid as SideMenu };
export default SideMenuAndroid;
