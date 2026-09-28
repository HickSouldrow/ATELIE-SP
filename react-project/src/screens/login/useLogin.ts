import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { getErrorMessage, getMessage, login } from '@/integration/authIntegration';

export function useLogin() {
    const router = useRouter();
    const { setAuth } = useAuth();
    const params = useLocalSearchParams<{ registered?: string }>();

    const [username, setUsernameValue] = useState<string>('');
    const [password, setPasswordValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCheckingSession, setIsCheckingSession] = useState<boolean>(true);

    const canSubmit = username.trim().length > 0 && password.length > 0 && !isLoading;

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

    function setUsername(value: string) {
        setUsernameValue(value);
        setError('');
    }

    function setPassword(value: string) {
        setPasswordValue(value);
        setError('');
    }

    async function handleLogin() {
        if (!canSubmit) {
            return;
        }

        setError('');
        setSuccessMessage('');
        setIsLoading(true);

        try {
            const data = await login({ username: username.trim(), password });
            setAuth(data);
            router.replace('/dashboard');
        } catch (err) {
            setError(getErrorMessage(err, 'Não foi possível entrar.'));
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
        canSubmit,
        handleLogin,
        goToRegister,
    };
}
