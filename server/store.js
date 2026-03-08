import crypto from 'node:crypto';
import { hashPassword } from './security.js';

const users = new Map();
const refreshTokens = new Map();

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

await seedDefaultUser();

export function findUserByLoginId(loginId) {
  return users.get(loginId.toLowerCase()) ?? null;
}

export function isUserLocked(user) {
  return Boolean(user.lockUntil && user.lockUntil > Date.now());
}

export function registerLoginFailure(user) {
  user.failedLoginCount += 1;
  if (user.failedLoginCount >= MAX_FAILED_ATTEMPTS) {
    user.lockUntil = Date.now() + LOCK_MINUTES * 60 * 1000;
    user.failedLoginCount = 0;
  }
}

export function registerLoginSuccess(user) {
  user.failedLoginCount = 0;
  user.lockUntil = null;
  user.lastLoginAt = Date.now();
}

export function storeRefreshToken(tokenHash, payload) {
  refreshTokens.set(tokenHash, payload);
}

export function getRefreshToken(tokenHash) {
  return refreshTokens.get(tokenHash) ?? null;
}

export function revokeRefreshToken(tokenHash) {
  refreshTokens.delete(tokenHash);
}

export function revokeRefreshTokensForUser(userId) {
  for (const [tokenHash, token] of refreshTokens.entries()) {
    if (token.userId === userId) {
      refreshTokens.delete(tokenHash);
    }
  }
}

async function seedDefaultUser() {
  const seedLogin = process.env.AUTH_SEED_LOGIN?.trim().toLowerCase();
  const seedPassword = process.env.AUTH_SEED_PASSWORD;

  if (!seedLogin || !seedPassword) {
    // eslint-disable-next-line no-console
    console.warn('[auth-server] skipping user seed: set AUTH_SEED_LOGIN and AUTH_SEED_PASSWORD to enable seeding');
    return;
  }

  const passwordHash = await hashPassword(seedPassword);
  const user = {
    id: crypto.randomUUID(),
    loginId: seedLogin,
    displayName: 'Aman Admin',
    passwordHash,
    role: 'admin',
    failedLoginCount: 0,
    lockUntil: null,
    lastLoginAt: null,
    createdAt: Date.now(),
  };

  users.set(user.loginId, user);
}
