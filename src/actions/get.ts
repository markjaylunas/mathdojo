"use server";

import { Perk } from "@prisma/client";
import { ActionResponse, HighScore, PlayerInfo } from "../lib/types";
import { getHighScoreList, getPerkList, getPlayerInfo } from "@/data/get";

// get player info
export const actionGetPlayerInfo = async (params: {
  userId: string;
}): Promise<ActionResponse & { data?: PlayerInfo }> => {
  const { userId } = params;
  const playerInfo = await getPlayerInfo({ userId: userId });

  if (!playerInfo) {
    return { status: "error", message: "Failed to fetch player info" };
  }

  return {
    status: "success",
    message: "Fetch player info successfully",
    data: playerInfo,
  };
};

// get high score list
export const actionGetHighScoreList = async (params: {}): Promise<
  ActionResponse & { data?: HighScore[] }
> => {
  const highScoreList = await getHighScoreList();

  if (!highScoreList) {
    return { status: "error", message: "Failed to fetch high score list" };
  }

  return {
    status: "success",
    message: "Fetch high score list successfully",
    data: highScoreList,
  };
};

// get perk list
export const actionGetPerkList = async (params: {}): Promise<
  ActionResponse & { data?: Perk[] }
> => {
  const perkList = await getPerkList();

  if (!perkList) {
    return { status: "error", message: "Failed to fetch perks" };
  }

  return {
    status: "success",
    message: "Fetch perks successfully",
    data: perkList,
  };
};
