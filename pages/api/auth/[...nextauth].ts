import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '@/database';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@mail.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        const user = await dbUsers.checkEmailPassword(
          credentials!.email,
          credentials!.password
        );

        if (user) {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } else {
          return null;
        }
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    // ...add more providers here
  ],

  session: {
    maxAge: 2592000, // 30d,
    strategy: 'jwt',
    updateAge: 86400,
  },

  //Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  //Callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'credentials':
            token.user = user;
            break;

          case 'oauth':
            token.user = await dbUsers.oAuthDbUser(
              user?.email || '',
              user?.name || ''
            );
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;

      return session;
    },
  },
};

export default NextAuth(authOptions);
