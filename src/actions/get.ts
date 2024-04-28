"use server";

import {
  getHighScoreList,
  getPerkList,
  getPlayerInfo,
  getUserCoin,
  getUserPerkList,
  searchUser,
} from "@/data/get";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { gameRoutes } from "../lib/routes";
import {
  ActionResponse,
  BasicUser,
  HighScore,
  PlayerInfo,
  ShopOnLoad,
} from "../lib/types";

// get player info
export const actionGetPlayerInfo = async (params: {
  userId: string;
}): Promise<ActionResponse & { data?: PlayerInfo }> => {
  const { userId } = params;

  const playerInfo = await getPlayerInfo({ userId: userId });
  if (!playerInfo) {
    return { status: "error", message: "Failed to fetch player info" };
  }

  revalidatePath("/classic");

  return {
    status: "success",
    message: "Fetch player info successfully",
    data: playerInfo,
  };
};

// get high score list
export const actionGetHighScoreList = async (params: {
  month: number;
  year: number;
}): Promise<ActionResponse & { data?: HighScore[] }> => {
  const highScoreList = await getHighScoreList(params);

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
  const userPerkListPromise = getUserPerkList({ userId });
  const userCointPromise = getUserCoin({ userId });

  const [perkList, userPerkList, userCoin] = await Promise.all([
    perkListPromise,
    userPerkListPromise,
    userCointPromise,
  ]);

  return {
    status: "success",
    message: "Fetch shop on load data successfully",
    data: {
      perkList,
      userPerkList,
      userCoin,
    },
  };
};

// search user
export const actionSearchUser = async (params: {
  search: string;
}): Promise<ActionResponse & { data?: BasicUser[] }> => {
  const userList = await searchUser(params);

  return {
    status: "success",
    message: "Fetch shop on load data successfully",
    data: userList,
  };
};
