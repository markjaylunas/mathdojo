"use server";

import { createGame } from "@/data/post";
import { Prisma, Game } from "@prisma/client";
import { ActionResponse } from "../lib/types";

// create game
export const actionCreateGame = async (
  params: Prisma.GameCreateInput
): Promise<ActionResponse & { data?: Game }> => {
  const createdGame = await createGame(params);

  if (!createdGame) {
    return { status: "error", message: "Failed to create game" };
  }

  return {
    status: "success",
    message: "Saved game successfully",
    data: createdGame,
  };
};
