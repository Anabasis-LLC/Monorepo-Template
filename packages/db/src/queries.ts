// 3rd party
import { eq } from 'drizzle-orm';

// lib
import { db } from './client';
import { CreateOauthConnection, CreateUser } from './models';
import { users, oauthConnections } from './schema';

/**
 * createUser
 */

export const createUser = async ({
  newConnection,
  newUser,
}: {
  newConnection: Omit<CreateOauthConnection, 'userId' | 'updatedAt'>;
  newUser: Omit<CreateUser, 'updatedAt'>;
}) => {
  const existingOauthConnection = await db.query.oauthConnections.findFirst({
    where: (oauthConnections, { eq, and }) =>
      and(
        eq(oauthConnections.provider, newConnection.provider),
        eq(oauthConnections.providerId, newConnection.providerId),
      ),
    with: {
      user: true,
    },
  });

  const existingUser =
    existingOauthConnection?.user ||
    (await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, newUser.email),
    }));

  return await db.transaction(async (tx) => {
    const updatedAt = new Date().toISOString();

    const user = existingUser
      ? (
          await tx
            .update(users)
            .set({ ...newUser, updatedAt })
            .where(eq(users.id, existingUser.id))
            .returning()
        )[0]
      : (
          await tx
            .insert(users)
            .values({ ...newUser, updatedAt })
            .returning()
        )[0];

    if (existingOauthConnection) {
      await tx
        .update(oauthConnections)
        .set({ ...newConnection, updatedAt })
        .where(eq(oauthConnections.id, existingOauthConnection.id));
    } else {
      await tx
        .insert(oauthConnections)
        .values({ ...newConnection, userId: user.id, updatedAt });
    }

    return user;
  });
};
