import { Game } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import { CarouselItem } from "../ui/carousel";

type Props = {
  game: Game;
};
const UserHistoryCard = ({ game }: Props) => {
  return (
    <CarouselItem className="basis-1/3  md:basis-1/4 lg:basis-1/5">
      <div className="p-1">
        <Card className="h-44 rounded-sm">
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <span className="text-sm font-semibold">{game.score}</span>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};

export default UserHistoryCard;
