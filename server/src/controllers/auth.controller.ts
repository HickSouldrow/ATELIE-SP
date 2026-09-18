import { Request, Response } from 'express';

// TODO: implementar os handlers (login, register, logout, me).

export async function register(_req: Request, res: Response) {
    res.status(501).json({ message: 'Cadastro ainda não implementado.' });
}

export async function login(_req: Request, res: Response) {
    res.status(501).json({ message: 'Login ainda não implementado.' });
}

export async function logout(_req: Request, res: Response) {
    res.status(501).json({ message: 'Logout ainda não implementado.' });
}

export async function me(_req: Request, res: Response) {
    res.status(501).json({ message: 'Rota /me ainda não implementada.' });
}
