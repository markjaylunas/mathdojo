"use server";

import { GameMode, GameWithUser } from "@/src/lib/types";
import prisma from "@lib/prisma";
import { Game, Prisma } from "@prisma/client";

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
}) => {
  const gameList = await prisma.game.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where,
    include: {
      user: true,
    },
    take: limit,
    skip: (page - 1) * limit,
  });

  return gameList as GameWithUser[];
};
