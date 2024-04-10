"use client";

import GameLayout from "../layout/GameLayout";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Game, GameStatus, Problem, Score } from "@/src/lib/types";
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
import { game, generateProblem } from "@/src/lib/game";

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
  const [score, setScore] = useState<Score>({
    correct: 0,
    incorrect: 0,
  });

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
    const isCorrect = answer === problem.answer;
    if (isCorrect) {
      addTimer(7000);
      setScore({ ...score, correct: score.correct + 1 });
    } else {
      reduceTimer(5000);
      setScore({ ...score, incorrect: score.incorrect + 1 });
    }

    const problemAnswered: Problem = {
      ...problem,
      userAnswer: answer,
      status: isCorrect ? "correct" : "incorrect",
    };
    setProblem(problemAnswered);

    setProblemList([...(problemList || []), problemAnswered]);

    setScore({
      ...score,
      correct: isCorrect ? score.correct + 1 : score.correct,
      incorrect: !isCorrect ? score.incorrect + 1 : score.incorrect,
    });

    setTimeout(() => {
      setProblem(generateProblem(game));
    }, 1500);
  };

  const handleRetry = () => {
    setProblemList(null);
    setScore({ correct: 0, incorrect: 0 });
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
        <GameFinished onRetry={handleRetry} score={score} />
      )}
      {status === "idle" && <ClassicStartScreen />}
      {status === "running" && (
        <GameHeader>
          <GameTimer status={problem?.status || "unanswered"} timer={timer} />
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
