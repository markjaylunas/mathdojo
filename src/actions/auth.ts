"use server";

import { TSignupSchema, signupSchema } from "@lib/validationSchema";
import { signIn, signOut } from "@/src/lib/auth";
import { AuthError } from "next-auth";
import { ActionResponse } from "@lib/types";

import prisma from "@lib/prisma";
import bcryptjs from "bcryptjs";
import { DEFAULT_SIGNIN_REDIRECT } from "../lib/routes";

export const actionSignin = async (
  values: TSignupSchema
): Promise<ActionResponse> => {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { status: "error", message: validatedFields.error.message };
  }

  const { email, password } = validatedFields.data;

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

  return { status: "success", message: "User signed in" };
};

export const actionSignup = async (
  values: TSignupSchema
): Promise<ActionResponse> => {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { status: "error", message: validatedFields.error.message };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { status: "error", path: "email", message: "Email already in use" };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  //   todo: send email verification token

  //   return { success: "Email sent to your inbox. Please verify your email." };
  return { status: "success", message: "User created" };
};

export const actionSignOut = async () => {
  await signOut();
};
