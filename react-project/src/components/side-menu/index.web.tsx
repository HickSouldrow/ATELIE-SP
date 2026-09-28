import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, Pressable, ScrollView, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';

import { styles } from './styles.web';
import { SideMenuItem, SideMenuProps } from './types';
import { useSideMenu } from './useSideMenu';

const DRAWER_WIDTH = 288;

const MenuRow: React.FC<{ item: SideMenuItem; active: boolean; onPress: () => void }> = ({
    item,
    active,
    onPress,
}) => {
    const [hovered, setHovered] = useState(false);
    const highlighted = hovered && !item.soon;

    const iconName = active && item.activeIcon ? item.activeIcon : item.icon;
    const iconColor = item.soon
        ? Colors.textDisabled
        : active
          ? Colors.accent
          : highlighted
            ? Colors.text
            : Colors.textMuted;

    return (
        <Pressable
            onPress={onPress}
            disabled={item.soon}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            accessibilityRole="menuitem"
            aria-selected={active}
            aria-disabled={!!item.soon}
            accessibilityLabel={item.soon ? `${item.label}, em breve` : item.label}
            style={[
                styles.item,
                highlighted && styles.itemHovered,
                active && styles.itemActive,
                item.soon && styles.itemSoon,
            ]}>
            {active && <View style={styles.activeIndicator} />}
            <Ionicons name={iconName} size={19} color={iconColor} />
            <Text
                style={[
                    styles.itemLabel,
                    highlighted && styles.itemLabelHovered,
                    active && styles.itemLabelActive,
                    item.soon && styles.itemLabelSoon,
                ]}
                numberOfLines={1}>
                {item.label}
            </Text>
            {item.soon && (
                <View style={styles.soonBadge}>
                    <Text style={styles.soonBadgeText}>Em breve</Text>
                </View>
            )}
        </Pressable>
    );
};

const SideMenuWeb: React.FC<SideMenuProps> = ({ visible, onClose, sections }) => {
    const [mounted, setMounted] = useState(visible);
    const [logoutHovered, setLogoutHovered] = useState(false);
    const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    const {
        username,
        sections: visibleSections,
        isActive,
        handleSelect,
        handleLogout,
        isLoggingOut,
    } = useSideMenu(onClose, sections);

    const initial = username?.trim()?.charAt(0)?.toUpperCase();

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
                useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
                toValue: visible ? 1 : 0,
                duration: 220,
                useNativeDriver: true,
            }),
        ]);

        animation.start(({ finished }) => {
            if (finished && !visible) {
                setMounted(false);
            }
        });

        return () => animation.stop();
    }, [visible, mounted]);

    // Esc fecha o menu.
    useEffect(() => {
        if (!visible || typeof document === 'undefined') {
            return;
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [visible, onClose]);

    if (!mounted) {
        return null;
    }

    return (
        <View style={styles.overlay}>
            <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
                <Pressable
                    style={styles.backdropPressable}
                    onPress={onClose}
                    accessibilityLabel="Fechar menu"
                />
            </Animated.View>

            <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]} aria-modal>
                <LinearGradient
                    colors={[Colors.accent, Colors.primary, Colors.primaryLight]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.edgeGlow}
                />

                <View style={styles.header}>
                    <Text style={styles.wordmark}>AteliêSP</Text>
                    <Pressable
                        onPress={onClose}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel="Fechar menu"
                        style={({ hovered }: any) => [styles.closeButton, hovered && styles.closeButtonHovered]}>
                        <Ionicons name="close" size={20} color={Colors.textMuted} />
                    </Pressable>
                </View>

                <View style={styles.userCard}>
                    <View style={styles.userAvatar}>
                        {initial ? (
                            <Text style={styles.userInitial}>{initial}</Text>
                        ) : (
                            <Ionicons name="person" size={16} color={Colors.text} />
                        )}
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName} numberOfLines={1}>
                            {username ?? 'Visitante'}
                        </Text>
                        <Text style={styles.userCaption}>Conta AteliêSP</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
                    {visibleSections.map((section) => (
                        <View key={section.key} style={styles.section}>
                            <Text style={styles.sectionTitle} accessibilityRole="header">
                                {section.title}
                            </Text>
                            {section.items.map((item) => (
                                <MenuRow
                                    key={item.key}
                                    item={item}
                                    active={isActive(item)}
                                    onPress={() => handleSelect(item)}
                                />
                            ))}
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.footer}>
                    <Pressable
                        onPress={handleLogout}
                        disabled={isLoggingOut}
                        onHoverIn={() => setLogoutHovered(true)}
                        onHoverOut={() => setLogoutHovered(false)}
                        accessibilityRole="button"
                        accessibilityLabel="Sair da conta"
                        style={[styles.item, logoutHovered && styles.logoutHovered]}>
                        {isLoggingOut ? (
                            <ActivityIndicator size="small" color={Colors.error} />
                        ) : (
                            <Ionicons name="log-out-outline" size={19} color={Colors.error} />
                        )}
                        <Text style={[styles.itemLabel, styles.logoutLabel]}>Sair</Text>
                    </Pressable>
                </View>
            </Animated.View>
        </View>
    );
};

export { SideMenuWeb as SideMenu };
export default SideMenuWeb;
