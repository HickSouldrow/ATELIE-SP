import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/colors';

import { styles } from './styles.android';
import { SideMenuItem, SideMenuProps } from './types';

const DEFAULT_ITEMS: SideMenuItem[] = [
    { key: 'inicio', label: 'Início', icon: 'home-outline' },
    { key: 'mapa', label: 'Mapa de murais', icon: 'map-outline' },
    { key: 'comunidade', label: 'Comunidade', icon: 'people-outline' },
    { key: 'favoritos', label: 'Favoritos', icon: 'heart-outline' },
    { key: 'sobre', label: 'Sobre o projeto', icon: 'information-circle-outline' },
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
    const [activeKey, setActiveKey] = useState(items[0]?.key);
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

    function handleSelect(key: string) {
        setActiveKey(key);
        onClose();
    }

    if (!mounted) {
        return null;
    }

    return (
        <Modal visible={mounted} transparent animationType="none" onRequestClose={onClose}>
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

                    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
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
                                    active={item.key === activeKey}
                                    onPress={() => handleSelect(item.key)}
                                />
                            ))}
                        </ScrollView>

                        <Text style={styles.footerNote}>Mais páginas em breve</Text>
                    </SafeAreaView>
                </Animated.View>
            </View>
        </Modal>
    );
};

export { SideMenuAndroid as SideMenu };
export default SideMenuAndroid;
