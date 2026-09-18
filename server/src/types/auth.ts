// TODO: gerar esses tipos a partir do ORM.

export interface Login {
    username: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    password: string;
    email: string;
}

export interface AuthPayload {
    userId: string;
    username: string;
    roles: string[];
}
