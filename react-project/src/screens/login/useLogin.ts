import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { getMessage, login } from '@/integration/authIntegration';

export function useLogin() {
    const router = useRouter();
    const { setAuth } = useAuth();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCheckingSession, setIsCheckingSession] = useState<boolean>(true);

    useEffect(() => {
        getMessage()
            .then(() => router.replace('/dashboard'))
            .catch(() => setIsCheckingSession(false));
    }, []);

    async function handleLogin() {
        setError('');
        setIsLoading(true);

        try {
            const data = await login({ username, password });
            setAuth(data);
            router.replace('/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Não foi possível entrar.');
        } finally {
            setIsLoading(false);
        }
    }

    function goToRegister() {
        router.push('/register');
    }

    return {
        username,
        setUsername,
        password,
        setPassword,
        error,
        isLoading,
        isCheckingSession,
        handleLogin,
        goToRegister,
    };
}
