"use server";

import { createGame } from "@/data/post";
import { Prisma, Game } from "@prisma/client";
import { ActionResponse, GameWithUser, PlayerInfo } from "../lib/types";
import { revalidatePath } from "next/cache";
import { getGameList, getGameWithUserList, getPlayerInfo } from "@/data/get";

// get player info
export const actionGetPlayerInfo = async (params: {
  userId: string;
}): Promise<ActionResponse & { data?: PlayerInfo }> => {
  const playerInfo = await getPlayerInfo(params);

  if (!playerInfo) {
    return { status: "error", message: "Failed to fetch player info" };
  }

  return {
    status: "success",
    message: "Fetch player info successfully",
    data: playerInfo,
  };
};
