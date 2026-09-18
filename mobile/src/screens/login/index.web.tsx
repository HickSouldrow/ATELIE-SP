import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

import { AuthImagePanel } from '@/components/auth-image-panel';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Colors } from '@/constants/colors';

import { styles } from './styles.web';
import { useLogin } from './useLogin';

const LoginWeb: React.FC = () => {
    const { width } = useWindowDimensions();
    const {
        username,
        setUsername,
        password,
        setPassword,
        error,
        isLoading,
        isCheckingSession,
        handleLogin,
        goToRegister,
    } = useLogin();

    if (isCheckingSession) {
        return (
            <>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={styles.checking}>
                    <ActivityIndicator color={Colors.white} />
                </View>
            </>
        );
    }

    const isWide = width >= 700;
    const imageFlex = isWide ? 2.2 : 1.6;

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="light" />

            <View style={styles.screen}>
                <AuthImagePanel style={{ flex: imageFlex }} />

                <View style={[styles.formPanel, { flex: 1 }]}>
                    <ScrollView
                        contentContainerStyle={styles.formScroll}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.formContent}>
                            <Text style={styles.wordmark}>AteliêSP</Text>
                            <Text style={styles.heading}>Entrar</Text>

                            <View style={styles.fieldsGroup}>
                                <Input
                                    placeholder="Usuário"
                                    icon="person-outline"
                                    onChangeText={setUsername}
                                    value={username}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />

                                <Input
                                    placeholder="Senha"
                                    icon="lock-closed-outline"
                                    isPassword
                                    onChangeText={setPassword}
                                    value={password}
                                    autoCorrect={false}
                                />
                            </View>

                            {!!error && <Text style={styles.error}>{error}</Text>}

                            <Button title="Entrar" loading={isLoading} onPress={handleLogin} />

                            <Pressable hitSlop={8} onPress={goToRegister} style={styles.linkRow}>
                                <Text style={styles.link}>Não possuo uma conta</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </>
    );
};

export default LoginWeb;
