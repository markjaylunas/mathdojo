import z from "zod";
import { removeExtraSpaces, usernameFormat } from "./string";

const zCreatePassword = z
  .string()
  .min(1, "Password is required")
  .min(6, "Password is too short")
  .max(255, "Password is too long")
  .refine((value) => {
    return /[a-z]/.test(value);
  }, "Password must have at least one lowercase letter")
  .refine(
    (value) => /[A-Z]/.test(value),
    "Password must have at least one uppercase letter"
  )
  .refine(
    (value) => /[$&+,:;=?@#|'<>.^*()%!-]/.test(value),
    "Password must have a special symbol"
  );

export const signinSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type TSigninSchema = z.infer<typeof signinSchema>;

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long")
    .refine((value) => /^[a-zA-Z0-9._-]+$/.test(value), {
      message:
        "Username can only include alphanumeric characters, periods, underscores, and hyphens",
      path: ["username"],
    })
    .refine((value) => !/\s/.test(value), {
      message: "Username cannot contain spaces",
      path: ["username"],
    }),
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
    .max(255, "Email is too long")
    .refine((value) => removeExtraSpaces(value)),
  password: zCreatePassword,
});

export type TSignupSchema = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
});

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: zCreatePassword,
});

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
