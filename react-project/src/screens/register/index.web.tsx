import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

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

    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmRef = useRef<TextInput>(null);

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
                                        autoComplete="username-new"
                                        onSubmitEditing={() => emailRef.current?.focus()}
                                        hasError={!!fieldErrors.username}
                                    />
                                    {!!fieldErrors.username && (
                                        <Text style={styles.fieldError}>{fieldErrors.username}</Text>
                                    )}
                                </View>

                                <View style={styles.field}>
                                    <Input
                                        ref={emailRef}
                                        placeholder="E-mail"
                                        icon="mail-outline"
                                        onChangeText={setEmail}
                                        value={email}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        autoComplete="email"
                                        onSubmitEditing={() => passwordRef.current?.focus()}
                                        hasError={!!fieldErrors.email}
                                    />
                                    {!!fieldErrors.email && (
                                        <Text style={styles.fieldError}>{fieldErrors.email}</Text>
                                    )}
                                </View>

                                <View style={styles.field}>
                                    <Input
                                        ref={passwordRef}
                                        placeholder="Senha"
                                        icon="lock-closed-outline"
                                        isPassword
                                        onChangeText={setPassword}
                                        value={password}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        autoComplete="new-password"
                                        onSubmitEditing={() => confirmRef.current?.focus()}
                                        hasError={!!fieldErrors.password}
                                    />
                                    {fieldErrors.password ? (
                                        <Text style={styles.fieldError}>{fieldErrors.password}</Text>
                                    ) : (
                                        <Text style={styles.fieldHint}>Mínimo de 6 caracteres.</Text>
                                    )}
                                </View>

                                <View style={styles.field}>
                                    <Input
                                        ref={confirmRef}
                                        placeholder="Confirmar senha"
                                        icon="lock-closed-outline"
                                        isPassword
                                        onChangeText={setConfirmPassword}
                                        value={confirmPassword}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        autoComplete="new-password"
                                        onSubmitEditing={handleCreateAccount}
                                        hasError={!!fieldErrors.confirmPassword}
                                    />
                                    {!!fieldErrors.confirmPassword && (
                                        <Text style={styles.fieldError}>{fieldErrors.confirmPassword}</Text>
                                    )}
                                </View>
                            </View>

                            {!!error && (
                                <Text style={styles.error} aria-live="polite">
                                    {error}
                                </Text>
                            )}

                            <Button
                                title="Criar conta"
                                loading={isLoading}
                                onPress={handleCreateAccount}
                            />

                            <Pressable
                                hitSlop={8}
                                onPress={goToLogin}
                                style={styles.linkRow}
                                accessibilityRole="link">
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
