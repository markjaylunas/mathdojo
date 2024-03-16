import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidV4 } from "uuid";
import prisma from "@lib/prisma";

export const generateVerificationToken = async (params: { email: string }) => {
  const { email } = params;
  const token = uuidV4();
  const duration = 2; // hours
  const expiresAt = new Date(new Date().getTime() + 3600 * duration); // 24 hours from now

  const existingToken = await getVerificationTokenByEmail({ email });

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return verificationToken;
};
