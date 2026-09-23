import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { MuralCarousel } from '@/components/mural-carousel';
import { Colors } from '@/constants/colors';

import { styles } from './styles.android';
import { useDashboard } from './useDashboard';

const MISSION_ITEMS = [
    {
        icon: 'map-outline' as const,
        title: 'Mapa de murais',
        text: 'Cada obra marcada no lugar exato onde ela existe.',
    },
    {
        icon: 'people-outline' as const,
        title: 'Comunidade',
        text: 'Artistas e curiosos contando a história de cada parede.',
    },
    {
        icon: 'heart-outline' as const,
        title: 'Favoritos',
        text: 'Guarde os murais que você já visitou ou quer visitar.',
    },
];

const DashboardAndroid: React.FC = () => {
    const { auth, handleLogout, handleEditProfile } = useDashboard();

    const initial = auth?.username?.trim()?.charAt(0)?.toUpperCase();

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.screen}>
                <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                    <View style={styles.topBar}>
                        <View>
                            <Text style={styles.wordmark}>AteliêSP</Text>
                            <Text style={styles.greeting}>Olá, {auth?.username ?? 'visitante'} 👋</Text>
                        </View>

                        <Pressable
                            onPress={handleEditProfile}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel="Editar perfil"
                            style={styles.avatar}>
                            {initial ? (
                                <Text style={styles.avatarInitial}>{initial}</Text>
                            ) : (
                                <Ionicons name="person" size={16} color={Colors.white} />
                            )}
                        </Pressable>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                        <View style={styles.gpsCard}>
                            <View style={styles.gpsIconWrap}>
                                <Ionicons name="location-outline" size={26} color={Colors.neon.cyan} />
                            </View>
                            <Text style={styles.gpsTitle}>Mapa de grafites perto de você</Text>
                            <Text style={styles.gpsText}>
                                Em breve, os murais públicos mapeados vão aparecer aqui, com os locais
                                que você já visitou.
                            </Text>
                            <View style={styles.gpsBadge}>
                                <Text style={styles.gpsBadgeText}>Em construção</Text>
                            </View>
                        </View>

                        <MuralCarousel title="Do asfalto pra tela" />

                        <View style={styles.mission}>
                            <Text style={styles.missionHeading}>O que vem por aí</Text>

                            {MISSION_ITEMS.map((item) => (
                                <View key={item.title} style={styles.missionCard}>
                                    <View style={styles.missionIconWrap}>
                                        <Ionicons name={item.icon} size={18} color={Colors.neon.cyan} />
                                    </View>
                                    <View style={styles.missionCardBody}>
                                        <Text style={styles.missionCardTitle}>{item.title}</Text>
                                        <Text style={styles.missionCardText}>{item.text}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <View style={styles.footer}>
                            <Button title="Sair" onPress={handleLogout} />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </>
    );
};

export default DashboardAndroid;
