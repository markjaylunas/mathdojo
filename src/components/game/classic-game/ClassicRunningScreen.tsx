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
import { GameSessionState, TimerState } from "@/src/store/useGameSessionStore";
import GameDetails from "../layout/GameDetails";

type Props = {
  gameSession: GameSessionState;
  onPause: () => void;
  onAnswer: (answer: number) => void;
  setTimerValue: (value: number) => void;
  gameFinish: () => void;
};

const ClassicRunningScreen = ({
  gameSession,
  onAnswer,
  onPause,
  gameFinish,
  setTimerValue,
}: Props) => {
  const { problem, timer, isCooldown } = gameSession;

  if (!problem) return null;
  return (
    <GameLayout>
      <GameHeader>
        <GameTimer
          status={problem.status}
          timer={timer}
          gameFinish={gameFinish}
          setTimerValue={setTimerValue}
        />

        <GameDetails gameSession={gameSession} onPause={onPause} />
      </GameHeader>

      <div className="flex h-full flex-1 flex-col justify-between gap-4">
        <GameView problem={problem} />

        <GameChoices
          problemId={problem.id}
          onAnswer={onAnswer}
          choices={problem?.choices || []}
          disabled={isCooldown}
        />
      </div>
    </GameLayout>
  );
};

export default ClassicRunningScreen;
