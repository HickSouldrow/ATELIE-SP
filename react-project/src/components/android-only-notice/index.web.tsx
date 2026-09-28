import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { AuthBackground } from '@/components/auth-background';
import { Button } from '@/components/button';
import { Header } from '@/components/header';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';

import { styles } from './styles.web';
import { AndroidOnlyNoticeProps } from './types';

// Tela usada na Web para os recursos que dependem do aparelho
// (câmera, GPS, arquivos locais e mapa nativo).
const AndroidOnlyNoticeWeb: React.FC<AndroidOnlyNoticeProps> = ({ title, description, icon }) => {
    const router = useRouter();
    const { auth } = useAuth();

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.screen}>
                <AuthBackground source={require('../../../assets/murais/mural-03.png')} />

                <Header username={auth?.username} style={styles.header} />

                <View style={styles.center}>
                    <View style={styles.card}>
                        <View style={styles.iconWrap}>
                            <Ionicons name={icon} size={30} color={Colors.accent} />
                        </View>

                        <View style={styles.badge}>
                            <Ionicons name="logo-android" size={13} color={Colors.highlight} />
                            <Text style={styles.badgeText}>Disponível no app Android</Text>
                        </View>

                        <Text style={styles.title} accessibilityRole="header">
                            {title}
                        </Text>
                        <Text style={styles.description}>{description}</Text>

                        <Button
                            title="Voltar ao início"
                            variant="secondary"
                            icon="home-outline"
                            onPress={() => router.replace('/dashboard')}
                        />
                    </View>
                </View>
            </View>
        </>
    );
};

export { AndroidOnlyNoticeWeb as AndroidOnlyNotice };
export default AndroidOnlyNoticeWeb;
