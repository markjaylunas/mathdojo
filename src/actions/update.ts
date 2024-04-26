"use server";

import { unlikeGame } from "@/data/delete";
import { likeGame } from "@/data/post";
import { buyPerk, updateUsePerk } from "@/data/update";
import { Game, UserPerk } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ActionResponse, GameWithUser } from "../lib/types";

// buy perk
export const actionBuyPerk = async (params: {
  userId: string;
  perkId: string;
  quantity: number;
}): Promise<ActionResponse> => {
  const message = await buyPerk(params);

  if (!message) {
    return { status: "error", message: "Failed to buy perk" };
  }

  revalidatePath("/shop");
  return {
    status: "success",
    message: "Bought perk successfully",
  };
};

// use perk
export const actionUsePerk = async (params: {
  userPerkId: UserPerk["id"];
}): Promise<ActionResponse> => {
  const updated = await updateUsePerk(params);

  if (!updated) {
    return { status: "error", message: "Failed to use perk" };
  }

  revalidatePath("/classic");
  return {
    status: "success",
    message: "Used perk successfully",
  };
};

export const actionLikeGame = async (params: {
  gameId: string;
  userId: string;
}): Promise<ActionResponse & { data: GameWithUser }> => {
  const updateGame = await likeGame(params);

  if (!updateGame) {
    return {
      status: "error",
      message: "Failed to like game",
      data: updateGame,
    };
  }

  return {
    status: "success",
    message: "Liked game successfully",
    data: updateGame,
  };
};

export const actionUnlikeGame = async (params: {
  gameId: string;
  gameLikeId: string;
  userId: string;
}): Promise<ActionResponse & { data: GameWithUser }> => {
  const game = await unlikeGame(params);

  if (!game) {
    return { status: "error", message: "Failed to unlike game", data: game };
  }

  return {
    status: "success",
    message: "Unliked game successfully",
    data: game,
  };
};
