import prisma from "@lib/prisma";
import { Follower, Game, Prisma, User } from "@prisma/client";

export const createGame = async (params: {
  gameParams: Prisma.GameCreateInput;
}): Promise<Game> => {
  const { gameParams } = params;
  const game = await prisma.game.create({
    data: gameParams,
  });

  if (!game) {
    throw new Error("Failed to create game");
  }

  await prisma.user.update({
    where: {
      id: game.userId,
    },
    data: {
      coin: {
        increment: gameParams.coin,
      },
    },
  });
  return game;
};

export const followUser = async (params: {
  followerId: Follower["id"];
  userId: User["id"];
}): Promise<Follower> => {
  const follower = await prisma.follower.create({
    data: {
      follower: {
        connect: {
          id: params.followerId,
        },
      },
      user: {
        connect: {
          id: params.userId,
        },
      },
    },
  });

  if (!follower) {
    throw new Error("Failed to create follower");
  }

  return follower;
};
