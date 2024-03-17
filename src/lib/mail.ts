import nodemailer from "nodemailer";

export const sendVerificationEmail = async (params: {
  email: string;
  token: string;
}) => {
  const { email, token } = params;
  const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/new-verification?token=${token}`;

  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = process.env;

  const transporter = nodemailer.createTransport({
    service: SMTP_HOST,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  const mailOption = {
    from: SMTP_USER,
    to: email,
    subject: "Email Verification",
    html: `
    <h1>Welcome to Mathwars!</h1>
    <p>Dear User,</p>
    <p>Thank you for registering. Please click the link below to verify your email address:</p>
    <p><a href="${confirmLink}">Verify Email Address</a></p>
    <p>If you did not request this, please ignore this email.</p>
    <p>Best,</p>
    <p>Makje Team</p>
      `,
  };

  await transporter.sendMail(mailOption);
};
