"use server";

import { unfollowUser } from "@/data/delete";
import { Follower } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const actionUnfollowUser = async (params: {
  id: Follower["id"];
  path: string;
}): Promise<null> => {
  const follower = await unfollowUser({ id: params.id });

  revalidatePath(params.path);
  return follower;
};
