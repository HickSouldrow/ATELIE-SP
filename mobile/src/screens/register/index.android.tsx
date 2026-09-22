import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthBackground } from '@/components/auth-background';
import { BoxLogin } from '@/components/box-login';
import { Button } from '@/components/button';
import { Input } from '@/components/input';

import { styles } from './styles.android';
import { useRegister } from './useRegister';

const RegisterAndroid: React.FC = () => {
    const {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        isLoading,
        handleCreateAccount,
        goToLogin,
    } = useRegister();

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="light" />

            <View style={styles.screen}>
                <AuthBackground source={require('../../../assets/register-background.png')} />

                <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                        <ScrollView
                            contentContainerStyle={styles.scroll}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}>
                            <BoxLogin>
                                <Text style={styles.heading}>Criar conta</Text>

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
                                        placeholder="E-mail"
                                        icon="mail-outline"
                                        onChangeText={setEmail}
                                        value={email}
                                        keyboardType="email-address"
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
                                        returnKeyType="next"
                                    />

                                    <Input
                                        placeholder="Confirmar senha"
                                        icon="lock-closed-outline"
                                        isPassword
                                        onChangeText={setConfirmPassword}
                                        value={confirmPassword}
                                        autoCorrect={false}
                                        returnKeyType="go"
                                        onSubmitEditing={handleCreateAccount}
                                    />
                                </View>

                                {!!error && <Text style={styles.error}>{error}</Text>}

                                <Button
                                    title="Criar conta"
                                    loading={isLoading}
                                    onPress={handleCreateAccount}
                                />

                                <Pressable hitSlop={8} onPress={goToLogin} style={styles.linkRow}>
                                    <Text style={styles.link}>Já tenho conta</Text>
                                </Pressable>
                            </BoxLogin>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        </>
    );
};

export default RegisterAndroid;
