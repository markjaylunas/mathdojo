"use server";

import { createGame } from "@/data/post";
import { Prisma, Game } from "@prisma/client";
import { ActionResponse, GameWithUser } from "../lib/types";
import { revalidatePath } from "next/cache";
import { getGameList, getGameWithUserList } from "@/data/get";

// create game
export const actionCreateGame = async (params: {
  gameParams: Prisma.GameCreateInput;
}): Promise<ActionResponse & { data?: Game }> => {
  const createdGame = await createGame(params);

  if (!createdGame) {
    return { status: "error", message: "Failed to create game" };
  }

  revalidatePath(`/game/${createdGame.userId}`);
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
export const actionGetGameWithUserList = async (params: {
  where?: Prisma.GameWhereInput;
  page?: number;
  limit?: number;
}): Promise<ActionResponse & { data?: GameWithUser[] }> => {
  const gameList = await getGameWithUserList(params);

  if (!gameList) {
    return { status: "error", message: "Failed to get game list" };
  }

  return {
    status: "success",
    message: "Got game list successfully",
    data: gameList,
  };
};
