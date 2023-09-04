// 3rd party
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { headers, cookies } from 'next/headers';

// package
import { db } from '@anabasis/db';

/**
 * sessionUserId
 */

export const sessionUserId = (req: NextRequest) =>
  parseInt(req.headers.get('x-session-user-id')!);

/**
 * getSessionToken
 */

export const getSessionToken = async (request?: NextRequest) => {
  // https://github.com/nextauthjs/next-auth/issues/5754
  const req =
    request ||
    ({
      headers: Object.fromEntries(headers()),
      cookies: Object.fromEntries(
        cookies()
          .getAll()
          .map((c) => [c.name, c.value]),
      ),
    } as any);

  return getToken({ req });
};

/**
 * getSessionUserId
 */

export const getSessionUserId = async (request?: NextRequest) => {
  const token = await getSessionToken(request);
  return typeof token?.userId === 'number' ? token?.userId : undefined;
};

/**
 * getSessionUser
 */

export const getSessionUser = async (request?: NextRequest) => {
  const sessionUserId = await getSessionUserId(request);

  const user = sessionUserId
    ? await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, sessionUserId),
      })
    : undefined;

  return user;
};
