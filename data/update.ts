import { Prisma, User } from "@prisma/client";
import prisma from "@lib/prisma";

export const updateUser = async (
  params: Prisma.UserUpdateInput
): Promise<User> => {
  const { id, ...userWithoutId } = params;
  if (!id) throw new Error("id is required");

  const user = await prisma.user.update({
    data: userWithoutId,
    where: {
      id: `${id}`,
    },
  });
  return user;
};
