import prisma from "@lib/prisma";

export const getUserByEmail = async (params: { email: string }) => {
  const { email } = params;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};
