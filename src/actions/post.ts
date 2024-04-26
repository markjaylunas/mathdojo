"use server";

import { followUser } from "@/data/post";
import { Follower, Prisma, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const actionFollowUser = async (params: {
  followerId: Follower["id"];
  userId: User["id"];
  path: string;
}): Promise<Follower> => {
  const { followerId, userId } = params;
  const follower = await followUser({ followerId, userId });

  revalidatePath(params.path);
  return follower;
};
