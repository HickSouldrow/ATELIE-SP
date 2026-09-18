import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
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

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Olá, {auth?.username ?? 'visitante'} 👋</Text>
        <Text style={styles.subtitle}>Login realizado com sucesso no AteliêSP.</Text>

        <View style={styles.buttonWrap}>
          <Button title="Sair" onPress={handleLogout} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
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
