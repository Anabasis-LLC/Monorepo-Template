// 3rd party
import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// local
import { users } from '../schema';

/**
 * CreateUser
 */

export const CreateUserSchema = createInsertSchema(users).omit({
  id: true,
  uuid: true,
  createdAt: true,
});

export type CreateUser = z.infer<typeof CreateUserSchema>;

/**
 * User
 */

export const UserSchema = createSelectSchema(users);

export type User = z.infer<typeof UserSchema>;
