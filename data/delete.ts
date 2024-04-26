import { GameWithUser } from "@/src/lib/types";
import prisma from "@lib/prisma";
import { Follower, Game, GameLike } from "@prisma/client";

// unfollow user
export const unfollowUser = async (params: {
  id: Follower["id"];
}): Promise<null> => {
  const { id } = params;
  const follower = await prisma.follower.delete({
    where: {
      id,
    },
  });

  if (!follower) {
    throw new Error("Failed to delete follower");
  }

  return null;
};

// unlike game
export const unlikeGame = async (params: {
  gameId: Game["id"];
  gameLikeId: GameLike["id"];
  userId: GameLike["userId"];
}): Promise<GameWithUser> => {
  const { gameId, gameLikeId, userId } = params;

  const gameUpdated = await prisma.game.update({
    where: {
      id: gameId,
    },
    data: {
      likes: {
        delete: {
          id: gameLikeId,
        },
      },
      like: {
        decrement: 1,
      },
    },
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
  });

  if (!gameUpdated) {
    throw new Error("Failed to update like");
  }

  return gameUpdated;
};
