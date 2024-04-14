import { IconPlayerPauseFilled } from "@tabler/icons-react";
import { Button } from "../../ui/button";
import Text from "../../ui/text";
import { formatNumber } from "@/src/lib/game";
import { GameInfo } from "@/src/lib/types";
import { GameSessionState } from "@/src/store/useGameSessionStore";

type Props = {
  gameSession: GameSessionState;
  onPause: () => void;
};
const GameDetails = ({ gameSession, onPause }: Props) => {
  const { level, gameInfo, combo } = gameSession;
  return (
    <div className="mt-2 space-y-2">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <Text>
            <span className="text-gray-500 dark:text-gray-400">Level: </span>
            <span className="text-2xl font-bold">{level}</span>
          </Text>

          <Text>
            <span className="text-gray-500 dark:text-gray-400">Score: </span>
            <span className="text-2xl font-bold">
              {formatNumber(gameInfo.score)}
            </span>
          </Text>
        </div>
        <Button size="icon" className="scale-90" onClick={onPause}>
          <IconPlayerPauseFilled size={20} />
        </Button>
      </div>
      {combo > 1 && (
        <Text className="text-right text-2xl font-extrabold">
          Combo {combo}x
        </Text>
      )}
    </div>
  );
};

export default GameDetails;
