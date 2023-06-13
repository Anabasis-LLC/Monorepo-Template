/* eslint-disable no-console */

// 3rd party
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

/**
 * migrate
 */

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined.');
}

const db = drizzle(postgres(process.env.DATABASE_URL, { max: 1 }));

migrate(db, { migrationsFolder: './drizzle' })
  .then(() => {
    console.log('migrations complete');
    process.exit(0);
  })
  .catch((e) => {
    console.error('migrations failed', e);
    process.exit(1);
  });
