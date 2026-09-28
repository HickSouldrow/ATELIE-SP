// TODO: definir a URL real da API.
// Ex.: 'https://api.ateliesp.com.br/v1' ou 'http://localhost:3000/v1'
export const API_URL = '';

import { User } from '@/@types/user';
import { Auth } from '@/@types/auth';
import { Login } from '@/@types/login';
import { Message } from '@/@types/message';

import { ApiError, ApiErrorCode } from './apiError';
import * as authMock from './authMock';
import { notifySessionExpired } from './sessionExpired';

export { registerSessionExpiredHandler } from './sessionExpired';
export { ApiError, getErrorMessage, isApiError } from './apiError';
export type { ApiErrorCode } from './apiError';

const USE_MOCK = authMock.MOCK_ENABLED || !API_URL;
const REQUEST_TIMEOUT_MS = 15000;

type StatusCodeMap = Partial<Record<number, ApiErrorCode>>;

async function safeFetch(input: string, init?: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        return await fetch(input, { ...init, signal: controller.signal });
    } catch {
        if (controller.signal.aborted) {
            throw new ApiError('TIMEOUT', 'O servidor demorou para responder. Tente novamente.');
        }
        throw new ApiError('NETWORK', 'Falha de conexão. Verifique sua internet e tente novamente.');
    } finally {
        clearTimeout(timeout);
    }
}

// O server responde erros como { message, code? }; aceita texto puro também.
async function readErrorBody(response: Response): Promise<{ message?: string; code?: string }> {
    const text = await response.text().catch(() => '');

    try {
        const body = JSON.parse(text);
        return {
            message: typeof body?.message === 'string' ? body.message : undefined,
            code: typeof body?.code === 'string' ? body.code : undefined,
        };
    } catch {
        return { message: text || undefined };
    }
}

async function handleResponse<T>(response: Response, statusCodes: StatusCodeMap = {}): Promise<T> {
    if (!response.ok) {
        const body = await readErrorBody(response);
        const code =
            (body.code as ApiErrorCode | undefined) ??
            statusCodes[response.status] ??
            (response.status >= 500 ? 'SERVER' : 'UNKNOWN');

        const fallback =
            code === 'SERVER'
                ? 'O servidor está indisponível no momento. Tente novamente em instantes.'
                : `Erro na requisição (${response.status}).`;

        throw new ApiError(code, body.message || fallback, response.status);
    }

    return response.json();
}

async function handleAuthenticatedResponse<T>(response: Response): Promise<T> {
    if (response.status === 401 || response.status === 403) {
        notifySessionExpired();
    }

    return handleResponse<T>(response, { 401: 'UNAUTHORIZED', 403: 'UNAUTHORIZED' });
}

export async function createUser(payload: User): Promise<Auth> {
    if (USE_MOCK) {
        return authMock.createUser(payload);
    }

    const response = await safeFetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });

    return handleResponse<Auth>(response, { 409: 'USER_EXISTS' });
}

export async function login(payload: Login): Promise<Auth> {
    if (USE_MOCK) {
        return authMock.login(payload);
    }

    const response = await safeFetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });

    return handleResponse<Auth>(response, { 401: 'INVALID_CREDENTIALS' });
}

export async function logout(): Promise<void> {
    if (USE_MOCK) {
        return authMock.logout();
    }

    const response = await safeFetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new ApiError('UNKNOWN', `Erro na requisição (${response.status}).`, response.status);
    }
}

export async function getMessage(): Promise<Message> {
    if (USE_MOCK) {
        return authMock.getMessage();
    }

    const response = await safeFetch(`${API_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
    });

    return handleAuthenticatedResponse<Message>(response);
}
