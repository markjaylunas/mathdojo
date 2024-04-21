"use server";

import { GameMode, GameWithUser, HighScore, PlayerInfo } from "@/src/lib/types";
import prisma from "@lib/prisma";
import { Game, Perk, Prisma } from "@prisma/client";

export const getUserByEmail = async (params: { email: string }) => {
  const { email } = params;
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return user;
};

export const getUserById = async (params: { id: string }) => {
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const getUserByUsername = async (params: { username: string }) => {
  const user = await prisma.user.findFirst({
    where: {
      ...params,
    },
  });
  return user;
};

export const getGameModeList = async (params: {}) => {
  const gameModeList = await prisma.gameMode.findMany({
    orderBy: {
      order: "asc",
    },
    include: {
      gameOperations: {
        include: {
          digitRange: true,
        },
      },
    },
  });
  return gameModeList;
};

export const getGameMode = async (
  params: Prisma.GameModeWhereInput
): Promise<GameMode | null> => {
  const gameMode = await prisma.gameMode.findFirst({
    where: params,
    include: {
      gameOperations: {
        include: {
          digitRange: true,
        },
      },
    },
  });
  return gameMode as GameMode;
};

export const getGameList = async ({
  where = {},
  page = 1,
  limit = 10,
}: {
  where?: Prisma.GameWhereInput;
  include?: Prisma.GameInclude;
  page?: number;
  limit?: number;
}) => {
  const gameList = await prisma.game.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where,
    take: limit,
    skip: (page - 1) * limit,
  });

  return gameList;
};

export const getGameWithUserList = async ({
  where = {},
  page = 1,
  limit = 10,
}: {
  where?: Prisma.GameWhereInput;
  include?: Prisma.GameInclude;
  page?: number;
  limit?: number;
}): Promise<GameWithUser[]> => {
  const gameList = await prisma.game.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          image: true,
        },
      },
    },
    take: limit,
    skip: (page - 1) * limit,
  });

  return gameList;
};

export const getPlayerInfo = async (params: {
  userId: string;
}): Promise<PlayerInfo> => {
  const { userId } = params;

  const gameScore = await prisma.game.findFirst({
    where: {
      userId,
    },
    orderBy: {
      score: "desc",
    },
    select: {
      score: true,
    },
  });

  const highestScore = gameScore?.score || 0;

  return { highestScore };
};

export const getHighScoreList = async (): Promise<HighScore[]> => {
  const highScoreList = await prisma.game.findMany({
    orderBy: {
      score: "desc",
    },
    select: {
      score: true,
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          image: true,
        },
      },
    },
    take: 12,
  });

  return highScoreList;
};

export const getPerkList = async (): Promise<Perk[]> => {
  const perkList = await prisma.perk.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return perkList;
};
