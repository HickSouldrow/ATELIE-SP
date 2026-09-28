import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BoxLogin } from "@/components/box-login";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Colors } from "@/constants/colors";

import { styles } from "./styles.android";
import { useLogin } from "./useLogin";

const LoginAndroid: React.FC = () => {
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

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ImageBackground
        source={require("../../../assets/login-background.png")}
        style={styles.screen}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
            {/* No Android com edge-to-edge (SDK 57) o "padding" é o que funciona */}
            <KeyboardAvoidingView style={styles.container} behavior="padding">
              <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
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
                      autoComplete="username"
                      returnKeyType="next"
                      submitBehavior="submit"
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
                      returnKeyType="go"
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
                    accessibilityRole="link"
                  >
                    <Text style={styles.link}>Não possuo uma conta</Text>
                  </Pressable>
                </BoxLogin>
              </ScrollView>
            </KeyboardAvoidingView>

            {/* Verificação de sessão vira overlay: o formulário não é desmontado */}
            {isCheckingSession && (
              <View style={styles.checking}>
                <ActivityIndicator color={Colors.primaryLight} />
              </View>
            )}
          </SafeAreaView>
        </View>
      </ImageBackground>
    </>
  );
};

export default LoginAndroid;
