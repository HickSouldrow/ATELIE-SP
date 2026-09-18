import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { requireAuth } from '../middlewares/auth.middleware';

export const authRoutes = Router();

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);
authRoutes.post('/logout', authController.logout);
authRoutes.get('/me', requireAuth, authController.me);
