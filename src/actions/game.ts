"use server";

import { getGameList, getGameWithUserList } from "@/data/get";
import { createGame } from "@/data/post";
import { Game, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  ActionResponse,
  GameWithUser,
  GetGameWithUserListParams,
} from "../lib/types";

// create game
export const actionCreateGame = async (params: {
  gameParams: Prisma.GameCreateInput;
  userId: string;
}): Promise<ActionResponse & { data?: Game }> => {
  const createdGame = await createGame(params);

  if (!createdGame) {
    return { status: "error", message: "Failed to create game" };
  }

  revalidatePath(`/game/${createdGame.userId}`);
  revalidatePath("/");
  return {
    status: "success",
    message: "Saved game successfully",
    data: createdGame,
  };
};

// get list of  games
export const actionGetGameList = async (params: {
  where?: Prisma.GameWhereInput;
  page?: number;
  limit?: number;
}): Promise<ActionResponse & { data?: Game[] }> => {
  const gameList = await getGameList(params);

  if (!gameList) {
    return { status: "error", message: "Failed to get game list" };
  }

  return {
    status: "success",
    message: "Got game list successfully",
    data: gameList,
  };
};

// get list of  games with user
export const actionGetGameWithUserList = async (
  params: GetGameWithUserListParams
): Promise<ActionResponse & { data: GameWithUser[] }> => {
  const gameList = await getGameWithUserList(params);

  if (!gameList) {
    return { status: "error", message: "Failed to get game list", data: [] };
  }

  return {
    status: "success",
    message: "Got game list successfully",
    data: gameList,
  };
};
