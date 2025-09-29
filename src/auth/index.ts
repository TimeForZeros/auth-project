import 'dotenv/config';
interface Session {
  id: string;
  secretHash: Uint8Array; // Uint8Array is a byte array
  createdAt: Date;
}

const PEPPER = process.env.PEPPER;

('use server');

import { argon2id, argon2Verify } from 'hash-wasm';
import { randomBytes } from 'crypto';

const ARGON2ID_CONFIG = {
  // OWASP recommended config
  iterations: 2,
  parallelism: 1,
  memorySize: 1024 * 19, // 19 MiB
  hashLength: 32,
  outputType: 'encoded' as const,
  secret: PEPPER,
};

export const hashPassword = async (password: string) =>
  argon2id({
    ...ARGON2ID_CONFIG,
    password,
    salt: randomBytes(16),
  });

export const authenticate = async (password: string, hash: string) =>
  argon2Verify({ password, hash, secret: PEPPER });
