import { Game } from "@prisma/client";
import { Card } from "../ui/card";
import GameRating from "../ui/game-rating";
import UserProfileSection from "../user/UserProfileSection";
import Text from "../ui/text";
import { formatNumber } from "@/src/lib/game";
import moment from "moment";
import { formatTime } from "@/src/lib/utils";
import {
  IconClockFilled,
  IconSquareCheckFilled,
  IconSquareXFilled,
} from "@tabler/icons-react";
import { GameWithUser } from "@/src/lib/types";

type Props = {
  game: GameWithUser;
};
const HomeGameCard = ({ game }: Props) => {
  return (
    <div className="min-h-56 w-full border-b-2 border-slate-300 px-8 pb-6 pt-4 dark:border-slate-700">
      <div className="flex items-start justify-between gap-4">
        <UserProfileSection user={game.user} />
        <Text className="mt-1 text-xs">{moment(game.createdAt).fromNow()}</Text>
      </div>

      <div className="ml-12 mt-4 flex items-start justify-between">
        <div className="flex w-full flex-col">
          <div className="flex items-end gap-4 border-b">
            <Text className="text-2xl font-bold">
              {formatNumber(game.score)}
            </Text>
            <Text className="text-lg font-semibold">Lv.{game.level}</Text>
          </div>

          <div className="mt-1 flex">
            <div className="flex flex-col items-start gap-2 py-2">
              <div className="flex items-center justify-center gap-1">
                <IconClockFilled size={24} />
                <Text className="text-sm text-gray-500">
                  {formatTime(game.gameTime).formattedTime}
                </Text>
              </div>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center justify-center gap-1">
                  <IconSquareCheckFilled size={24} className="text-green-600" />
                  <Text className="text-xl font-bold">{game.correct}</Text>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <IconSquareXFilled size={24} className="text-red-600" />
                  <Text className="text-xl font-bold">{game.wrong}</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pl-4">
          <GameRating rating={game.rating} size={5} />
          <Text className="text-sm">Rating</Text>
        </div>
      </div>
    </div>
  );
};

export default HomeGameCard;
