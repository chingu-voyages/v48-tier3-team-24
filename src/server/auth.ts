import { PrismaAdapter } from "@auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import type { User } from '@prisma/client';
import { env } from "~/env";
import { db } from "~/server/db";
import { compare } from "~/utils/bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & User;
  }
  interface Profile {
    email?: string;
    image?: string;
    name?: string;
    sub?: string;
    verified?: boolean;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
  callbacks: {
    jwt: async ({ token, account, profile }) => {
      // If an additional argument other than token is defined, it means user is being signed in.
      const user = await db.user.findFirst({
        where: { id: token.sub }
      });
      token.role = user?.role;
      if(account?.provider === 'credentials') {
        token.username = user?.username;
        token.firstName = user?.firstName;
        token.lastName = user?.lastName;
        token.emailVerified = user?.emailVerified;
      }
      if(account?.provider === 'discord') {
        // For discord, make sure the discord user has verified their account in discord
        if(profile && profile.verified) {
          token.emailVerified = new Date();
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          // Crendential users will have username instead of name
          username: token.username,
          firstName: token.firstName,
          lastName: token.lastName
        },
      };
    }
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text'},
        password: { label: 'Password', type: 'password'}
      },
      async authorize(credentials, req) {
        const user = await db.user.findFirst({
          where: {
            username: credentials?.username
          }
        });
        if(user) {
          if(!credentials?.password || !user.password) {
            return null; // No password
          }
          const match = await compare(credentials?.password, user.password);
          if(!match) return null; // incorrect password
          return user;
        }
        return null;  // No user found
      }
    })
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
