import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { AuthBackground } from '@/components/auth-background';
import { BoxLogin } from '@/components/box-login';
import { Button } from '@/components/button';
import { Input } from '@/components/input';

import { styles } from './styles.web';
import { useRegister } from './useRegister';

const RegisterWeb: React.FC = () => {
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

                <ScrollView
                    style={styles.scrollArea}
                    contentContainerStyle={styles.scroll}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.centerWrap}>
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
                                />

                                <Input
                                    placeholder="E-mail"
                                    icon="mail-outline"
                                    onChangeText={setEmail}
                                    value={email}
                                    keyboardType="email-address"
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

                                <Input
                                    placeholder="Confirmar senha"
                                    icon="lock-closed-outline"
                                    isPassword
                                    onChangeText={setConfirmPassword}
                                    value={confirmPassword}
                                    autoCorrect={false}
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
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default RegisterWeb;
