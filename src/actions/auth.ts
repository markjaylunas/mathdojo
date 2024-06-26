"use server";

import {
  TCreateUsernameSchema,
  TForgotPasswordSchema,
  TResetPasswordSchema,
  TSigninSchema,
  TSignupSchema,
  createUsernameSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  signinSchema,
  signupSchema,
} from "@lib/validationSchema";
import { signIn, signOut } from "@/src/lib/auth";
import { AuthError } from "next-auth";
import { ActionResponse } from "@lib/types";

import prisma from "@lib/prisma";
import bcryptjs from "bcryptjs";
import { DEFAULT_SIGNIN_REDIRECT } from "../lib/routes";
import {
  generatePasswordResetToken,
  generateVerificationToken,
} from "../lib/tokens";
import { sendPasswordResetEmail, sendVerificationEmail } from "@lib/mail";
import { getVerificationTokenByToken } from "@/data/token/verification-token";
import { getPasswordResetTokenByToken } from "@/data/token/password-reset-token";
import { User } from "@prisma/client";
import { getUserByEmail, getUserById, getUserByUsername } from "@/data/get";
import { updateUser } from "@/data/update";

// sign in action

export const actionSignin = async (
  values: TSigninSchema
): Promise<ActionResponse & { user?: User | null }> => {
  const validatedFields = signinSchema.safeParse(values);

  if (!validatedFields.success) {
    return { status: "error", message: validatedFields.error.message };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail({ email });

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { status: "error", message: "Email does not exists!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken({ email });

    await sendVerificationEmail({
      email: verificationToken.email,
      token: verificationToken.token,
    });

    return {
      status: "success",
      message: "Email not verified. Confirmation email sent!",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: DEFAULT_SIGNIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: "error",
            message: "Invalid email or password",
          };
        default:
          return { status: "error", message: "Something went wrong" };
      }
    }
  }
  return { status: "success", message: "User signed in", user: existingUser };
};

// sign up action

export const actionSignup = async (
  values: TSignupSchema
): Promise<ActionResponse> => {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { status: "error", message: validatedFields.error.message };
  }

  const { username, name, email, password } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { status: "error", path: "email", message: "Email already in use" };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken({
    email,
  });
  await sendVerificationEmail({
    email: verificationToken.email,
    token: verificationToken.token,
  });

  return {
    status: "success",
    message: "Confirmation email sent! Please verify your email",
  };
};

// sign out action

export const actionSignOut = async () => {
  await signOut();
};

// new verification action

export const actionNewVerification = async (params: {
  token: string;
}): Promise<ActionResponse> => {
  const { token } = params;
  const existingToken = await getVerificationTokenByToken({ token });

  if (!existingToken) {
    return { status: "error", message: "Token does not exists" };
  }
  const hasExpired = new Date(existingToken.expiresAt) > new Date();

  if (hasExpired) {
    return { status: "error", message: "Token has expired" };
  }

  const existingUser = await getUserByEmail({ email: existingToken.email });

  if (!existingUser) {
    return { status: "error", message: "Email does not exists" };
  }

  await prisma.user.update({
    where: { email: existingToken.email },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { status: "success", message: "Email verified" };
};

// forgot password action

export const actionForgotPassword = async (
  values: TForgotPasswordSchema
): Promise<ActionResponse> => {
  const validatedFields = forgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { status: "error", message: validatedFields.error.message };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail({ email });

  if (!existingUser) {
    return { status: "error", path: "email", message: "Email does not exists" };
  }

  const passwordResetToken = await generatePasswordResetToken({ email });

  await sendPasswordResetEmail({
    email: passwordResetToken.email,
    token: passwordResetToken.token,
  });

  return { status: "success", message: "Reset password email sent" };
};

// reset password action

export const actionResetPassword = async ({
  values,
  token,
}: {
  values: TResetPasswordSchema;
  token: string | null;
}): Promise<ActionResponse> => {
  if (!token) {
    return { status: "error", message: "Invalid token" };
  }

  const validatedFields = resetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { status: "error", message: validatedFields.error.message };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken({ token });

  if (!existingToken) {
    return { status: "error", message: " Token does not exists" };
  }

  const hasExpired = new Date(existingToken.expiresAt) > new Date();

  if (hasExpired) {
    return { status: "error", message: "Token has expired" };
  }

  const existingUser = await getUserByEmail({ email: existingToken.email });

  if (!existingUser) {
    return { status: "error", message: "Email does not exists" };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { status: "success", message: "Reset password email sent" };
};

// create username action

export const actionCreateUsername = async (
  values: TCreateUsernameSchema
): Promise<ActionResponse & { data?: User }> => {
  const validatedFields = createUsernameSchema.safeParse(values);
  if (!validatedFields.success) {
    return { status: "error", message: validatedFields.error.message };
  }
  const { id, username } = validatedFields.data;

  const existingUsername = await getUserByUsername({ username });
  if (existingUsername) {
    return {
      status: "error",
      path: "username",
      message: "Username already exist",
    };
  }

  const existingUser = await getUserById({ id });
  if (!existingUser) {
    return { status: "error", path: "username", message: "User doesn't exist" };
  }

  const updatedUser = await updateUser({ id: existingUser.id, username });
  if (!updatedUser) {
    return { status: "error", path: "username", message: "User update failed" };
  }

  return {
    status: "success",
    message: "Created username successfully",
    data: updatedUser,
  };
};
