import 'dotenv/config';

export const env = {
    port: Number(process.env.PORT ?? 3333),
    corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:8081',

    jwtSecret: process.env.JWT_SECRET ?? '',
    jwtCookieName: process.env.JWT_COOKIE_NAME ?? 'ateliesp_token',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
};
