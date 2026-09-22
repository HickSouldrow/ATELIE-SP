import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { Header } from '@/components/header';
import { MuralCarousel } from '@/components/mural-carousel';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { logout } from '@/integration/authIntegration';

export default function Dashboard() {
  const router = useRouter();
  const { auth, setAuth } = useAuth();

  async function handleLogout() {
    await logout().catch(() => {});
    setAuth(null);
    router.replace('/');
  }

  function handleEditProfile() {
    // TODO: abrir a tela de edição de perfil quando ela existir.
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.screen}>
        <Header username={auth?.username} onEditProfile={handleEditProfile} />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <MuralCarousel />

          <View style={styles.greeting}>
            <Text style={styles.title}>Olá, {auth?.username ?? 'visitante'} 👋</Text>
            <Text style={styles.subtitle}>Login realizado com sucesso no AteliêSP.</Text>

            <View style={styles.buttonWrap}>
              <Button title="Sair" onPress={handleLogout} />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  greeting: {
    alignItems: 'center',
    padding: 24,
    gap: 8,
    marginTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.whiteAlpha['55'],
    marginBottom: 24,
  },
  buttonWrap: {
    width: '100%',
    maxWidth: 320,
  },
});
