import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { getMessage, login } from '@/integration/authIntegration';

export function useLogin() {
    const router = useRouter();
    const { setAuth } = useAuth();
    const params = useLocalSearchParams<{ registered?: string }>();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCheckingSession, setIsCheckingSession] = useState<boolean>(true);

    useEffect(() => {
        getMessage()
            .then(() => router.replace('/dashboard'))
            .catch(() => setIsCheckingSession(false));
    }, []);

    useEffect(() => {
        if (params.registered === '1') {
            setSuccessMessage('Conta criada com sucesso! Faça login para continuar.');
        }
    }, [params.registered]);

    async function handleLogin() {
        setError('');
        setSuccessMessage('');
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
        successMessage,
        isLoading,
        isCheckingSession,
        handleLogin,
        goToRegister,
    };
}
