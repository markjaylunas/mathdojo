"use server";

import { TSignupSchema, signupSchema } from "@/lib/validationSchema";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authSignup = async (values: TSignupSchema) => {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.message };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already in use!" };
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
  return { success: "User created!" };
};
