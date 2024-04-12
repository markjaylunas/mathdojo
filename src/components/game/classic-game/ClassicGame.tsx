"use client";

import { useEffect } from "react";
import { GameStatus, Problem } from "@/src/lib/types";
import { useFullscreen } from "@mantine/hooks";
import GameStartingCountdown from "../layout/GameStartingCountdown";
import { formatTime } from "@/src/lib/utils";
import GameFinished from "../layout/GameFinished";
import { game, generateProblem } from "@/src/lib/game";
import {
  CLASSIC_ANSWER_DELAY_TIME,
  CLASSIC_CORRECT_ADD_TIME,
  CLASSIC_INCORRECT_REDUCE_TIME,
  CLASSIC_LEVEL_UP_THRESHOLD,
  CLASSIC_TIME,
  GAME_START_TIME,
} from "@/src/lib/game.config";
import ClassicLobbyScreen from "./ClassicLobbyScreen";
import ClassicRunningScreen from "./ClassicRunningScreen";
import ClassicPausedScreen from "./ClassicPausedScreen";
import useGameTimer from "@/src/hooks/use-game-timer";
import { useRouter } from "next/navigation";
import { DEFAULT_HOME_PATH } from "@/src/lib/routes";
import { useStore } from "zustand";
import useGameSessionStore from "@/src/store/useGameSessionStore";
import { chain } from "mathjs";

type Props = {};

