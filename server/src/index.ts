import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { env } from './config/env';
import { authRoutes } from './routes/auth.routes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: env.corsOrigin,
        credentials: true,
    }),
);

app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'ateliesp-server' });
});

app.use('/v1/auth', authRoutes);

app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`AteliêSP API rodando em http://localhost:${env.port}`);
});
