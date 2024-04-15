"use client";

import { useEffect } from "react";
import { useFullscreen } from "@mantine/hooks";
import GameFinished from "../layout/GameFinished";
import ClassicLobbyScreen from "./ClassicLobbyScreen";
import ClassicRunningScreen from "./ClassicRunningScreen";
import ClassicPausedScreen from "./ClassicPausedScreen";
import { useRouter } from "next/navigation";
import { DEFAULT_HOME_PATH } from "@/src/lib/routes";
import { useStore } from "zustand";
import useGameSessionStore, {
  GameTimerStatus,
} from "@/src/store/useGameSessionStore";
import GameStartingCountdown from "../layout/GameStartingCountdown";
import { GameMode } from "@/src/lib/types";

type Props = {
  gameMode: GameMode;
};

const ClassicGame = ({ gameMode: initialGameMode }: Props) => {
  const router = useRouter();
  const {
    gameSession,
    setStatus,
    setTimerValue,
    gameStart,
    gamePause,
    gameContinue,
    gameAnswer,
    gameFinish,
    gameReset,
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
    gameAnswer(answer);
  };

  const handleReset = () => {
    gameReset();
  };

  const handleFinish = () => {
    gameFinish();
    console.log({ gameSession });
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

  const getGameScreen = (status: GameTimerStatus) => {
    switch (status) {
      case "IDLE":
        return (
          <ClassicLobbyScreen
            onGameStart={handleCountDownGameStart}
            initialGameMode={initialGameMode}
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
        return <GameFinished gameSession={gameSession} onRetry={handleReset} />;
      default:
        return (
          <ClassicLobbyScreen
            onGameStart={handleGameStart}
            initialGameMode={initialGameMode}
          />
        );
    }
  };

  return getGameScreen(status);
};

export default ClassicGame;
