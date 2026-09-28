import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    TextInput,
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
        successMessage,
        isLoading,
        isCheckingSession,
        canSubmit,
        handleLogin,
        goToRegister,
    } = useLogin();

    const passwordRef = useRef<TextInput>(null);

    if (isCheckingSession) {
        return (
            <>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={styles.checking}>
                    <ActivityIndicator color={Colors.primaryLight} />
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
                                    autoComplete="username"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                />

                                <Input
                                    ref={passwordRef}
                                    placeholder="Senha"
                                    icon="lock-closed-outline"
                                    isPassword
                                    onChangeText={setPassword}
                                    value={password}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoComplete="current-password"
                                    onSubmitEditing={handleLogin}
                                />
                            </View>

                            {!error && !!successMessage && (
                                <Text style={styles.success} aria-live="polite">
                                    {successMessage}
                                </Text>
                            )}
                            {!!error && (
                                <Text style={styles.error} aria-live="polite">
                                    {error}
                                </Text>
                            )}

                            <Button
                                title="Entrar"
                                loading={isLoading}
                                disabled={!canSubmit}
                                onPress={handleLogin}
                            />

                            <Pressable
                                hitSlop={8}
                                onPress={goToRegister}
                                style={styles.linkRow}
                                accessibilityRole="link">
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
