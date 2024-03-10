import prisma from "@lib/prisma";

export const getUserByEmail = async ({ email }: { email: string }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};
