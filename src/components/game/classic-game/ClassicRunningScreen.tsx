import { IconPlayerPauseFilled } from "@tabler/icons-react";
import { Button } from "../../ui/button";
import Text from "../../ui/text";
import GameHeader from "../layout/GameHeader";
import GameLayout from "../layout/GameLayout";
import GameTimer from "../layout/GameTimer";
import { formatNumber } from "@/src/lib/game";
import GameView from "../layout/GameView";
import GameChoices from "../layout/GameChoices";
import { GameInfo, Problem } from "@/src/lib/types";
import { GameTimerState } from "@/src/hooks/use-game-timer";

type Props = {
  gameInfo: GameInfo;
  timer: GameTimerState;
  level: number;
  combo: number;
  problem: Problem;
  onPause: () => void;
  onAnswer: (answer: number) => void;
};

const ClassicRunningScreen = ({
  gameInfo,
  problem,
  timer,
  combo,
  level,
  onAnswer,
  onPause,
}: Props) => {
  return (
    <GameLayout>
      <GameHeader>
        <GameTimer status={problem.status} timer={timer} />
        <div className="mt-4 flex justify-between">
          <div>
            <Text>
              <span className="text-gray-500 dark:text-gray-400">Level: </span>
              <span className="text-2xl font-bold">{level}</span>
            </Text>
            {combo > 1 && (
              <Text className="text-2xl font-extrabold">Combo {combo}x</Text>
            )}
          </div>

          <div>
            <Button size="icon" onClick={onPause}>
              <IconPlayerPauseFilled size={20} />
            </Button>
          </div>

          <div>
            <Text>
              <span className="text-gray-500 dark:text-gray-400">Score: </span>
              <span className="text-2xl font-bold">
                {formatNumber(gameInfo.score)}
              </span>
            </Text>
          </div>
        </div>
      </GameHeader>

      <div className="flex h-full flex-1 flex-col justify-between gap-4">
        <GameView problem={problem} />

        <GameChoices
          problemId={problem.id}
          onAnswer={onAnswer}
          choices={problem?.choices || []}
          disabled={problem?.status !== "UNANSWERED"}
        />
      </div>
    </GameLayout>
  );
};

export default ClassicRunningScreen;
