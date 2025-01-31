
import { createTransport } from 'nodemailer';
export const EmailProvider = {
  id: 'email',
  type: 'email',
  name: 'Email',
  server: '',
  from: '',
  maxAge: 24 * 60 * 60, // 1 day
  sendVerificationRequest,
} as const;

async function sendVerificationRequest(params: {
  identifier: string;
  url: string;
  provider: { server: string; from: string };
}) {
  const { identifier, url, provider } = params;

  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: 'Sign in to your account',
    text: `Click the link below to sign in:\n\n${url}\n\n`,
    html: `<p>Click the link below to sign in:</p><p><a href="${url}">Sign in</a></p>`,
  });

  if (result.rejected.length > 0) {
    throw new Error('Email(s) could not be sent');
  }
}