const ClassicGame = ({}: Props) => {
  const router = useRouter();
  const { gameSession, setGameSession, resetGameSession } = useStore(
    useGameSessionStore,
    (state) => state
  );

  const { status, problemList, problem, level, combo, gameInfo } = gameSession;

  const { toggle: toggleFullscreen, fullscreen: isFullscreen } =
    useFullscreen();

  const {
    timer,
    start: timerStart,
    pause: timerPause,
    reset: timerReset,
    add: addTimer,
    reduce: reduceTimer,
    lap: timerLap,
    resume: timerResume,
  } = useGameTimer(CLASSIC_TIME);

  const {
    timer: initialCountDown,
    start: initialStart,
    reset: initialReset,
  } = useGameTimer(GAME_START_TIME);

  const { timer: cooldownCountDown, start: cooldownStart } = useGameTimer(
    CLASSIC_ANSWER_DELAY_TIME
  );

  const handleGameStart = () => {
    if (status !== "STARTING") {
      initialStart();
      setGameSession({
        ...gameSession,
        status: "STARTING",
        problem: generateProblem({ game, level }),
      });
      toggleFullscreen();
    }
  };

  const handleAnswer = (answer: number) => {
    if (!problem) return;
    if (problem.status !== "UNANSWERED") return;

    const isCorrect = answer === problem.answer;

    if (isCorrect) {
      addTimer(CLASSIC_CORRECT_ADD_TIME);
    } else {
      reduceTimer(CLASSIC_INCORRECT_REDUCE_TIME);
    }

    const timerLapTime = timerLap();
    const isFirstProblem = problemList === null;
    const lapTime =
      timerLapTime &&
      (isFirstProblem
        ? timerLapTime
        : timerLapTime - CLASSIC_ANSWER_DELAY_TIME);

    const problemAnswered: Problem = {
      ...problem,
      userAnswer: answer,
      status: isCorrect ? "CORRECT" : "WRONG",
      lapTime: lapTime,
    };

    const newProblemList = [...(problemList || []), problemAnswered];

    const correctAnswerCount = newProblemList.filter(
      (problem) => problem.status === "CORRECT"
    ).length;

    const gameOperationCount = game.operationList.length;
    const combinedLevelUpThreshold = chain(gameOperationCount)
      .multiply(CLASSIC_LEVEL_UP_THRESHOLD)
      .done();

    const addedGameLevel = chain(correctAnswerCount)
      .divide(combinedLevelUpThreshold)
      .round()
      .add(1)
      .done();

    setGameSession({
      ...gameSession,
      problemList: newProblemList,
      problem: problemAnswered,
      combo: isCorrect ? combo + 1 : 0,
      level: addedGameLevel,
      gameInfo: {
        correct: isCorrect ? gameInfo.correct + 1 : gameInfo.correct,
        incorrect: !isCorrect ? gameInfo.incorrect + 1 : gameInfo.incorrect,
        highestCombo:
          combo > gameInfo.highestCombo ? combo : gameInfo.highestCombo,
        totalCombo: combo > 0 ? gameInfo.totalCombo + 1 : gameInfo.totalCombo,
        totalQuestion: gameInfo.totalQuestion + 1,
        score: isCorrect ? gameInfo.score + 1 + combo : gameInfo.score,
      },
      timer: timer,
    });

    cooldownStart();
  };

  const handleReset = () => {
    resetGameSession();
    initialReset();
    timerReset();
  };

  const handleFinish = () => {
    if (status !== "RUNNING") return;
    setGameSession({
      ...gameSession,
      status: "FINISHED",
      problem: null,
      timer: timer,
    });
    if (isFullscreen) toggleFullscreen();
  };

  const handleGameRun = () => {
    if (status === "RESUMING") {
      timerResume();
    } else if (status === "STARTING") {
      timerStart();
    }
    if (status !== "RUNNING")
      setGameSession({ ...gameSession, status: "RUNNING" });
  };

  const handlePause = () => {
    if (status !== "PAUSED") {
      timerPause();
      setGameSession({ ...gameSession, status: "PAUSED" });
    }
  };

  const handleResume = () => {
    if (status !== "PAUSED") return;
    initialStart();
    const newProblem = generateProblem({ game, level });
    setGameSession({ ...gameSession, status: "RESUMING", problem: newProblem });
    if (!isFullscreen) toggleFullscreen();
  };

  const handleHome = () => {
    handleReset();
    if (isFullscreen) toggleFullscreen();
    router.push(DEFAULT_HOME_PATH);
  };

  const handleCooldownFinish = () => {
    if (status === "RUNNING") {
      const newProblem = generateProblem({ game, level });
      setGameSession({ ...gameSession, problem: newProblem });
    }
  };

  useEffect(() => {
    if (timer.value === 0) {
      handleFinish();
    }
  }, [timer]);

  useEffect(() => {
    if (formatTime(initialCountDown.value).seconds === 0) {
      handleGameRun();
    }
  }, [initialCountDown]);

  useEffect(() => {
    if (cooldownCountDown.value === 0) {
      handleCooldownFinish();
    }
  }, [cooldownCountDown]);

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
    resetGameSession();
    setGameSession({ ...gameSession, gameSetting: game });
  }, []);

  const getGameScreen = (status: GameStatus) => {
    switch (status) {
      case "IDLE":
        return <ClassicLobbyScreen onGameStart={handleGameStart} />;
      case "STARTING":
        return (
          <GameStartingCountdown countdownTimer={initialCountDown.value} />
        );
      case "RUNNING":
        if (!problem) return null;
        return (
          <ClassicRunningScreen
            gameInfo={gameInfo}
            timer={timer}
            level={level}
            combo={combo}
            problem={problem}
            onAnswer={handleAnswer}
            onPause={handlePause}
          />
        );
      case "PAUSED":
        return (
          <ClassicPausedScreen
            onResume={handleResume}
            onRestart={handleReset}
            onHome={handleHome}
          />
        );
      case "RESUMING":
        return (
          <GameStartingCountdown countdownTimer={initialCountDown.value} />
        );
      case "FINISHED":
        return (
          <GameFinished
            gameInfo={gameInfo}
            gameTimer={timer}
            onRetry={handleReset}
          />
        );
      default:
        return <ClassicLobbyScreen onGameStart={handleGameStart} />;
    }
  };

  return getGameScreen(status);
};

export default ClassicGame;
