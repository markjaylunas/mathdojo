import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { signinSchema } from "@lib/validationSchema";
import { getUserByEmail } from "@data/user";
import bcryptjs from "bcryptjs";

export default {
  providers: [
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
