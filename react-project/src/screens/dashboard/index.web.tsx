import React from 'react';
import { Stack } from 'expo-router';
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Button } from '@/components/button';
import { Header } from '@/components/header';
import { MuralCarousel } from '@/components/mural-carousel';
import { Colors } from '@/constants/colors';

import { styles } from './styles.web';
import { useDashboard } from './useDashboard';

const MISSION_ITEMS = [
    {
        icon: '🗺️',
        title: 'Mapa de murais',
        text: 'Cada obra marcada no lugar exato onde ela existe, pra você sair de casa sabendo aonde ir.',
    },
    {
        icon: '👥',
        title: 'Comunidade',
        text: 'Artistas e curiosos contando a história por trás de cada parede pintada.',
    },
    {
        icon: '❤️',
        title: 'Favoritos',
        text: 'Guarde os murais que você já visitou e os que ainda estão na sua lista.',
    },
];

const DashboardWeb: React.FC = () => {
    const { auth, handleLogout, handleEditProfile } = useDashboard();
    const { width } = useWindowDimensions();
    const isWide = width >= 780;

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.screen}>
                <Header username={auth?.username} onEditProfile={handleEditProfile} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.hero}>
                        <Image
                            source={require('../../../assets/murais/mural-01.png')}
                            style={styles.heroImage}
                            resizeMode="cover"
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(20,6,7,0.55)', Colors.background]}
                            locations={[0, 0.55, 1]}
                            style={styles.heroScrim}
                        />
                        <View style={styles.heroContent}>
                            <Text style={styles.eyebrow}>Olá, {auth?.username ?? 'visitante'}</Text>
                            <Text style={styles.heroTitle}>A cidade também é tela.</Text>
                            <Text style={styles.heroSubtitle}>
                                O AteliêSP reúne, num só lugar, os murais e grafites que dão cor a São
                                Paulo — feitos por quem pinta a rua todos os dias.
                            </Text>
                        </View>
                    </View>

                    <MuralCarousel />

                    <View style={styles.mission}>
                        <Text style={styles.missionHeading}>O que vem por aí</Text>
                        <Text style={styles.missionSubheading}>
                            O AteliêSP ainda está sendo construído — essas são as próximas frentes.
                        </Text>

                        <View style={[styles.missionGrid, isWide && styles.missionGridWide]}>
                            {MISSION_ITEMS.map((item) => (
                                <View
                                    key={item.title}
                                    style={[styles.missionCard, isWide && styles.missionCardWide]}>
                                    <Text style={styles.missionIcon}>{item.icon}</Text>
                                    <Text style={styles.missionCardTitle}>{item.title}</Text>
                                    <Text style={styles.missionCardText}>{item.text}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Conta de {auth?.username ?? 'visitante'} no AteliêSP.
                        </Text>
                        <View style={styles.footerButton}>
                            <Button title="Sair" onPress={handleLogout} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default DashboardWeb;
