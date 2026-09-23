import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
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
    isLoading,
    isCheckingSession,
    handleLogin,
    goToRegister,
  } = useLogin();

  const canSubmit = username.trim().length > 0 && password.length > 0;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ImageBackground
        source={require("../../../assets/login-background.png")}
        style={styles.screen}
        resizeMode="cover"
      >
        <View style={{ flex: 1, backgroundColor: "rgba(20,6,7,0.78)" }}>
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
                      returnKeyType="next"
                    />

                    <Input
                      placeholder="Senha"
                      icon="lock-closed-outline"
                      isPassword
                      onChangeText={setPassword}
                      value={password}
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="go"
                      onSubmitEditing={canSubmit ? handleLogin : undefined}
                    />
                  </View>

                  {!!error && <Text style={styles.error}>{error}</Text>}

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
                  >
                    <Text style={styles.link}>Não possuo uma conta</Text>
                  </Pressable>
                </BoxLogin>
              </ScrollView>
            </KeyboardAvoidingView>

            {/* Verificação de sessão vira overlay: o formulário não é desmontado */}
            {isCheckingSession && (
              <View style={styles.checking} pointerEvents="auto">
                <ActivityIndicator color={Colors.white} />
              </View>
            )}
          </SafeAreaView>
        </View>
      </ImageBackground>
    </>
  );
};

export default LoginAndroid;
