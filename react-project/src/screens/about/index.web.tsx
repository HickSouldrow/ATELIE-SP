import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import { AuthBackground } from '@/components/auth-background';
import { Header } from '@/components/header';
import { Colors } from '@/constants/colors';

import { styles } from './styles.web';
import { useAbout } from './useAbout';

const AboutWeb: React.FC = () => {
    const { auth, developers, failedAvatars, openProfile, markAvatarFailed } = useAbout();

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.screen}>
                <AuthBackground source={require('../../../assets/murais/mural-05.png')} />

                <Header username={auth?.username} style={styles.header} />

                <ScrollView
                    style={styles.scrollArea}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scroll}>
                    <View style={styles.content}>
                        <Text style={styles.eyebrow}>Sobre nós</Text>
                        <Text style={styles.title}>Quem faz o AteliêSP</Text>
                        <Text style={styles.subtitle}>
                            O AteliêSP nasceu para reunir os murais e grafites de São Paulo num só lugar.
                            Conheça os desenvolvedores por trás do projeto.
                        </Text>

                        <View style={styles.grid}>
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
                                        style={({ hovered }: any) => [
                                            styles.githubButton,
                                            hovered && styles.githubButtonHovered,
                                        ]}>
                                        <Ionicons name="logo-github" size={18} color={Colors.white} />
                                        <Text style={styles.githubButtonText}>Ver no GitHub</Text>
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default AboutWeb;
