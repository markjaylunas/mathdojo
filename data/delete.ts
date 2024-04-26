import prisma from "@lib/prisma";
import { Follower } from "@prisma/client";

// unfollow user
export const unfollowUser = async (params: {
  id: Follower["id"];
}): Promise<null> => {
  const { id } = params;
  const follower = await prisma.follower.delete({
    where: {
      id,
    },
  });

  if (!follower) {
    throw new Error("Failed to delete follower");
  }

  return null;
};
