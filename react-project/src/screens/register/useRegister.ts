import { useRouter } from 'expo-router';
import { useState } from 'react';

import { createUser } from '@/integration/authIntegration';

const USERNAME_MIN_LENGTH = 3;
const PASSWORD_MIN_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type RegisterFieldErrors = {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export function useRegister() {
    const router = useRouter();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

    function validate(): RegisterFieldErrors {
        const errors: RegisterFieldErrors = {};

        if (!username.trim()) {
            errors.username = 'Informe um usuário.';
        } else if (username.trim().length < USERNAME_MIN_LENGTH) {
            errors.username = `O usuário deve ter pelo menos ${USERNAME_MIN_LENGTH} caracteres.`;
        }

        if (!email.trim()) {
            errors.email = 'Informe um e-mail.';
        } else if (!EMAIL_REGEX.test(email.trim())) {
            errors.email = 'Informe um e-mail válido.';
        }

        if (!password) {
            errors.password = 'Informe uma senha.';
        } else if (password.length < PASSWORD_MIN_LENGTH) {
            errors.password = `A senha deve ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres.`;
        }

        if (!confirmPassword) {
            errors.confirmPassword = 'Confirme a senha.';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'As senhas não coincidem.';
        }

        return errors;
    }

    async function handleCreateAccount() {
        setError('');

        const errors = validate();
        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        setIsLoading(true);

        try {
            await createUser({
                username: username.trim(),
                password,
                email: email.trim(),
            });

            setShowSuccessAlert(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Não foi possível criar a conta.');
        } finally {
            setIsLoading(false);
        }
    }

    function handleSuccessConfirm() {
        setShowSuccessAlert(false);
        router.replace('/?registered=1');
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
        fieldErrors,
        error,
        isLoading,
        showSuccessAlert,
        handleCreateAccount,
        handleSuccessConfirm,
        goToLogin,
    };
}
