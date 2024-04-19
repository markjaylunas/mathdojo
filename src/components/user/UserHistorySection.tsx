import { Game } from "@prisma/client";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Link from "next/link";
import { CLASSIC_GAME_PATH } from "@/src/lib/routes";
import Text from "../ui/text";
import UserGameCard from "./UserGameCard";

type Props = {
  gameList: Game[];
};
const UserHistorySection = ({ gameList }: Props) => {
  return (
    <div className="">
      <h2 className="mt-6 text-xl font-semibold tracking-tight">History</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="mt-4 w-full max-w-full"
      >
        {gameList.length > 0 ? (
          <CarouselContent>
            {gameList.map((game) => (
              <CarouselItem
                className="h-44 basis-1/2  md:basis-1/3 lg:basis-1/4"
                key={game.id}
              >
                <UserGameCard game={game} />
              </CarouselItem>
            ))}
          </CarouselContent>
        ) : (
          <div className="min-h-18 flex flex-col items-center justify-center gap-4">
            <Text className="text-center text-sm text-muted-foreground">
              Haven&apos;t played yet?&nbsp;
              <Link href={CLASSIC_GAME_PATH}>
                <span className="underline">Play Now</span>
              </Link>
            </Text>
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default UserHistorySection;
