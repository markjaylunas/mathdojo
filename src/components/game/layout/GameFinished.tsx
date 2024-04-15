import Heading from "../../ui/heading";
import { Button } from "../../ui/button";
import { IconHome, IconReload } from "@tabler/icons-react";
import Link from "next/link";
import { DEFAULT_HOME_PATH } from "@/src/lib/routes";
import GameLayout from "./GameLayout";
import { formatTime } from "@/src/lib/utils";
import { GameSessionState } from "@/src/store/useGameSessionStore";
import { Icons } from "../../ui/icons";

type Props = {
  gameSession: GameSessionState;
  onRetry: () => void;
  isSaving: boolean;
};
const GameFinished = ({ gameSession, onRetry, isSaving }: Props) => {
  const { gameInfo } = gameSession;
  return (
    <GameLayout>
      <div className="flex flex-1 flex-col justify-around">
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <Heading className="text-5xl">Game Over</Heading>
          <h2 className=" text-xl">Score: {gameInfo.score}</h2>
          <h2 className=" text-xl">Correct: {gameInfo.correct}</h2>
          <h2 className=" text-xl">Wrong: {gameInfo.wrong}</h2>
          <h2 className=" text-xl">Highest Combo: {gameInfo.highestCombo}</h2>
          <h2 className=" text-xl">Total Combo: {gameInfo.totalCombo}</h2>
          <h2 className=" text-xl">Total Answered: {gameInfo.totalAnswered}</h2>
          <h2 className=" text-xl">
            Game Time: {formatTime(gameInfo.gameTime).formattedTime}
          </h2>
        </div>

        {isSaving ? (
          <div className="flex justify-center">
            <Icons.spinner className="size-10 animate-spin" />
          </div>
        ) : (
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
        )}
      </div>
    </GameLayout>
  );
};

export default GameFinished;
