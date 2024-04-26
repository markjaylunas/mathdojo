"use server";

import { followUser } from "@/data/post";
import { Follower, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const actionFollowUser = async (params: {
  followerId: Follower["followerId"];
  followingId: Follower["followingId"];
  path: string;
}): Promise<Follower> => {
  const { followerId, followingId } = params;
  const follower = await followUser({ followerId, followingId });

  revalidatePath(params.path);
  return follower;
};
