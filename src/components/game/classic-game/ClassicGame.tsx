"use client";

import { useEffect, useState } from "react";
import { GameInfo, GameStatus, Problem } from "@/src/lib/types";
import { useFullscreen } from "@mantine/hooks";
import GameStartingCountdown from "../layout/GameStartingCountdown";
import { formatTime } from "@/src/lib/utils";
import GameFinished from "../layout/GameFinished";
import { game, generateProblem } from "@/src/lib/game";
import {
  CLASSIC_ANSWER_DELAY_TIME,
  CLASSIC_CORRECT_ADD_TIME,
  CLASSIC_INCORRECT_REDUCE_TIME,
  CLASSIC_TIME,
  GAME_START_TIME,
  INITIAL_CLASSIC_GAME_INFO,
} from "@/src/lib/game.config";
import ClassicLobbyScreen from "./ClassicLobbyScreen";
import ClassicRunningScreen from "./ClassicRunningScreen";
import ClassicPausedScreen from "./ClassicPausedScreen";
import useGameTimer from "@/src/hooks/use-game-timer";

type Props = {};

const ClassicGame = ({}: Props) => {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [problemList, setProblemList] = useState<Problem[] | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const { toggle: toggleFullscreen, fullscreen: isFullscreen } =
    useFullscreen();

  const [level, setLevel] = useState<number>(1);
  const [combo, setCombo] = useState<number>(0);
  const [gameInfo, setGameInfo] = useState<GameInfo>(INITIAL_CLASSIC_GAME_INFO);

  const {
    timer,
    start: timerStart,
    pause: timerPause,
    reset: timerReset,
    add: addTimer,
    reduce: reduceTimer,
    lap: timerLap,
    history,
    resume: timerResume,
  } = useGameTimer(CLASSIC_TIME);

  const {
    timer: initialCountDown,
    start: initialStart,
    reset: initialReset,
  } = useGameTimer(GAME_START_TIME);

  const handleGameStart = () => {
    initialStart();
    setStatus("starting");
    setProblem(generateProblem(game));
    toggleFullscreen();
  };

  const handleAnswer = (answer: number) => {
    if (!problem) return;
    if (problem.status !== "unanswered") return;

    timerLap();

    const isCorrect = answer === problem.answer;
    setGameInfo((info) => ({
      ...info,
      correct: isCorrect ? info.correct + 1 : info.correct,
      incorrect: !isCorrect ? info.incorrect + 1 : info.incorrect,
      highestCombo: combo > info.highestCombo ? combo : info.highestCombo,
      totalCombo: combo > 0 ? info.totalCombo + 1 : info.totalCombo,
      totalQuestion: info.totalQuestion + 1,
      score: isCorrect ? info.score + 1 + combo : info.score,
      // todo: add total duration
      // duration: timer.totalAddedTime + timer.initialValue,
    }));

    if (isCorrect) {
      addTimer(CLASSIC_CORRECT_ADD_TIME);
      setCombo((combo) => combo + 1);
    } else {
      reduceTimer(CLASSIC_INCORRECT_REDUCE_TIME);
      setCombo(0);
    }

    const problemAnswered: Problem = {
      ...problem,
      userAnswer: answer,
      status: isCorrect ? "correct" : "incorrect",
    };

    setProblem(problemAnswered);
    const newProblemList = [...(problemList || []), problemAnswered];
    setProblemList(newProblemList);

    setTimeout(() => {
      setProblem(generateProblem(game));
    }, CLASSIC_ANSWER_DELAY_TIME);
  };

  const handleRetry = () => {
    setProblemList(null);
    setGameInfo(INITIAL_CLASSIC_GAME_INFO);
    setLevel(1);
    initialReset();
    timerReset();
    setStatus("idle");
  };

  const handleFinish = () => {
    setStatus("finished");
    setProblem(null);
    if (isFullscreen) toggleFullscreen();
  };

  const handleGameRun = () => {
    setStatus("running");
    timerStart();
  };

  const handlePause = () => {
    if (status !== "running") return;
    timerPause();
    setStatus("paused");
    if (isFullscreen) toggleFullscreen();
  };

  const handleResume = () => {
    if (status !== "paused") return;
    timerResume();
    setStatus("running");
    if (!isFullscreen) toggleFullscreen();
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
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (status === "running") {
        event.returnValue =
          "Are you sure you want to leave? Your game progress will be lost.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [status]);

  const getGameScreen = (status: GameStatus) => {
    switch (status) {
      case "idle":
        return <ClassicLobbyScreen onGameStart={handleGameStart} />;
      case "starting":
        return (
          <GameStartingCountdown countdownTimer={initialCountDown.value} />
        );
      case "running":
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
      case "paused":
        return <ClassicPausedScreen />;
      case "finished":
        return <GameFinished gameInfo={gameInfo} onRetry={handleRetry} />;
      default:
        return <ClassicLobbyScreen onGameStart={handleGameStart} />;
    }
  };

  return getGameScreen(status);
};

export default ClassicGame;
