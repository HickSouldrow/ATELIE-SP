import { useRouter } from 'expo-router';
import { useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { createUser } from '@/integration/authIntegration';

export function useRegister() {
    const router = useRouter();
    const { setAuth } = useAuth();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleCreateAccount() {
        setError('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        setIsLoading(true);

        try {
            const data = await createUser({ username, password, email });
            setAuth(data);
            router.replace('/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Não foi possível criar a conta.');
        } finally {
            setIsLoading(false);
        }
    }

    function goToLogin() {
        router.push('/');
    }

    return {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        isLoading,
        handleCreateAccount,
        goToLogin,
    };
}
