import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthBackground } from '@/components/auth-background';
import { BoxLogin } from '@/components/box-login';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Colors } from '@/constants/colors';

import { styles } from './styles.android';
import { useLogin } from './useLogin';

const LoginAndroid: React.FC = () => {
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

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="light" />

            <View style={styles.screen}>
                <AuthBackground source={require('../../../assets/login-background.png')} />

                <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                    <KeyboardAvoidingView style={styles.container} behavior="height">
                        <ScrollView
                            contentContainerStyle={styles.scroll}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}>
                            <Text style={styles.wordmark}>AteliêSP</Text>

                            <BoxLogin>
                                <Text style={styles.heading}>Entrar</Text>

                                <View style={styles.fieldsGroup}>
                                    <Input
                                        placeholder="Usuário"
                                        icon="person-outline"
                                        onChangeText={setUsername}
                                        value={username}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        returnKeyType="next"
                                    />

                                    <Input
                                        placeholder="Senha"
                                        icon="lock-closed-outline"
                                        isPassword
                                        onChangeText={setPassword}
                                        value={password}
                                        autoCorrect={false}
                                        returnKeyType="go"
                                        onSubmitEditing={handleLogin}
                                    />
                                </View>

                                {!!error && <Text style={styles.error}>{error}</Text>}

                                <Button title="Entrar" loading={isLoading} onPress={handleLogin} />

                                <Pressable hitSlop={8} onPress={goToRegister} style={styles.linkRow}>
                                    <Text style={styles.link}>Não possuo uma conta</Text>
                                </Pressable>
                            </BoxLogin>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        </>
    );
};

export default LoginAndroid;
