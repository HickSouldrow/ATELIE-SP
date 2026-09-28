import { useRouter } from 'expo-router';
import { useState } from 'react';

import { createUser, getErrorMessage, isApiError } from '@/integration/authIntegration';

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;
const PASSWORD_MIN_LENGTH = 6;
const USERNAME_REGEX = /^[a-zA-Z0-9._-]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type RegisterFieldErrors = {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

type RegisterField = keyof RegisterFieldErrors;

export function useRegister() {
    const router = useRouter();

    const [username, setUsernameValue] = useState<string>('');
    const [email, setEmailValue] = useState<string>('');
    const [password, setPasswordValue] = useState<string>('');
    const [confirmPassword, setConfirmPasswordValue] = useState<string>('');
    const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

    // Ao editar um campo, o erro dele some na hora (o resto continua visível).
    function clearFieldError(field: RegisterField) {
        setError('');
        setFieldErrors((prev) => {
            if (!prev[field]) {
                return prev;
            }
            const next = { ...prev };
            delete next[field];
            return next;
        });
    }

    function setUsername(value: string) {
        setUsernameValue(value);
        clearFieldError('username');
    }

    function setEmail(value: string) {
        setEmailValue(value);
        clearFieldError('email');
    }

    function setPassword(value: string) {
        setPasswordValue(value);
        clearFieldError('password');
    }

    function setConfirmPassword(value: string) {
        setConfirmPasswordValue(value);
        clearFieldError('confirmPassword');
    }

    function validate(): RegisterFieldErrors {
        const errors: RegisterFieldErrors = {};
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();

        if (!trimmedUsername) {
            errors.username = 'Informe um usuário.';
        } else if (trimmedUsername.length < USERNAME_MIN_LENGTH) {
            errors.username = `O usuário deve ter pelo menos ${USERNAME_MIN_LENGTH} caracteres.`;
        } else if (trimmedUsername.length > USERNAME_MAX_LENGTH) {
            errors.username = `O usuário deve ter no máximo ${USERNAME_MAX_LENGTH} caracteres.`;
        } else if (!USERNAME_REGEX.test(trimmedUsername)) {
            errors.username = 'Use apenas letras, números, ponto, hífen ou sublinhado.';
        }

        if (!trimmedEmail) {
            errors.email = 'Informe um e-mail.';
        } else if (!EMAIL_REGEX.test(trimmedEmail)) {
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
        if (isLoading) {
            return;
        }

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
            const message = getErrorMessage(err, 'Não foi possível criar a conta.');

            // Conflitos da API aparecem no próprio campo; o resto (rede,
            // servidor fora do ar) aparece como erro geral do formulário.
            if (isApiError(err) && err.code === 'USER_EXISTS') {
                setFieldErrors((prev) => ({ ...prev, username: message }));
            } else if (isApiError(err) && err.code === 'EMAIL_EXISTS') {
                setFieldErrors((prev) => ({ ...prev, email: message }));
            } else {
                setError(message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    function handleSuccessConfirm() {
        setShowSuccessAlert(false);
        router.replace('/?registered=1');
    }

    function goToLogin() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/');
        }
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
