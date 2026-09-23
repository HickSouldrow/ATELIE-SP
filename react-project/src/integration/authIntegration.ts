// TODO: definir a URL real da API.
// Ex.: 'https://api.ateliesp.com.br/v1' ou 'http://localhost:3000/v1'
export const API_URL = '';

import { User } from '@/@types/user';
import { Auth } from '@/@types/auth';
import { Login } from '@/@types/login';
import { Message } from '@/@types/message';

import * as authMock from './authMock';
import { notifySessionExpired } from './sessionExpired';

export { registerSessionExpiredHandler } from './sessionExpired';

const USE_MOCK = authMock.MOCK_ENABLED || !API_URL;

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const message = await response.text().catch(() => '');
        throw new Error(message || `Erro na requisição (${response.status})`);
    }
    return response.json();
}

async function handleAuthenticatedResponse<T>(response: Response): Promise<T> {
    if (response.status === 401 || response.status === 403) {
        notifySessionExpired();
    }

    return handleResponse<T>(response);
}

export async function createUser(payload: User): Promise<Auth> {
    if (USE_MOCK) {
        return authMock.createUser(payload);
    }

    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });

    return handleResponse<Auth>(response);
}

export async function login(payload: Login): Promise<Auth> {
    if (USE_MOCK) {
        return authMock.login(payload);
    }

    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });

    return handleResponse<Auth>(response);
}

export async function logout(): Promise<void> {
    if (USE_MOCK) {
        return authMock.logout();
    }

    const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Erro na requisição (${response.status})`);
    }
}

export async function getMessage(): Promise<Message> {
    if (USE_MOCK) {
        return authMock.getMessage();
    }

    const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
    });

    return handleAuthenticatedResponse<Message>(response);
}
