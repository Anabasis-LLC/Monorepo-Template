// 3rd party
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// lib
import * as schema from './schema';

/**
 * url
 */

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error('DATABASE_URL is not defined.');
}

/**
 * client
 */

const client = postgres(url, { max: 10 });

/**
 * db
 */

export const db = drizzle(client, { schema });

/**
 * schema
 */

export * from './schema';
export * from './models';
