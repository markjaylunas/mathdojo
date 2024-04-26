"use client";

import { actionLikeGame, actionUnlikeGame } from "@/src/actions/update";
import { formatNumber } from "@/src/lib/game";
import { GameWithUser } from "@/src/lib/types";
import { cn, formatShortNumber, formatTime } from "@/src/lib/utils";
import {
  IconClockFilled,
  IconSquareCheckFilled,
  IconSquareXFilled,
} from "@tabler/icons-react";
import moment from "moment";
import { useState } from "react";
import GameRating from "../ui/game-rating";
import { Icons } from "../ui/icons";
import { Separator } from "../ui/separator";
import Text from "../ui/text";
import { toast } from "../ui/use-toast";
import UserProfileSection from "../user/UserProfileSection";

type Props = {
  game: GameWithUser;
  userId: string;
  setGameList: React.Dispatch<React.SetStateAction<GameWithUser[]>>;
};
const HomeGameCard = ({ game, setGameList, userId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeGame = async (game: GameWithUser) => {
    try {
      setIsLoading(true);
      let newGame: GameWithUser | null = null;

      if (game.likes.length <= 0) {
        const { data } = await actionLikeGame({ gameId: game.id, userId });
        newGame = data;
      } else {
        const { data } = await actionUnlikeGame({
          gameId: game.id,
          gameLikeId: game.likes[0].id,
          userId,
        });
        newGame = data;
      }

      setGameList((currentGameList) =>
        currentGameList.map((currentGame) => {
          if (currentGame.id === newGame.id) {
            return newGame;
          }

          return currentGame;
        })
      );
    } catch (error) {
      console.error(error);

      toast({
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full border-b border-slate-300 px-4 pb-2 pt-4 dark:border-slate-700">
      <div className="flex items-start justify-between gap-4">
        <UserProfileSection user={game.user} />
        <Text className="mt-1 text-xs">{moment(game.createdAt).fromNow()}</Text>
      </div>
      <div className="ml-12 mt-4 flex h-full  items-start ">
        <div className="flex h-full flex-1 flex-col items-start justify-around">
          <div className="flex w-full flex-col">
            <div className="flex items-end gap-4">
              <Text className="text-2xl font-bold">
                {formatNumber(game.score)}
              </Text>
              <Text className="text-lg font-semibold">Lv.{game.level}</Text>
            </div>
          </div>
          <Separator className="my-1" />
          <div className="flex items-center justify-center gap-1">
            <IconClockFilled size={24} />
            <Text className="text-sm text-gray-500">
              {formatTime(game.gameTime).formattedTime}
            </Text>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pl-4">
          <GameRating rating={game.rating} size={5} />
          <Text className="text-sm">Rating</Text>
        </div>
      </div>

      <div className="ml-12 flex">
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center justify-center gap-1">
              <IconSquareCheckFilled size={24} className="text-green-600" />
              <Text className="text-xl font-bold">{game.correct}</Text>
            </div>
            <div className="flex items-center justify-center gap-1">
              <IconSquareXFilled size={24} className="text-red-600" />
              <Text className="text-xl font-bold">{game.wrong}</Text>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Icons.coin className="size-6" />
              <Text className="text-xl font-bold">
                +{formatNumber(game.coin)}
              </Text>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 px-12">
        <button
          className="group flex gap-1 transition-all duration-200 ease-in-out"
          onClick={() => handleLikeGame(game)}
          disabled={isLoading}
        >
          {game.likes.length > 0 ? (
            <Icons.heartFilled className="size-5 text-red-500" />
          ) : (
            <Icons.heart className="size-5 text-slate-600 group-hover:text-red-500 dark:text-slate-400" />
          )}
          <Text className="text-sm text-slate-600 group-hover:text-red-500 dark:text-slate-400">
            {formatShortNumber(game.like)}
          </Text>
        </button>
      </div>
    </div>
  );
};

export default HomeGameCard;
