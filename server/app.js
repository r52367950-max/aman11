import http from 'node:http';
import { URL } from 'node:url';
import { z } from 'zod';

import { authConfig } from './config.js';
import {
  findUserByLoginId,
  getRefreshToken,
  isUserLocked,
  registerLoginFailure,
  registerLoginSuccess,
  revokeRefreshToken,
  revokeRefreshTokensForUser,
  storeRefreshToken,
} from './store.js';
import { hashToken, verifyPassword } from './security.js';
import { signToken, verifyToken } from './token.js';

const authAttempts = new Map();
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 20;

const loginSchema = z.object({
  loginId: z.string().email().max(120),
  password: z.string().min(8).max(128),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(10).max(4096).optional(),
});

const server = http.createServer(async (req, res) => {
  applySecurityHeaders(req, res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url ?? '/', `http://${req.headers.host}`);

  try {
    if (req.method === 'GET' && url.pathname === '/api/health') {
      return json(res, 200, { ok: true, service: 'aman-auth', uptime: process.uptime() });
    }

    if (req.method === 'POST' && url.pathname === '/api/auth/login') {
      if (isRateLimited(req)) {
        return json(res, 429, { code: 'AUTH_TOO_MANY_REQUESTS', message: 'Too many authentication attempts' });
      }

      const body = await readBody(req);
      const parsed = loginSchema.safeParse(body);
      if (!parsed.success) {
        return json(res, 400, { code: 'AUTH_INVALID_REQUEST', message: 'Invalid login payload' });
      }

      const { loginId, password } = parsed.data;
      const user = findUserByLoginId(loginId);
      if (!user) {
        return json(res, 401, { code: 'AUTH_INVALID_CREDENTIALS', message: 'Invalid credentials' });
      }

      if (isUserLocked(user)) {
        return json(res, 423, {
          code: 'AUTH_ACCOUNT_LOCKED',
          message: 'Account is temporarily locked due to too many failed attempts',
        });
      }

      const passwordOk = await verifyPassword(password, user.passwordHash);
      if (!passwordOk) {
        registerLoginFailure(user);
        return json(res, 401, { code: 'AUTH_INVALID_CREDENTIALS', message: 'Invalid credentials' });
      }

      registerLoginSuccess(user);
      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);

      storeRefreshToken(hashToken(refreshToken), {
        userId: user.id,
        expiresAt: Date.now() + authConfig.refreshTtlSeconds * 1000,
        ip: req.socket.remoteAddress ?? 'unknown',
        userAgent: req.headers['user-agent'] ?? 'unknown',
      });

      setRefreshCookie(res, refreshToken);

      return json(res, 200, {
        accessToken,
        expiresIn: authConfig.accessTtlSeconds,
        user: {
          id: user.id,
          loginId: user.loginId,
          displayName: user.displayName,
          role: user.role,
        },
      });
    }

    if (req.method === 'POST' && url.pathname === '/api/auth/refresh') {
      if (isRateLimited(req)) {
        return json(res, 429, { code: 'AUTH_TOO_MANY_REQUESTS', message: 'Too many authentication attempts' });
      }

      const body = await readBody(req);
      const parsed = refreshSchema.safeParse(body);
      if (!parsed.success) {
        return json(res, 400, { code: 'AUTH_INVALID_REQUEST', message: 'Invalid refresh payload' });
      }

      const cookieToken = readCookie(req, 'aman_rt');
      const refreshToken = parsed.data.refreshToken ?? cookieToken;
      if (!refreshToken) {
        return json(res, 401, { code: 'AUTH_INVALID_TOKEN', message: 'Refresh token required' });
      }

      let tokenPayload;
      try {
        tokenPayload = verifyToken(refreshToken, authConfig.jwtSecret);
      } catch {
        return json(res, 401, { code: 'AUTH_INVALID_TOKEN', message: 'Invalid refresh token' });
      }

      if (tokenPayload.type !== 'refresh') {
        return json(res, 401, { code: 'AUTH_INVALID_TOKEN', message: 'Invalid refresh token type' });
      }

      const stored = getRefreshToken(hashToken(refreshToken));
      if (!stored || stored.expiresAt < Date.now()) {
        return json(res, 401, { code: 'AUTH_TOKEN_EXPIRED', message: 'Refresh token expired or revoked' });
      }

      const user = findUserByLoginId(tokenPayload.sub);
      if (!user) {
        return json(res, 401, { code: 'AUTH_INVALID_TOKEN', message: 'User not found' });
      }

      return json(res, 200, { accessToken: createAccessToken(user), expiresIn: authConfig.accessTtlSeconds });
    }

    if (req.method === 'POST' && url.pathname === '/api/auth/logout') {
      const body = await readBody(req);
      const tokenFromCookie = readCookie(req, 'aman_rt');
      const refreshToken = (typeof body.refreshToken === 'string' && body.refreshToken) || tokenFromCookie;
      if (refreshToken) {
        revokeRefreshToken(hashToken(refreshToken));
      }

      clearRefreshCookie(res);
      return json(res, 200, { ok: true });
    }

    if (req.method === 'POST' && url.pathname === '/api/auth/logout-all') {
      const body = await readBody(req);
      if (!body.userId || typeof body.userId !== 'string') {
        return json(res, 400, { code: 'AUTH_INVALID_REQUEST', message: 'userId is required' });
      }

      revokeRefreshTokensForUser(body.userId);
      clearRefreshCookie(res);
      return json(res, 200, { ok: true });
    }

    return json(res, 404, { code: 'NOT_FOUND', message: 'Route not found' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[auth-server] unexpected error', error);
    return json(res, 500, { code: 'AUTH_INTERNAL_ERROR', message: 'Internal server error' });
  }
});

server.listen(authConfig.port, () => {
  // eslint-disable-next-line no-console
  console.log(`[auth-server] listening on http://localhost:${authConfig.port}`);
});

function createAccessToken(user) {
  return signToken(
    {
      sub: user.loginId,
      role: user.role,
      name: user.displayName,
      type: 'access',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + authConfig.accessTtlSeconds,
    },
    authConfig.jwtSecret
  );
}

function createRefreshToken(user) {
  return signToken(
    {
      sub: user.loginId,
      type: 'refresh',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + authConfig.refreshTtlSeconds,
    },
    authConfig.jwtSecret
  );
}

function isRateLimited(req) {
  const key = req.socket.remoteAddress ?? 'unknown';
  const now = Date.now();
  const attempts = authAttempts.get(key) ?? [];
  const valid = attempts.filter((timestamp) => now - timestamp < RATE_WINDOW_MS);

  if (valid.length >= RATE_LIMIT) {
    authAttempts.set(key, valid);
    return true;
  }

  valid.push(now);
  authAttempts.set(key, valid);
  return false;
}

function applySecurityHeaders(req, res) {
  const origin = req.headers.origin;
  if (origin && authConfig.allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=(), payment=()');
}

function json(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function readCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) {
    return null;
  }

  const cookies = header.split(';').map((entry) => entry.trim());
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue ?? '');
    }
  }

  return null;
}

async function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on('data', (chunk) => {
      chunks.push(chunk);
      if (Buffer.concat(chunks).length > 16 * 1024) {
        reject(new Error('Payload too large'));
      }
    });

    req.on('end', () => {
      if (!chunks.length) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', reject);
  });
}

function setRefreshCookie(res, token) {
  const parts = [
    `aman_rt=${encodeURIComponent(token)}`,
    'HttpOnly',
    'SameSite=Strict',
    'Path=/api/auth',
    `Max-Age=${authConfig.refreshTtlSeconds}`,
  ];

  if (process.env.NODE_ENV === 'production') {
    parts.push('Secure');
  }

  res.setHeader('Set-Cookie', parts.join('; '));
}

function clearRefreshCookie(res) {
  res.setHeader('Set-Cookie', 'aman_rt=; HttpOnly; SameSite=Strict; Path=/api/auth; Max-Age=0');
}
