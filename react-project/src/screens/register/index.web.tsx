import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { AuthBackground } from '@/components/auth-background';
import { BoxLogin } from '@/components/box-login';
import { Button } from '@/components/button';
import { FeedbackAlert } from '@/components/feedback-alert';
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
        fieldErrors,
        error,
        isLoading,
        showSuccessAlert,
        handleCreateAccount,
        handleSuccessConfirm,
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
                                <View style={styles.field}>
                                    <Input
                                        placeholder="Usuário"
                                        icon="person-outline"
                                        onChangeText={setUsername}
                                        value={username}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        hasError={!!fieldErrors.username}
                                    />
                                    {!!fieldErrors.username && (
                                        <Text style={styles.fieldError}>{fieldErrors.username}</Text>
                                    )}
                                </View>

                                <View style={styles.field}>
                                    <Input
                                        placeholder="E-mail"
                                        icon="mail-outline"
                                        onChangeText={setEmail}
                                        value={email}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        hasError={!!fieldErrors.email}
                                    />
                                    {!!fieldErrors.email && (
                                        <Text style={styles.fieldError}>{fieldErrors.email}</Text>
                                    )}
                                </View>

                                <View style={styles.field}>
                                    <Input
                                        placeholder="Senha"
                                        icon="lock-closed-outline"
                                        isPassword
                                        onChangeText={setPassword}
                                        value={password}
                                        autoCorrect={false}
                                        hasError={!!fieldErrors.password}
                                    />
                                    {!!fieldErrors.password && (
                                        <Text style={styles.fieldError}>{fieldErrors.password}</Text>
                                    )}
                                </View>

                                <View style={styles.field}>
                                    <Input
                                        placeholder="Confirmar senha"
                                        icon="lock-closed-outline"
                                        isPassword
                                        onChangeText={setConfirmPassword}
                                        value={confirmPassword}
                                        autoCorrect={false}
                                        hasError={!!fieldErrors.confirmPassword}
                                    />
                                    {!!fieldErrors.confirmPassword && (
                                        <Text style={styles.fieldError}>{fieldErrors.confirmPassword}</Text>
                                    )}
                                </View>
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

            <FeedbackAlert
                visible={showSuccessAlert}
                type="success"
                title="Conta criada!"
                message="Sua conta foi criada com sucesso. Faça login para continuar."
                confirmText="Ir para o login"
                onConfirm={handleSuccessConfirm}
            />
        </>
    );
};

export default RegisterWeb;
