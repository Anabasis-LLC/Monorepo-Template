// 3rd party
import { NextRequest } from 'next/server';
import { getToken, encode } from 'next-auth/jwt';
import { /* headers, */ cookies } from 'next/headers';

// package
import { db } from '@anabasis/db';
import { AuthToken } from '@anabasis/lib';

/**
 * getSessionUser
 */

export const getSessionUser = async (request?: NextRequest) => {
  // https://github.com/nextauthjs/next-auth/issues/5754
  const req =
    request ||
    ({
      // headers: Object.fromEntries(headers()),
      cookies: Object.fromEntries(
        cookies()
          .getAll()
          .map((c) => [c.name, c.value]),
      ),
    } as any);

  const token = await getToken({ req });

  const sessionUserId =
    typeof token?.userId === 'number' ? token?.userId : undefined;

  const user = sessionUserId
    ? await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, sessionUserId),
      })
    : undefined;

  if (user) {
    const token: AuthToken = {
      type: 'user',
      user: { uuid: user.uuid },
    };

    return {
      ...user,
      token: await encode({
        token,
        secret: process.env.NEXTAUTH_SECRET!,
      }),
    };
  } else {
    return undefined;
  }
};
