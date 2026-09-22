import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { SideMenu } from '@/components/side-menu';
import { Colors } from '@/constants/colors';

import { styles } from './styles.web';
import { HeaderProps } from './types';

const HeaderWeb: React.FC<HeaderProps> = ({ username, onEditProfile, style, ...rest }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const initial = username?.trim()?.charAt(0)?.toUpperCase();

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
                    style={({ hovered }) => [styles.iconButton, hovered && styles.iconButtonHovered]}>
                    <Ionicons name="menu" size={22} color={Colors.white} />
                </Pressable>

                <Text style={styles.wordmark}>AteliêSP</Text>

                <View style={styles.spacer} />

                <View>
                    <Pressable
                        onPress={() => setProfileOpen((prev) => !prev)}
                        hitSlop={8}
                        style={({ hovered }) => [styles.avatar, hovered && styles.avatarHovered]}>
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
                                    style={({ hovered }) => [
                                        styles.dropdownItem,
                                        hovered && styles.dropdownItemHovered,
                                    ]}>
                                    <Ionicons name="create-outline" size={16} color={Colors.neon.cyan} />
                                    <Text style={styles.dropdownItemLabel}>Editar perfil</Text>
                                </Pressable>
                            </View>
                        </>
                    )}
                </View>
            </View>

            <LinearGradient
                colors={[Colors.neon.pink, Colors.neon.cyan, Colors.neon.yellow]}
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
