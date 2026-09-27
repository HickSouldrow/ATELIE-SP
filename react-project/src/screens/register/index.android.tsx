import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
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
import { FeedbackAlert } from "@/components/feedback-alert";
import { Input } from "@/components/input";

import { styles } from "./styles.android";
import { useRegister } from "./useRegister";

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

      <ImageBackground
        source={require("../../../assets/register-background.png")}
        style={styles.screen}
        resizeMode="cover"
      >
        <View style={{ flex: 1, backgroundColor: "rgba(20,6,7,0.78)" }}>
          <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
              <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
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
                        returnKeyType="next"
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
                        returnKeyType="next"
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
                        returnKeyType="next"
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
                        returnKeyType="go"
                        onSubmitEditing={handleCreateAccount}
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

                  <Pressable
                    hitSlop={8}
                    onPress={goToLogin}
                    style={styles.linkRow}
                  >
                    <Text style={styles.link}>Já tenho conta</Text>
                  </Pressable>
                </BoxLogin>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </ImageBackground>

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

export default RegisterAndroid;
