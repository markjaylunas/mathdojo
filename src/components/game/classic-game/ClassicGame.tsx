"use client";

import { actionCreateGame } from "@/src/actions/game";
import { DEFAULT_HOME_PATH } from "@/src/lib/routes";
import { GameMode, PlayerInfo } from "@/src/lib/types";
import useGameSessionStore, {
  GameTimerStatus,
} from "@/src/store/useGameSessionStore";
import useUserStore from "@/src/store/useUserStore";
import { useFullscreen } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { toast } from "../../ui/use-toast";
import GameFinished from "../layout/GameFinished";
import GameStartingCountdown from "../layout/GameStartingCountdown";
import ClassicLobbyScreen from "./ClassicLobbyScreen";
import ClassicPausedScreen from "./ClassicPausedScreen";
import ClassicRunningScreen from "./ClassicRunningScreen";

type Props = {
  gameMode: GameMode;
  playerInfo: PlayerInfo;
};

const ClassicGame = ({ gameMode: initialGameMode, playerInfo }: Props) => {
  const user = useStore(useUserStore, (state) => state.user);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const {
    gameSession,
    setStatus,
    setTimerValue,
    gameStart,
    gamePause,
    gameContinue,
    gameFinish,
    gameAnswer,
    gameReset,
    setGameSession,
    setRevealAnswer,
    revealAnswer,
  } = useStore(useGameSessionStore, (state) => state);

  const { timer, problem } = gameSession;

  const { status } = timer;

  const { toggle: toggleFullscreen, fullscreen: isFullscreen } =
    useFullscreen();

  const handleCountDownGameStart = () => {
    setStatus("STARTING");
    if (!isFullscreen) toggleFullscreen();
  };

  const handleGameStart = () => {
    gameStart();
    if (!isFullscreen) toggleFullscreen();
  };

  const handleAnswer = (answer: number) => {
    const { isCorrect, isLeveledUp } = gameAnswer(answer);

    const gameCorrectAudio = new Audio("/audio/game-correct.wav");
    const gameWrongAudio = new Audio("/audio/game-wrong.wav");
    const gameLeveledUpAudio = new Audio("/audio/game-level.wav");

    if (isCorrect) {
      if (isLeveledUp) {
        gameLeveledUpAudio.play();
      } else {
        gameCorrectAudio.play();
      }
    } else {
      gameWrongAudio.play();
    }
  };

  const handleReset = () => {
    gameReset();
  };

  const handleFinish = () => {
    gameFinish();
    const gameEndAudio = new Audio("/audio/game-end.wav");
    gameEndAudio.play();
    if (isFullscreen) toggleFullscreen();
  };

  const handlePause = () => {
    gamePause();
  };

  const handleCountdownResume = () => {
    setStatus("CONTINUING");
    if (!isFullscreen) toggleFullscreen();
  };

  const handleResume = () => {
    gameContinue();
    if (!isFullscreen) toggleFullscreen();
  };

  const handleHome = () => {
    handleReset();
    if (isFullscreen) toggleFullscreen();
    router.push(DEFAULT_HOME_PATH);
  };

  const handleCreateGame = async () => {
    try {
      setIsSaving(true);
      const { gameInfo } = gameSession;
      const { status, message, data } = await actionCreateGame({
        gameParams: {
          ...gameInfo,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
        userId: `${user?.id}`,
      });

      const isError = status === "error";
      if (isError) throw new Error(message);

      if (data) {
        setGameSession({
          ...gameSession,
          gameCreatedAt: data.createdAt,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (status === "RUNNING") {
        event.returnValue =
          "Are you sure you want to leave? Your game progress will be lost.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [status]);

  useEffect(() => {
    if (
      gameSession.gameCreatedAt === null &&
      gameSession.gameInfo.gameTime !== 0 &&
      gameSession.timer.status === "FINISHED"
    ) {
      handleCreateGame();
    }
  }, [gameSession]);

  const getGameScreen = (status: GameTimerStatus) => {
    switch (status) {
      case "IDLE":
        return (
          <ClassicLobbyScreen
            onGameStart={handleCountDownGameStart}
            initialGameMode={initialGameMode}
            playerInfo={playerInfo}
          />
        );
      case "STARTING":
        return (
          <GameStartingCountdown
            action="Starting"
            onComplete={handleGameStart}
          />
        );
      case "RUNNING":
        if (!problem) return null;
        return (
          <ClassicRunningScreen
            gameSession={gameSession}
            onAnswer={handleAnswer}
            onPause={handlePause}
            setTimerValue={setTimerValue}
            gameFinish={handleFinish}
            playerInfo={playerInfo}
            dev={() => setRevealAnswer(!revealAnswer)}
          />
        );
      case "PAUSED":
        return (
          <ClassicPausedScreen
            onResume={handleCountdownResume}
            onRestart={handleReset}
            onHome={handleHome}
          />
        );
      case "CONTINUING":
        return (
          <GameStartingCountdown
            action="Continuing"
            onComplete={handleResume}
          />
        );

      case "FINISHED":
        return (
          <GameFinished
            gameSession={gameSession}
            onRetry={handleReset}
            isSaving={isSaving}
          />
        );
      default:
        return (
          <ClassicLobbyScreen
            onGameStart={handleGameStart}
            initialGameMode={initialGameMode}
            playerInfo={playerInfo}
          />
        );
    }
  };

  return getGameScreen(status);
};

export default ClassicGame;
