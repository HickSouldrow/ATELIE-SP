import { NextFunction, Request, Response } from 'express';

// TODO: validar o JWT do cookie e responder 401 quando inválido.
export function requireAuth(_req: Request, res: Response, _next: NextFunction) {
    return res.status(501).json({ message: 'Autenticação ainda não implementada.' });
}
