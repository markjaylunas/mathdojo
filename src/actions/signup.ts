"use server";

import { TSignupSchema, signupSchema } from "@lib/validationSchema";
import prisma from "@lib/prisma";
import bcrypt from "bcrypt";
import { ActionResponse } from "@lib/types";

export const authSignup = async (
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

  const hashedPassword = await bcrypt.hash(password, 10);

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
