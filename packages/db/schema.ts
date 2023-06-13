// 3rd party
import { sql } from 'drizzle-orm';
import {
  pgTable,
  serial,
  uuid,
  text,
  integer,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

/**
 * users
 */

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    uuid: uuid('uuid')
      .default(sql`gen_random_uuid()`)
      .notNull(),
    email: text('email').notNull(),
    name: text('name').notNull(),
    avatarId: integer('avatar_id').references(() => images.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    avatarUrl: text('avatar_url'),
    encryptedPassword: text('encrypted_password'),
    magicTokenSalt: text('magic_token_salt'),
    timeZone: text('time_zone').default('GMT').notNull(),
    emailVerifiedAt: timestamp('email_verified_at', {
      precision: 3,
      mode: 'string',
    }),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', {
      precision: 3,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      emailKey: uniqueIndex('users_email_key').on(table.email),
      uuidKey: uniqueIndex('users_uuid_key').on(table.uuid),
    };
  },
);

/**
 * oauthConnections
 */

export const oauthConnections = pgTable(
  'oauth_connections',
  {
    id: serial('id').primaryKey(),
    uuid: uuid('uuid')
      .default(sql`gen_random_uuid()`)
      .notNull(),
    userId: integer('userId')
      .notNull()
      .references(() => users.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    provider: text('provider').notNull(),
    providerId: text('provider_id').notNull(),
    accessToken: text('access_token').notNull(),
    refreshToken: text('refresh_token'),
    email: text('email').notNull(),
    name: text('name').notNull(),
    image: text('image'),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', {
      precision: 3,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      providerProviderIdKey: uniqueIndex(
        'oauth_connections_provider_provider_id_key',
      ).on(table.provider, table.providerId),
      uuidKey: uniqueIndex('oauth_connections_uuid_key').on(table.uuid),
    };
  },
);

/**
 * images
 */

export const images = pgTable(
  'images',
  {
    id: serial('id').primaryKey(),
    uuid: uuid('uuid')
      .default(sql`gen_random_uuid()`)
      .notNull(),
    filename: text('filename').notNull(),
    contentType: text('content_type').notNull(),
    byteSize: integer('byte_size').notNull(),
    width: integer('width'),
    height: integer('height'),
    checksum: text('checksum').notNull(),
    key: text('key').notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', {
      precision: 3,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      uuidKey: uniqueIndex('images_uuid_key').on(table.uuid),
    };
  },
);
