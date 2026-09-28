import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SideMenu } from '@/components/side-menu';
import { Colors } from '@/constants/colors';

import { styles } from './styles.android';
import { useAbout } from './useAbout';

const AboutAndroid: React.FC = () => {
    const { developers, failedAvatars, openProfile, markAvatarFailed } = useAbout();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ImageBackground
                source={require('../../../assets/murais/mural-05.png')}
                style={styles.screen}
                resizeMode="cover">
                <View style={styles.overlay}>
                <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                    <View style={styles.topBar}>
                        <Pressable
                            onPress={() => setMenuOpen(true)}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel="Abrir menu"
                            style={styles.menuButton}>
                            <Ionicons name="menu" size={22} color={Colors.white} />
                        </Pressable>
                        <Pressable
                            onPress={() => router.navigate('/dashboard' as any)}
                            hitSlop={8}
                            accessibilityRole="link"
                            accessibilityLabel="Ir para o início">
                            <Text style={styles.wordmark}>AteliêSP</Text>
                        </Pressable>
                    </View>

                    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                        <Text style={styles.eyebrow}>Sobre nós</Text>
                        <Text style={styles.title}>Quem faz o AteliêSP</Text>
                        <Text style={styles.subtitle}>
                            O AteliêSP nasceu para reunir os murais e grafites de São Paulo num só lugar.
                            Conheça os desenvolvedores por trás do projeto.
                        </Text>

                        {developers.map((dev) => (
                            <View key={dev.github} style={styles.card}>
                                <View style={styles.avatarRing}>
                                    {failedAvatars[dev.github] ? (
                                        <View style={styles.avatarFallback}>
                                            <Text style={styles.avatarInitial}>
                                                {dev.name.charAt(0).toUpperCase()}
                                            </Text>
                                        </View>
                                    ) : (
                                        <Image
                                            source={{ uri: dev.avatarUrl }}
                                            style={styles.avatar}
                                            onError={() => markAvatarFailed(dev.github)}
                                        />
                                    )}
                                </View>

                                <Text style={styles.name}>{dev.name}</Text>
                                <Text style={styles.role}>{dev.role}</Text>
                                <Text style={styles.handle}>@{dev.github}</Text>

                                <Pressable
                                    onPress={() => openProfile(dev.profileUrl)}
                                    accessibilityRole="link"
                                    accessibilityLabel={`Abrir GitHub de ${dev.name}`}
                                    android_ripple={{ color: Colors.whiteAlpha['12'] }}
                                    style={styles.githubButton}>
                                    <Ionicons name="logo-github" size={18} color={Colors.white} />
                                    <Text style={styles.githubButtonText}>Ver no GitHub</Text>
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                </SafeAreaView>
                </View>
            </ImageBackground>

            <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
};

export default AboutAndroid;
