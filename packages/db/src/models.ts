// 3rd party
import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// lib
import { users, oauthConnections } from './schema';

/**
 * User
 */

export const createUserSchema = createInsertSchema(users).omit({
  id: true,
  uuid: true,
  createdAt: true,
});

export type CreateUser = z.infer<typeof createUserSchema>;

export const UserSchema = createSelectSchema(users);

export type User = z.infer<typeof UserSchema>;

/**
 * OauthConnection
 */

export const createOauthConnectionSchema = createInsertSchema(
  oauthConnections,
).omit({
  id: true,
  uuid: true,
  createdAt: true,
});

export type CreateOauthConnection = z.infer<typeof createOauthConnectionSchema>;

export const OauthConnectionSchema = createSelectSchema(oauthConnections);

export type OauthConnection = z.infer<typeof OauthConnectionSchema>;
