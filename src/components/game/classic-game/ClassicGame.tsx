"use client";

import GameLayout from "../layout/GameLayout";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { GameInfo, GameStatus, Problem } from "@/src/lib/types";
import GameView from "../layout/GameView";
import GameChoices from "../layout/GameChoices";
import GameHeader from "../layout/GameHeader";
import GameTimer from "../layout/GameTimer";
import useGameTimer from "@/src/hooks/use-game-timer";
import { useFocusTrap, useFullscreen } from "@mantine/hooks";
import ClassicStartScreen from "./ClassicStartScreen";
import GameStartingCountdown from "../layout/GameStartingCountdown";
import { formatTime } from "@/src/lib/utils";
import GameFinished from "../layout/GameFinished";
import { game, generateProblem, INITIAL_GAME_INFO } from "@/src/lib/game";
import Text from "../../ui/text";

type Props = {};

const ClassicGame = ({}: Props) => {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [problemList, setProblemList] = useState<Problem[] | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const { toggle: toggleFullscreen, fullscreen: isFullscreen } =
    useFullscreen();

  const second = 1000;
  const minute = 60;
  const initialTime = 2 * minute * second;
  const [level, setLevel] = useState<number>(1);
  const [combo, setCombo] = useState<number>(0);
  const [gameInfo, setGameInfo] = useState<GameInfo>(INITIAL_GAME_INFO);

  const {
    timer,
    start,
    pause,
    reset,
    add: addTimer,
    reduce: reduceTimer,
    lap,
    history,
    resume,
  } = useGameTimer(initialTime);

  const {
    timer: initialCountDown,
    start: initialStart,
    reset: initialReset,
  } = useGameTimer(4 * second);

  const handleGameStart = () => {
    initialStart();
    setStatus("starting");
    setProblem(generateProblem(game));
    toggleFullscreen();
  };

  const handleAnswer = (answer: number) => {
    if (!problem) return;
    if (problem.status !== "unanswered") return;
    lap();

    const isCorrect = answer === problem.answer;
    setGameInfo((info) => ({
      correct: isCorrect ? info.correct + 1 : info.correct,
      incorrect: !isCorrect ? info.incorrect + 1 : info.incorrect,
      highestCombo: combo > info.highestCombo ? combo : info.highestCombo,
      totalCombo: combo > 0 ? info.totalCombo + 1 : info.totalCombo,
      totalQuestion: info.totalQuestion + 1,
      score: isCorrect ? info.score + 1 + combo : info.score,
      duration: timer.totalAddedTime + timer.initialValue,
    }));

    if (isCorrect) {
      addTimer(7000);
      setCombo((combo) => combo + 1);
    } else {
      reduceTimer(5000);
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
    }, 1500);
  };

  const handleRetry = () => {
    setProblemList(null);
    setGameInfo(INITIAL_GAME_INFO);
    setLevel(1);
    initialReset();
    reset();
    setStatus("idle");
  };

  useEffect(() => {
    if (timer.value === 0) {
      setStatus("finished");
      setProblem(null);
      if (isFullscreen) toggleFullscreen();
    }
  }, [timer]);

  useEffect(() => {
    if (formatTime(initialCountDown.value).seconds === 0) {
      setStatus("running");
      start();
    }
  }, [initialCountDown]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (status === "running") {
        event.preventDefault();
        event.returnValue =
          "Are you sure you want to leave? Your game progress will be lost.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [status]);

  return (
    <GameLayout>
      {status === "starting" && (
        <GameStartingCountdown countdownTimer={initialCountDown.value} />
      )}
      {status === "finished" && (
        <GameFinished onRetry={handleRetry} gameInfo={gameInfo} />
      )}
      {status === "idle" && <ClassicStartScreen />}
      {status === "running" && (
        <GameHeader>
          <GameTimer status={problem?.status || "unanswered"} timer={timer} />
          <div className="flex justify-between">
            <div>
              <Text className="mt-2">
                <span className="text-gray-500 dark:text-gray-400">
                  Level:{" "}
                </span>
                <span className="text-2xl font-bold">{level}</span>
              </Text>
              {combo > 1 && (
                <Text className="mt-2 text-2xl font-extrabold">
                  Combo {combo}x
                </Text>
              )}
            </div>
            <div>
              <Text className="mt-2">
                <span className="text-gray-500 dark:text-gray-400">
                  Score:{" "}
                </span>
                <span className="text-2xl font-bold">{gameInfo.score}</span>
              </Text>

              {/* <Button onClick={toggleFullscreen}>
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </Button> */}
            </div>
          </div>
        </GameHeader>
      )}

      {status === "running" && (
        <div className="flex h-full flex-1 flex-col justify-between gap-4">
          {problem && <GameView problem={problem} />}
          {problem && (
            <GameChoices
              problemId={problem.id}
              onAnswer={handleAnswer}
              choices={problem?.choices || []}
              disabled={problem?.status !== "unanswered"}
            />
          )}
        </div>
      )}

      {status === "idle" && (
        <Button className="flex-none" onClick={handleGameStart}>
          Start
        </Button>
      )}
    </GameLayout>
  );
};

export default ClassicGame;
