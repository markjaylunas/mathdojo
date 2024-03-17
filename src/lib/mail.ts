import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (params: {
  email: string;
  token: string;
}) => {
  const { email, token } = params;
  const confirmLink = `${process.env.SITE_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "",
    to: email,
    subject: "Verify your email address",
    html: `
        <p>Thank you for signing up to Mathwars. To complete the process, please click the link below to verify your email address:</p>
        <p><a href="${confirmLink}">Verify email</a></p>
        <p>If you did not sign up for an account, please ignore this email.</p>
    `,
  });
};
