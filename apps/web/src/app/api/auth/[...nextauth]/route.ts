// 3rd party
import NextAuth from 'next-auth';
import DiscordProvider, { DiscordProfile } from 'next-auth/providers/discord';

// workspace
import { db, createUser } from '@anabasis/db';

/**
 * handler
 */

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  debug: false, // process.env.NODE_ENV !== 'production',
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    verifyRequest: '/',
    newUser: '/',
  },
  callbacks: {
    async signIn(params) {
      const profile = params.profile
        ? (params.profile as DiscordProfile)
        : undefined;

      const { email, username: name, image_url: avatarUrl } = profile || {};

      const {
        provider,
        providerAccountId: providerId,
        access_token: accessToken,
        refresh_token: refreshToken,
      } = params.account || {};

      if (
        !email ||
        !name ||
        !avatarUrl ||
        !provider ||
        !providerId ||
        !accessToken ||
        !refreshToken
      ) {
        console.error('NextAuth#signIn: invalid params', params);
        return false;
      }

      await createUser({
        newConnection: {
          provider,
          providerId,
          accessToken,
          refreshToken,
          email,
          name,
        },
        newUser: { email, name, avatarUrl },
      });

      return true;
    },
    async jwt({ token }) {
      const providerId = token.sub;

      if (providerId) {
        const oauthConnection = await db.query.oauthConnections.findFirst({
          where: (oauthConnections, { eq }) =>
            eq(oauthConnections.providerId, providerId),
        });

        token.userId = oauthConnection?.userId;
      }

      return token;
    },
  },
});

export { handler as GET, handler as POST };
