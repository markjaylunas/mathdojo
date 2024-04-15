import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { signinSchema } from "@lib/validationSchema";
import { getUserByEmail } from "@data/get";
import bcryptjs from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = signinSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail({ email });
          if (!user || !user.password) return null;

          const passwordsMatch = await bcryptjs.compare(
            password,
            user.password
          );

          if (passwordsMatch) {
            const { password, ...userWithoutPass } = user;
            return userWithoutPass;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
