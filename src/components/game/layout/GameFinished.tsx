import Heading from "../../ui/heading";
import { Button } from "../../ui/button";
import {
  IconHome,
  IconReload,
  IconSquareCheckFilled,
  IconSquareXFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { DEFAULT_HOME_PATH } from "@/src/lib/routes";
import GameLayout from "./GameLayout";
import { cn, formatTime } from "@/src/lib/utils";
import { GameSessionState } from "@/src/store/useGameSessionStore";
import { Icons } from "../../ui/icons";
import Text from "../../ui/text";
import { formatNumber } from "@/src/lib/game";
import { RATING_CSS } from "@/src/lib/game.config";

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
        <Heading order="5xl" className="text-center">
          Game Over
        </Heading>

        <div className="flex w-full flex-col items-center justify-center gap-8">
          <Heading
            order="3xl"
            className="text-center font-extrabold text-primary"
          >
            {formatNumber(gameInfo.score)}
          </Heading>
          <div className="flex w-full items-center justify-center gap-8">
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <div className="flex flex-col items-center justify-center">
                <Text className="text-xl font-bold">
                  {formatTime(gameInfo.gameTime).formattedTime}
                </Text>
                <Text className="text-sm">Game Time</Text>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Text className="text-xl font-bold">
                  {gameInfo.highestCombo}
                </Text>
                <Text className="text-sm">Highest Combo</Text>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Text className="text-xl font-bold">
                  {gameInfo.totalAnswered}
                </Text>
                <Text className="text-sm">Total Answered</Text>
              </div>
            </div>

            <div className="flex h-full flex-col items-center justify-center gap-4">
              {gameInfo.rating.includes("S") ? (
                <p className="relative flex">
                  <span className="absolute inline-flex  text-7xl font-extrabold text-yellow-200">
                    {gameInfo.rating}
                  </span>
                  <span className="relative inline-flex animate-pulse text-7xl font-extrabold text-amber-400">
                    {gameInfo.rating}
                  </span>
                </p>
              ) : (
                <p
                  className={cn(
                    "text-6xl font-extrabold",
                    RATING_CSS[gameInfo.rating]
                  )}
                >
                  {gameInfo.rating}
                </p>
              )}

              <div className="flex w-full items-center justify-center gap-1">
                <Text className="text-xl font-bold">Lv.{gameInfo.level}</Text>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center justify-center gap-1">
                  <IconSquareCheckFilled size={24} className="text-green-600" />
                  <Text className="text-xl font-bold">{gameInfo.correct}</Text>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <IconSquareXFilled size={24} className="text-red-600" />
                  <Text className="text-xl font-bold">{gameInfo.wrong}</Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isSaving ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <Icons.spinner className="size-10 animate-spin" />
            <Text>Saving </Text>
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
