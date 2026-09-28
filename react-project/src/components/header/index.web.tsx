import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { SideMenu } from '@/components/side-menu';
import { Colors } from '@/constants/colors';

import { styles } from './styles.web';
import { HeaderProps } from './types';

const HeaderWeb: React.FC<HeaderProps> = ({ username, onEditProfile, style, ...rest }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const initial = username?.trim()?.charAt(0)?.toUpperCase();

    function handleGoHome() {
        if (pathname !== '/dashboard') {
            router.navigate('/dashboard' as any);
        }
    }

    function handleEditProfile() {
        setProfileOpen(false);
        onEditProfile?.();
    }

    return (
        <View style={[styles.wrapper, style]} {...rest}>
            <View style={styles.bar}>
                <Pressable
                    onPress={() => setMenuOpen(true)}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Abrir menu"
                    style={({ hovered }: any) => [styles.iconButton, hovered && styles.iconButtonHovered]}>
                    <Ionicons name="menu" size={22} color={Colors.white} />
                </Pressable>

                <Pressable
                    onPress={handleGoHome}
                    accessibilityRole="link"
                    accessibilityLabel="Ir para o início"
                    style={styles.wordmarkButton}>
                    <Text style={styles.wordmark}>AteliêSP</Text>
                </Pressable>

                <View style={styles.spacer} />

                <View>
                    <Pressable
                        onPress={() => setProfileOpen((prev) => !prev)}
                        hitSlop={8}
                        style={({ hovered }: any) => [styles.avatar, hovered && styles.avatarHovered]}>
                        {initial ? (
                            <Text style={styles.avatarInitial}>{initial}</Text>
                        ) : (
                            <Ionicons name="person" size={16} color={Colors.white} />
                        )}
                    </Pressable>

                    {profileOpen && (
                        <>
                            <Pressable style={styles.dropdownBackdrop} onPress={() => setProfileOpen(false)} />
                            <View style={styles.dropdown}>
                                {!!username && <Text style={styles.dropdownUsername}>{username}</Text>}
                                <Pressable
                                    onPress={handleEditProfile}
                                    style={({ hovered }: any) => [
                                        styles.dropdownItem,
                                        hovered && styles.dropdownItemHovered,
                                    ]}>
                                    <Ionicons name="create-outline" size={16} color={Colors.brandLight} />
                                    <Text style={styles.dropdownItemLabel}>Editar perfil</Text>
                                </Pressable>
                            </View>
                        </>
                    )}
                </View>
            </View>

            <LinearGradient
                colors={[Colors.neon.pink, Colors.neon.purple, Colors.brandLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.glowLine}
            />

            <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
        </View>
    );
};

export { HeaderWeb as Header };
export default HeaderWeb;
