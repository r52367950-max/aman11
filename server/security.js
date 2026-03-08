import crypto from 'node:crypto';

const SCRYPT_KEY_LENGTH = 64;

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = await scrypt(password, salt);
  return `${salt}:${derived}`;
}

export async function verifyPassword(password, storedHash) {
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) {
    return false;
  }

  const candidate = await scrypt(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(candidate, 'hex'));
}

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function scrypt(value, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(value, salt, SCRYPT_KEY_LENGTH, { N: 16384, r: 8, p: 1 }, (error, key) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(key.toString('hex'));
    });
  });
}
