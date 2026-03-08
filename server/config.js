import crypto from 'node:crypto';

const PORT = Number(process.env.AUTH_PORT ?? 8787);

const TOKEN_ACCESS_TTL_SECONDS = Number(process.env.ACCESS_TOKEN_TTL_SECONDS ?? 15 * 60);
const TOKEN_REFRESH_TTL_SECONDS = Number(process.env.REFRESH_TOKEN_TTL_SECONDS ?? 7 * 24 * 60 * 60);

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
if (!process.env.JWT_SECRET) {
  // eslint-disable-next-line no-console
  console.warn('[auth-server] JWT_SECRET was not set. A volatile secret has been generated for this process.');
}

export const authConfig = {
  port: PORT,
  issuer: 'aman-auth',
  jwtSecret: JWT_SECRET,
  accessTtlSeconds: TOKEN_ACCESS_TTL_SECONDS,
  refreshTtlSeconds: TOKEN_REFRESH_TTL_SECONDS,
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};
