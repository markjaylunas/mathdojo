"use server";

import { auth } from "@/src/lib/auth";
import {
  BasicUser,
  GameMode,
  GameWithUser,
  GetGameWithUserListParams,
  HighScore,
  PlayerInfo,
  UserProfile,
} from "@/src/lib/types";
import prisma from "@lib/prisma";
import { Perk, Prisma, User, UserPerk } from "@prisma/client";

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
  userId,
  page = 1,
  limit = 10,
  isGlobal,
}: GetGameWithUserListParams): Promise<GameWithUser[]> => {
  let where: Prisma.GameWhereInput = {};
  let followingUserIds: string[] = [];

  if (!isGlobal) {
    const followingList = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });

    followingUserIds = followingList.map((following) => following.followingId);

    where = {
      userId: {
        in: followingUserIds,
      },
    };
  }

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
          level: true,
          exp: true,
        },
      },
      likes: {
        where: {
          userId: userId,
        },
        select: {
          id: true,
        },
        take: 1,
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

  const userPerkList = await prisma.userPerk.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      quantity: true,
      perk: {
        select: {
          id: true,
          name: true,
          description: true,
          icon: true,
          type: true,
        },
      },
    },
    orderBy: {
      perk: {
        price: "asc",
      },
    },
  });

  return { highestScore, userPerkList };
};

export const getHighScoreList = async (params: {
  month: number;
  year: number;
}): Promise<HighScore[]> => {
  const { month, year } = params;

  const highScoreList = await prisma.game.findMany({
    orderBy: {
      score: "desc",
    },
    select: {
      id: true,
      score: true,
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          image: true,
          level: true,
          exp: true,
        },
      },
      createdAt: true,
    },
    where: {
      createdAt: {
        gte: new Date(`${year}-${month}-01`),
        lte: month === 12 ? new Date(year + 1, 0, 1) : new Date(year, month, 1),
      },
    },
    take: 12,
  });
  return highScoreList;
};

export const getPerkList = async (): Promise<Perk[]> => {
  const perkList = await prisma.perk.findMany({
    orderBy: {
      price: "asc",
    },
  });

  return perkList;
};

export const getUserCoin = async ({
  userId,
}: {
  userId: User["id"];
}): Promise<number> => {
  const coinCount = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return coinCount?.coin || 0;
};

export const getUserPerkList = async ({
  userId,
}: {
  userId: User["id"];
}): Promise<UserPerk[]> => {
  const userPerkList = await prisma.userPerk.findMany({
    where: {
      userId,
    },
  });

  return userPerkList;
};

export const searchUser = async ({
  search,
}: {
  search: string;
}): Promise<BasicUser[]> => {
  const userList = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          username: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    take: 12,
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      image: true,
      level: true,
      exp: true,
    },
  });

  return userList;
};

export const getUserProfile = async (params: {
  username: string;
  currentUserId: string;
}): Promise<UserProfile> => {
  const user = await prisma.user.findFirst({
    where: {
      username: params.username,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      image: true,
      level: true,
      exp: true,
      games: {
        select: {
          id: true,
        },
      },
    },
  });

  if (user === null) {
    throw new Error("User not found");
  }

  const { games, ...userOnly } = user;

  // Get the counts
  const followersCount = await prisma.follower.count({
    where: {
      followingId: user.id,
    },
  });

  const followingCount = await prisma.follower.count({
    where: {
      followerId: user.id,
    },
  });

  const followUser = await prisma.follower.findFirst({
    where: {
      followingId: user.id,
      followerId: params.currentUserId,
    },
  });

  const userProfile = {
    user: userOnly,
    games: games.length,
    followings: followingCount,
    followers: followersCount,
    followUser: followUser,
  };

  return userProfile;
};
