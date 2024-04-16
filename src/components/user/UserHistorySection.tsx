import { Game } from "@prisma/client";
import { Carousel, CarouselContent } from "../ui/carousel";
import UserHistoryCard from "./UserHistoryCard";
import Link from "next/link";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { CLASSIC_GAME_PATH } from "@/src/lib/routes";
import Text from "../ui/text";

type Props = {
  gameList: Game[];
};
const UserHistorySection = ({ gameList }: Props) => {
  return (
    <div className="">
      <div className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">History</h2>
        <p className="text-sm text-muted-foreground">
          Here&apos;s your game history. It includes all the games you&apos;ve
          played recently.
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="mt-4 w-full max-w-full"
      >
        {gameList.length > 0 ? (
          <CarouselContent>
            {gameList.map((game) => (
              <UserHistoryCard game={game} key={game.id} />
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
