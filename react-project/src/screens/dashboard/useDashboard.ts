import { useRouter } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';
import { logout } from '@/integration/authIntegration';

export function useDashboard() {
    const router = useRouter();
    const { auth, setAuth } = useAuth();

    async function handleLogout() {
        await logout().catch(() => {});
        setAuth(null);
        router.replace('/');
    }

    function handleEditProfile() {
        // TODO: navegar pra tela de edição de perfil quando ela existir.
    }

    return { auth, handleLogout, handleEditProfile };
}
