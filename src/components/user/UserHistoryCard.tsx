import { Game } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import { CarouselItem } from "../ui/carousel";
import Text from "../ui/text";
import { formatNumber } from "@/src/lib/game";
import { Separator } from "../ui/separator";
import { formatTime } from "@/src/lib/utils";
import { IconClockFilled, IconSquareXFilled } from "@tabler/icons-react";
import { IconSquareCheckFilled } from "@tabler/icons-react";
import _ from "lodash";
import moment from "moment";

type Props = {
  game: Game;
};
const UserHistoryCard = ({ game }: Props) => {
  return (
    <CarouselItem className="basis-1/2 sm:basis-1/2  md:basis-1/4 lg:basis-1/5">
      <Card className="h-44 rounded-sm">
        <CardContent className="flex h-full flex-col items-start justify-between p-1 py-2">
          <div className="flex w-full items-center justify-center px-3">
            <div className="flex w-full flex-col justify-between ">
              <Text className="text-md font-semibold text-primary">
                {formatNumber(game.score)}
              </Text>
              <Text className="text-xs font-semibold ">Lv.{game.level}</Text>
            </div>
            <Text className="text-2xl font-extrabold">{game.rating}</Text>
          </div>
          <Separator className="my-1" />

          <div className="flex flex-col items-start justify-center gap-1 px-3">
            <div className="flex items-center justify-start gap-1">
              <IconSquareXFilled size={20} className="text-red-600" />
              <Text className="text-sm font-medium">{game.wrong}</Text>
            </div>
            <div className="flex items-center justify-start gap-1">
              <IconSquareCheckFilled size={20} className="text-green-600" />
              <Text className="text-sm font-medium">{game.correct}</Text>
            </div>
            <div className="flex items-center justify-start gap-1">
              <IconClockFilled size={20} className="text-gray-600" />
              <Text className="text-sm font-medium">
                {formatTime(game.gameTime).formattedTime}
              </Text>
            </div>
          </div>

          <div className="w-full px-2">
            <Text className="text-right text-xs font-normal text-gray-500">
              {moment(game.createdAt).fromNow()}
            </Text>
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
};

export default UserHistoryCard;
