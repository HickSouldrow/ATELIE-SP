import { Auth } from '@/@types/auth';
import { Login } from '@/@types/login';
import { Message } from '@/@types/message';
import { User } from '@/@types/user';

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

const users: MockUser[] = mockData.users.map((user) => ({ ...user }));

let session: Auth | null = null;

function sleep(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, mockData.latencyMs));
}

function toAuth(user: MockUser): Auth {
    return { userId: user.userId, username: user.username, roles: [...user.roles] };
}

export async function createUser(payload: User): Promise<Auth> {
    await sleep();

    if (users.some((user) => user.username === payload.username)) {
        throw new Error(mockData.errors.userExists);
    }

    const user: MockUser = {
        userId: String(users.length + 1),
        username: payload.username,
        password: payload.password,
        email: payload.email,
        roles: ['ROLE_USER'],
    };

    users.push(user);
    session = toAuth(user);

    return toAuth(user);
}

export async function login(payload: Login): Promise<Auth> {
    await sleep();

    const user = users.find(
        (candidate) =>
            candidate.username === payload.username && candidate.password === payload.password,
    );

    if (!user) {
        throw new Error(mockData.errors.invalidCredentials);
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
        throw new Error(mockData.errors.sessionExpired);
    }

    return { message: mockData.messages.user };
}
