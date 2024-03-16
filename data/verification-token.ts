import prisma from "@lib/prisma";

export const getVerificationTokenByEmail = async (params: {
  email: string;
}) => {
  try {
    const { email } = params;
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (params: {
  token: string;
}) => {
  try {
    const { token } = params;
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};
