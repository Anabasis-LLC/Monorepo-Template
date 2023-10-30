// 3rd party
import type { Socket } from 'socket.io';
import { z } from 'zod';

// lib
import { JWT } from './jwt';

/**
 * Socket
 */

declare module 'socket.io' {
  interface Socket extends ExtendedSocket {}
}

/**
 * ExtendedSocket
 */

export interface ExtendedSocket {
  encodedToken?: string;
  decodedToken?: JWT;
  authToken?: AuthToken;
}

/**
 * SocketIOMiddleware
 */

export type SocketIOMiddleware = (
  socket: Socket,
  next: (error?: Error) => void,
) => void;

/**
 * AuthToken
 */

export const authTokenSchema = z.discriminatedUnion('type', [
  // @TODO: Add proper authentication to the relay connection.
  z.object({ type: z.literal('relay') }),
  z.object({
    type: z.literal('user'),
    user: z.object({ uuid: z.string().uuid() }),
  }),
]);

export type AuthToken = z.infer<typeof authTokenSchema>;
