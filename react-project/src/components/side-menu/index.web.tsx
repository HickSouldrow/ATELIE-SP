import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';

import { styles } from './styles.web';
import { SideMenuItem, SideMenuProps } from './types';

const DEFAULT_ITEMS: SideMenuItem[] = [
    { key: 'inicio', label: 'Início', icon: 'home-outline' },
    { key: 'mapa', label: 'Mapa de murais', icon: 'map-outline' },
    { key: 'comunidade', label: 'Comunidade', icon: 'people-outline' },
    { key: 'favoritos', label: 'Favoritos', icon: 'heart-outline' },
    { key: 'sobre', label: 'Sobre o projeto', icon: 'information-circle-outline' },
    { key: 'config', label: 'Configurações', icon: 'settings-outline' },
];

const DRAWER_WIDTH = 268;

const MenuRow: React.FC<{ item: SideMenuItem; onPress: () => void }> = ({ item, onPress }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Pressable
            onPress={onPress}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            style={[styles.item, hovered && styles.itemHovered]}>
            <Ionicons
                name={item.icon}
                size={18}
                color={hovered ? Colors.neon.cyan : Colors.whiteAlpha['65']}
            />
            <Text style={[styles.itemLabel, hovered && styles.itemLabelHovered]}>{item.label}</Text>
        </Pressable>
    );
};

const SideMenuWeb: React.FC<SideMenuProps> = ({ visible, onClose, items = DEFAULT_ITEMS }) => {
    const [mounted, setMounted] = useState(visible);
    const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            setMounted(true);
        }

        Animated.timing(translateX, {
            toValue: visible ? 0 : -DRAWER_WIDTH,
            duration: 220,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start(() => {
            if (!visible) {
                setMounted(false);
            }
        });

        Animated.timing(backdropOpacity, {
            toValue: visible ? 1 : 0,
            duration: 220,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    if (!mounted) {
        return null;
    }

    return (
        <View style={styles.overlay} pointerEvents="box-none">
            <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
                <Pressable style={styles.backdropPressable} onPress={onClose} />
            </Animated.View>

            <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
                <LinearGradient
                    colors={[Colors.neon.pink, Colors.neon.cyan, Colors.neon.yellow]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.edgeGlow}
                />

                <View style={styles.header}>
                    <Text style={styles.wordmark}>AteliêSP</Text>
                    <Pressable onPress={onClose} hitSlop={8} style={styles.closeButton}>
                        <Ionicons name="close" size={20} color={Colors.whiteAlpha['65']} />
                    </Pressable>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
                    {items.map((item) => (
                        <MenuRow key={item.key} item={item} onPress={onClose} />
                    ))}
                </ScrollView>

                <Text style={styles.footerNote}>Mais páginas em breve</Text>
            </Animated.View>
        </View>
    );
};

export { SideMenuWeb as SideMenu };
export default SideMenuWeb;
