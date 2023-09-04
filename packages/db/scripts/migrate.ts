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

const url = process.env.DATABASE_URL;
const db = drizzle(postgres(url, { max: 1 }));

migrate(db, { migrationsFolder: './drizzle' })
  .then(() => {
    console.log('Migrations completed successfully.');
    process.exit(0);
  })
  .catch((e) => {
    if (e instanceof Error) {
      if (e.message.includes('ECONNREFUSED')) {
        console.error(
          `Unable to connect to \`${url}\`.\nDid you run \`sudo service postgresql start\`?`,
        );

        process.exit(1);
      } else if (e.message.includes('does not exist')) {
        const separatorIndex = url.lastIndexOf('/');
        const host = url.substring(0, separatorIndex);
        const name = url.substring(separatorIndex + 1);

        console.error(
          `Database does not exist \`${url}\`.\nDid you run \`psql ${host} -c "CREATE DATABASE ${name}"\`?`,
        );

        process.exit(1);
      }
    }

    console.error('Migrations failed with unknown error:', e);
    process.exit(1);
  });
