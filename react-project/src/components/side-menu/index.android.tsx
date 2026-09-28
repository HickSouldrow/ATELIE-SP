import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    BackHandler,
    Easing,
    Pressable,
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/colors';

import { styles } from './styles.android';
import { SideMenuItem, SideMenuProps } from './types';
import { useSideMenu } from './useSideMenu';

const MAX_DRAWER_WIDTH = 296;

const MenuRow: React.FC<{ item: SideMenuItem; active: boolean; onPress: () => void }> = ({
    item,
    active,
    onPress,
}) => {
    const iconName = active && item.activeIcon ? item.activeIcon : item.icon;
    const iconColor = item.soon ? Colors.textDisabled : active ? Colors.accent : Colors.textMuted;

    return (
        <Pressable
            onPress={onPress}
            disabled={item.soon}
            android_ripple={{ color: Colors.primarySoft }}
            accessibilityRole="menuitem"
            aria-selected={active}
            aria-disabled={!!item.soon}
            accessibilityLabel={item.soon ? `${item.label}, em breve` : item.label}
            style={[styles.item, active && styles.itemActive]}>
            {active && <View style={styles.activeIndicator} />}
            <Ionicons name={iconName} size={20} color={iconColor} />
            <Text
                style={[styles.itemLabel, active && styles.itemLabelActive, item.soon && styles.itemLabelSoon]}
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

const SideMenuAndroid: React.FC<SideMenuProps> = ({ visible, onClose, sections }) => {
    const [mounted, setMounted] = useState(visible);
    const insets = useSafeAreaInsets();
    const { width: screenWidth } = useWindowDimensions();
    const drawerWidth = Math.min(MAX_DRAWER_WIDTH, Math.round(screenWidth * 0.84));
    const translateX = useRef(new Animated.Value(-drawerWidth)).current;
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
                toValue: visible ? 0 : -drawerWidth,
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

            <Animated.View
                style={[styles.drawer, { width: drawerWidth, transform: [{ translateX }] }]}
                accessibilityViewIsModal>
                <LinearGradient
                    colors={[Colors.accent, Colors.primary, Colors.primaryLight]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.edgeGlow}
                />

                <View style={[styles.safeArea, { paddingTop: insets.top + 14, paddingBottom: insets.bottom + 12 }]}>
                    <View style={styles.header}>
                        <Text style={styles.wordmark}>AteliêSP</Text>
                        <Pressable
                            onPress={onClose}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel="Fechar menu"
                            android_ripple={{ color: Colors.whiteAlpha['12'], borderless: true }}
                            style={styles.closeButton}>
                            <Ionicons name="close" size={22} color={Colors.textMuted} />
                        </Pressable>
                    </View>

                    <View style={styles.userCard}>
                        <View style={styles.userAvatar}>
                            {initial ? (
                                <Text style={styles.userInitial}>{initial}</Text>
                            ) : (
                                <Ionicons name="person" size={18} color={Colors.text} />
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
                            android_ripple={{ color: Colors.errorPressed }}
                            accessibilityRole="button"
                            accessibilityLabel="Sair da conta"
                            style={styles.item}>
                            {isLoggingOut ? (
                                <ActivityIndicator size="small" color={Colors.error} />
                            ) : (
                                <Ionicons name="log-out-outline" size={20} color={Colors.error} />
                            )}
                            <Text style={[styles.itemLabel, styles.logoutLabel]}>Sair</Text>
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

export { SideMenuAndroid as SideMenu };
export default SideMenuAndroid;
