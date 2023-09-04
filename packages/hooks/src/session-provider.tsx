'use client';

// 3rd party
import { createContext, useEffect, useState } from 'react';

// package
import type { User } from '@anabasis/db';

/**
 * SessionContext
 */

export type SessionUser = User;

export type SessionContextValue = {
  sessionUser?: SessionUser | undefined;
  setSessionUser: (user?: SessionUser) => void;
};

export const SessionContext = createContext<SessionContextValue>({
  setSessionUser: () => {},
});

/**
 * SessionProvider
 */

let __user: SessionUser | undefined;

export type SessionProviderProps = {
  user: SessionUser | undefined;
  children: React.ReactNode;
};

export function SessionProvider({ user, ...props }: SessionProviderProps) {
  const [sessionUser, setSessionUser] = useState<SessionUser | undefined>(user);

  useEffect(() => {
    if (user && !__user) {
      __user = user;
      setSessionUser(__user);
    }
  }, [user]);

  if (!SessionContext) {
    throw new Error('React Context is unavailable in server components.');
  }

  return (
    <SessionContext.Provider
      value={{ sessionUser, setSessionUser }}
      {...props}
    />
  );
}
