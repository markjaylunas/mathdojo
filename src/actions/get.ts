"use server";

import { ActionResponse, HighScore, PlayerInfo } from "../lib/types";
import { getHighScoreList } from "@/data/get";

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
