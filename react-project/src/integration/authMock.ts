import AsyncStorage from '@react-native-async-storage/async-storage';

import { Auth } from '@/@types/auth';
import { Login } from '@/@types/login';
import { Message } from '@/@types/message';
import { User } from '@/@types/user';
import { createId } from '@/utils/createId';

import { ApiError } from './apiError';
import { notifySessionExpired } from './sessionExpired';
import mockData from './mocks/authMock.json';

type MockUser = {
    userId: string;
    username: string;
    password: string;
    email: string;
    roles: string[];
};

export const MOCK_ENABLED: boolean = mockData.enabled;

// Contas criadas no cadastro ficam salvas no aparelho (AsyncStorage no
// Android, localStorage na Web) para sobreviverem a um reload. É só um mock:
// a senha fica em texto puro aqui, o server de verdade deve guardar o hash.
const USERS_STORAGE_KEY = '@ateliesp/mock-users';

const seedUsers: MockUser[] = mockData.users.map((user) => ({ ...user }));
const seedIds = new Set(seedUsers.map((user) => user.userId));

let usersCache: MockUser[] | null = null;
let session: Auth | null = null;

function sleep(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, mockData.latencyMs));
}

function toAuth(user: MockUser): Auth {
    return { userId: user.userId, username: user.username, roles: [...user.roles] };
}

function sameText(a: string, b: string) {
    return a.trim().toLowerCase() === b.trim().toLowerCase();
}

async function loadUsers(): Promise<MockUser[]> {
    if (usersCache) {
        return usersCache;
    }

    let stored: MockUser[] = [];

    try {
        const raw = await AsyncStorage.getItem(USERS_STORAGE_KEY);
        stored = raw ? (JSON.parse(raw) as MockUser[]) : [];
    } catch {
        stored = [];
    }

    usersCache = [...seedUsers, ...stored.filter((user) => !seedIds.has(user.userId))];

    return usersCache;
}

async function persistUsers(users: MockUser[]) {
    const created = users.filter((user) => !seedIds.has(user.userId));
    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(created));
}

export async function createUser(payload: User): Promise<Auth> {
    await sleep();

    const users = await loadUsers();

    if (users.some((user) => sameText(user.username, payload.username))) {
        throw new ApiError('USER_EXISTS', mockData.errors.userExists, 409);
    }

    if (users.some((user) => sameText(user.email, payload.email))) {
        throw new ApiError('EMAIL_EXISTS', mockData.errors.emailExists, 409);
    }

    const user: MockUser = {
        userId: createId('u_'),
        username: payload.username.trim(),
        password: payload.password,
        email: payload.email.trim(),
        roles: ['ROLE_USER'],
    };

    users.push(user);

    try {
        await persistUsers(users);
    } catch {
        users.pop();
        throw new ApiError('UNKNOWN', mockData.errors.storage);
    }

    return toAuth(user);
}

export async function login(payload: Login): Promise<Auth> {
    await sleep();

    const users = await loadUsers();
    const user = users.find(
        (candidate) =>
            sameText(candidate.username, payload.username) && candidate.password === payload.password,
    );

    if (!user) {
        throw new ApiError('INVALID_CREDENTIALS', mockData.errors.invalidCredentials, 401);
    }

    session = toAuth(user);

    return toAuth(user);
}

export async function logout(): Promise<void> {
    await sleep();
    session = null;
}

export async function getMessage(): Promise<Message> {
    await sleep();

    if (!session) {
        notifySessionExpired();
        throw new ApiError('UNAUTHORIZED', mockData.errors.sessionExpired, 401);
    }

    return { message: mockData.messages.user };
}
