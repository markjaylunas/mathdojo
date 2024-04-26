import { GameWithUser } from "@/src/lib/types";
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
  followerId: Follower["followerId"];
  followingId: Follower["followingId"];
}): Promise<Follower> => {
  const follower = await prisma.follower.create({
    data: {
      follower: {
        connect: {
          id: params.followerId,
        },
      },
      following: {
        connect: {
          id: params.followingId,
        },
      },
    },
  });

  if (!follower) {
    throw new Error("Failed to create follower");
  }

  return follower;
};

export const likeGame = async (params: {
  gameId: Game["id"];
  userId: User["id"];
}): Promise<GameWithUser> => {
  const { gameId, userId } = params;

  const likedGame = await prisma.gameLike.findFirst({
    where: {
      gameId: gameId,
      userId: userId,
    },
    select: {
      game: {
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
      },
    },
  });

  if (likedGame) {
    return likedGame.game;
  }

  const game = await prisma.game.update({
    where: {
      id: gameId,
    },
    data: {
      like: {
        increment: 1,
      },
    },
  });

  const gameLike = await prisma.gameLike.create({
    data: {
      game: {
        connect: {
          id: gameId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
    select: {
      game: {
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
      },
    },
  });

  if (!gameLike) {
    throw new Error("Failed to like game");
  }

  return gameLike.game;
};
