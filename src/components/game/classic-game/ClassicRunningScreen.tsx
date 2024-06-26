import {
  IconPlayerPauseFilled,
  IconSquareCheckFilled,
  IconSquareXFilled,
} from "@tabler/icons-react";
import Text from "../../ui/text";
import GameHeader from "../layout/GameHeader";
import GameLayout from "../layout/GameLayout";
import GameTimer from "../layout/GameTimer";
import { formatNumber } from "@/src/lib/game";
import GameView from "../layout/GameView";
import GameChoices from "../layout/GameChoices";
import { GameSessionState } from "@/src/store/useGameSessionStore";
import { Icons } from "../../ui/icons";
import { PlayerInfo } from "@/src/lib/types";
import GameUserPerkList from "../layout/GameUserPerkList";

type Props = {
  gameSession: GameSessionState;
  onPause: () => void;
  onAnswer: (answer: number) => void;
  setTimerValue: (value: number) => void;
  gameFinish: () => void;
  playerInfo: PlayerInfo;
  dev: () => void;
};

const ClassicRunningScreen = ({
  gameSession,
  onAnswer,
  onPause,
  gameFinish,
  setTimerValue,
  playerInfo,
  dev,
}: Props) => {
  const { problem, timer, isCooldown, combo, gameInfo, activePerkList } =
    gameSession;

  if (!problem) return null;
  return (
    <GameLayout>
      <GameHeader>
        <div className="flex items-center justify-between gap-10">
          <Text className="text-xl font-bold">{`Lv.${gameInfo.level}`}</Text>

          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center gap-1">
              <IconSquareXFilled size={24} className="text-red-600" />
              <Text className="text-xl font-bold">{gameInfo.wrong}</Text>
            </div>
            <div className="flex items-center justify-center gap-1">
              <IconSquareCheckFilled
                size={24}
                className="text-green-600"
                onClick={dev}
              />
              <Text className="text-xl font-bold">{gameInfo.correct}</Text>
            </div>
          </div>

          <div>
            <IconPlayerPauseFilled size={26} onClick={onPause} />
            <span className="sr-only">Pause Game</span>
          </div>
        </div>

        <GameTimer
          status={problem.status}
          timer={timer}
          gameFinish={gameFinish}
          setTimerValue={setTimerValue}
        />

        <div className="flex items-center justify-between">
          <div className="flex justify-between">
            <div className="flex items-center justify-evenly gap-10">
              <div className="flex flex-col items-start justify-start">
                <div className="flex items-start justify-start gap-2">
                  <div className="flex items-center justify-center gap-1">
                    <Text className="text-gray-500 dark:text-gray-400">
                      Score:
                    </Text>
                    <Text className="text-xl font-bold">
                      {formatNumber(gameInfo.score)}
                    </Text>
                  </div>
                  {combo > 1 && (
                    <Text className="text-right text-xs font-extrabold">
                      Combo x{combo}
                    </Text>
                  )}
                </div>

                <div className="flex items-center justify-center gap-1">
                  <Icons.coin className="size-6" />
                  <Text className="text-xl font-bold">
                    {formatNumber(gameInfo.coin)}
                  </Text>
                  {!isCooldown && (
                    <Text className="text-xs font-bold transition-opacity duration-1000">
                      +{formatNumber(problem.coin)}
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="flex flex-row-reverse flex-wrap gap-2">
              {activePerkList.length > 0 &&
                activePerkList.map((perk) => {
                  const pointedPerk = playerInfo.userPerkList.find(
                    (userPerk) => userPerk.perk.type === perk
                  );
                  if (!pointedPerk) return;

                  return (
                    <div
                      className="flex size-8 items-center justify-center bg-secondary"
                      key={pointedPerk.id}
                    >
                      <p className="text-xl">{pointedPerk.perk.icon}</p>
                    </div>
                  );
                })}
            </div>
            <GameUserPerkList userPerkList={playerInfo.userPerkList} />
          </div>
        </div>
      </GameHeader>

      <div className="flex h-full flex-1 flex-col justify-between gap-4">
        <GameView problem={problem} activePerkList={activePerkList} />

        <GameChoices
          problem={problem}
          onAnswer={onAnswer}
          disabled={isCooldown}
        />
      </div>
    </GameLayout>
  );
};

export default ClassicRunningScreen;
