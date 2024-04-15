import prisma from "@lib/prisma";
import { Game, Prisma } from "@prisma/client";

export const createGame = async (
  params: Prisma.GameCreateInput
): Promise<Game> => {
  const game = await prisma.game.create({
    data: params,
  });
  return game;
};
