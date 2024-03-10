"use server";

import { TSignupSchema, signupSchema } from "@lib/validationSchema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { ActionResponse } from "@lib/types";

export const authSignin = async (
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
      redirectTo: DEFAULT_LOGIN_REDIRECT,
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
