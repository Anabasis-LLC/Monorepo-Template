/* eslint-disable no-console */

// 3rd party
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

// lib
import * as schema from '../src/schema.js';

/**
 * db
 */

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined.');
}

const db = drizzle(postgres(process.env.DATABASE_URL, { max: 1 }), { schema });

/**
 * script
 */

(async () => {
  console.log(await db.query.users.findFirst());
  process.exit(0);
})();
