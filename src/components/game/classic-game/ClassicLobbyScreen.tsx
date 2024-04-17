"use client";

import { Button } from "../../ui/button";
import Heading from "../../ui/heading";
import GameLayout from "../layout/GameLayout";
import { GameMode } from "@/src/lib/types";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import useGameSessionStore from "@/src/store/useGameSessionStore";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import { startCase, toLower } from "lodash";
import { IconCheckbox } from "@tabler/icons-react";
import { Icons } from "../../ui/icons";
import Text from "../../ui/text";
import { getRating } from "@/src/lib/game";

type Props = {
  initialGameMode: GameMode;
  onGameStart: () => void;
};
const ClassicLobbyScreen = ({ initialGameMode, onGameStart }: Props) => {
  const { gameSession, setGameSession } = useStore(
    useGameSessionStore,
    (state) => state
  );

  const initialGameOperationList = initialGameMode.gameOperations.map(
    (operation) => operation.id
  );
  const [gameOperationList, setGameOperationList] = useState(
    initialGameOperationList
  );

  useEffect(() => {
    if (!gameSession.gameMode) {
      setGameSession({
        ...gameSession,
        initialGameMode: initialGameMode,
        gameMode: initialGameMode,
      });
    }
  }, []);

  const gameMode = gameSession.gameMode;

  if (!gameMode) return null;

  const handleStart = () => {
    setGameSession({
      ...gameSession,
      gameMode: {
        ...gameMode,
        gameOperations: gameMode.gameOperations.filter((operation) =>
          gameOperationList.includes(operation.id)
        ),
      },
    });
    onGameStart();
  };

  return (
    <GameLayout>
      <div className="space-y-5">
        <Heading order="6xl" className="text-center">
          {gameMode?.title}
        </Heading>
        <p className="text-center text-2xl">{gameMode?.description}</p>
      </div>

      <ToggleGroup
        size="lg"
        variant="outline"
        type="multiple"
        value={gameOperationList}
        onValueChange={(value) => {
          if (value.length === 0) return;
          setGameOperationList(value);
        }}
        className="flex flex-col flex-wrap justify-center gap-2"
      >
        {initialGameMode.gameOperations.map((operation) => (
          <ToggleGroupItem
            value={operation.id}
            key={operation.id}
            className="flex min-w-full justify-between gap-4 sm:min-w-fit"
          >
            {gameOperationList.includes(operation.id) ? (
              <Icons.squareCheck className="size-7 flex-none" />
            ) : (
              <Icons.square className="size-7 flex-none" />
            )}

            <Text className="flex-auto text-2xl">
              {startCase(toLower(operation.operation))}
            </Text>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Button className="flex-none" onClick={handleStart}>
        Start
      </Button>
    </GameLayout>
  );
};

export default ClassicLobbyScreen;
