// 3rd party
import { JWTPayload, EncryptJWT, jwtDecrypt } from 'jose';
import { hkdf } from '@panva/hkdf';
import { v4 as uuid } from 'uuid';

/**
 * types
 */

export type JWT = Record<string, unknown>;

/***
 * encryptionKey
 */

const encryptionKey = async (
  secret: string | Buffer,
  salt = '',
  info = 'NextAuth.js Generated Encryption Key',
  keylen = 32,
) => hkdf('sha256', secret, salt, info, keylen);

/**
 * encode
 */

export const encode = async ({
  payload = {},
  secret,
  maxAge = 30 * 24 * 60 * 60, // 30 days.
}: {
  payload: JWTPayload;
  secret: string | Buffer;
  maxAge?: number;
}) =>
  await new EncryptJWT(payload)
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt()
    .setExpirationTime((Date.now() / 1000) | (0 + maxAge))
    .setJti(uuid())
    .encrypt(await encryptionKey(secret));

/**
 * decode
 */

export const decode = async ({
  token,
  secret,
}: {
  token: string;
  secret: string | Buffer;
}) =>
  (
    await jwtDecrypt(token, await encryptionKey(secret), {
      clockTolerance: 15,
    })
  ).payload;
