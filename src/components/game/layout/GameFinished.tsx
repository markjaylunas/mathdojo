import Heading from "../../ui/heading";
import { Button } from "../../ui/button";
import { IconHome, IconReload } from "@tabler/icons-react";
import Link from "next/link";
import { DEFAULT_HOME_PATH } from "@/src/lib/routes";
import { GameInfo } from "@/src/lib/types";
import { formatTime } from "@/src/lib/utils";

type Props = {
  gameInfo: GameInfo;
  onRetry: () => void;
};
const GameFinished = ({ gameInfo, onRetry }: Props) => {
  return (
    <div className="flex flex-1 flex-col justify-around">
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <Heading className="text-5xl">Game Over</Heading>
        <h2 className=" text-2xl">Score: {gameInfo.score}</h2>
        <h2 className=" text-2xl">Correct: {gameInfo.correct}</h2>
        <h2 className=" text-2xl">Incorrect: {gameInfo.incorrect}</h2>
        <h2 className=" text-2xl">Highest Combo: {gameInfo.highestCombo}</h2>
        <h2 className=" text-2xl">Total Combo: {gameInfo.totalCombo}</h2>
        <h2 className=" text-2xl">Total Question: {gameInfo.totalQuestion}</h2>
        {/* todo: add total duration */}
        {/* <h2 className=" text-2xl">
          Duration: {formatTime(gameInfo.duration).formattedTime}
        </h2> */}
      </div>

      <div className="flex justify-center gap-4 ">
        <Link href={DEFAULT_HOME_PATH}>
          <Button className="w-full max-w-40">
            <IconHome className="mr-2" size={16} />
            Home
          </Button>
        </Link>

        <Button
          onClick={onRetry}
          className="w-full max-w-40"
          variant="secondary"
        >
          <IconReload className="mr-2" size={16} />
          Retry
        </Button>
      </div>
    </div>
  );
};

export default GameFinished;
