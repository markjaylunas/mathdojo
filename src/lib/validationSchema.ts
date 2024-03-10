import z from "zod";

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
    .max(255, "Email is too long"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(255, "Password is too long"),
});

export type TSigninSchema = z.infer<typeof signinSchema>;

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
    .max(255, "Email is too long"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password is too short")
    .max(255, "Password is too long"),
});

export type TSignupSchema = z.infer<typeof signupSchema>;
