"use server";

import {
  ActionResponse,
  HighScore,
  PlayerInfo,
  ShopOnLoad,
} from "../lib/types";
import {
  getHighScoreList,
  getPerkList,
  getPlayerInfo,
  getUserCoin,
} from "@/data/get";

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

// get shop on load data
export const actionGetShopOnLoad = async (params: {
  userId: string;
}): Promise<ActionResponse & { data?: ShopOnLoad }> => {
  const { userId } = params;

  const perkListPromise = getPerkList();
  const userCointPromise = getUserCoin({ userId });

  const [perkList, userCoin] = await Promise.all([
    perkListPromise,
    userCointPromise,
  ]);

  return {
    status: "success",
    message: "Fetch shop on load data successfully",
    data: {
      perkList,
      userCoin,
    },
  };
};
