import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db/db';
import GitHub from '@auth/core/providers/github';
import Nodemailer from '@auth/core/providers/nodemailer';
import { createTransport } from 'nodemailer';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: '/login',
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    Nodemailer({
      from: process.env.EMAIL_FROM as string,
      server: {
        host: process.env.EMAIL_SERVER_HOST as string,
        port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
        auth: {
          user: process.env.EMAIL_SERVER_USER as string,
          pass: process.env.EMAIL_SERVER_PASSWORD as string,
        },
      },
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        const transport = createTransport({
          host: process.env.EMAIL_SERVER_HOST as string,
          port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
          auth: {
            user: process.env.EMAIL_SERVER_USER as string,
            pass: process.env.EMAIL_SERVER_PASSWORD as string,
          },
        });

        // Send the email
        await transport.sendMail({
          to: email,
          from: provider.from,
          subject: 'Sign in to your account',
          text: `Sign in to your account using this link: ${url}`,
          html: `<p>Sign in to your account using this link: <a href="${url}">${url}</a></p>`,
        });
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
});
