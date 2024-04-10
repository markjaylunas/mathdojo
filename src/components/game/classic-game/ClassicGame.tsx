"use client";

import GameLayout from "../layout/GameLayout";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Game, Problem, Score } from "@/src/lib/types";
import GameView from "../layout/GameView";
import { v4 as uuidV4 } from "uuid";
import GameChoices from "../layout/GameChoices";
import GameHeader from "../layout/GameHeader";
import GameTimer from "../layout/GameTimer";
import useGameTimer from "@/src/hooks/use-game-timer";
import Text from "../../ui/text";
import ClassicStartScreen from "./ClassicStartScreen";
import GameStartingCountdown from "../layout/GameStartingCountdown";
import { formatTime } from "@/src/lib/utils";

const game: Game = {
  id: "1",
  title: "Add two numbers",
  description: "Add two numbers together",
  difficulty: "easy",
  digit_range: [
    {
      id: "1",
      digit: 2,
      order: 1,
      minRange: 11,
      maxRange: 99,
      game_id: 1,
    },
    {
      id: "2",
      digit: 1,
      order: 2,
      minRange: 1,
      maxRange: 9,
      game_id: 1,
    },
  ],
  operation: "ADDITION",
  operationSymbol: "+",
};

const generateProblem = (game: Game): Problem => {
  const { digit_range, operation, operationSymbol, id: game_id } = game;
  const sortedDigitRange = digit_range.sort((a, b) => a.order - b.order);

  const numberList = sortedDigitRange.map((digitRange) => {
    const { minRange, maxRange } = digitRange;
    return Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);
  });

  let answer: number;
  switch (operation) {
    case "ADDITION":
      answer = numberList.reduce((acc, num) => acc + num, 0);
      break;
    case "SUBTRACTION":
      answer = numberList.reduce((acc, num) => acc - num, 0);
      break;
    case "MULTIPLICATION":
      answer = numberList.reduce((acc, num) => acc * num, 1);
      break;
    case "DIVISION":
      answer = numberList.reduce((acc, num) => acc / num, 1);
    default:
      throw new Error(`Invalid operation: ${operation}`);
  }

  const generateChoices = (answer: number) => {
    const choices = new Set<number>();

    choices.add(answer);
    while (choices.size !== 4) {
      const choice = Math.floor(
        Math.random() * (answer + 10 - (answer - 10) + 1) + (answer - 10)
      );
      choices.add(choice);
    }
    return Array.from(choices).sort(() => Math.random() - 0.5);
  };

  const choices = generateChoices(answer);
  const id = uuidV4();
  return {
    id,
    numberList,
    operation,
    operationSymbol,
    answer,
    userAnswer: null,
    choices,
    game_id: game_id,
    status: "unanswered",
  };
};

type GameStatus = "idle" | "starting" | "running" | "paused" | "finished";

type Props = {};

const ClassicGame = ({}: Props) => {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [problemList, setProblemList] = useState<Problem[] | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const oneSecond = 1000;
  const initialTime = 600 * oneSecond;
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
  } = useGameTimer(4 * oneSecond);

  const handleGameStart = () => {
    initialStart();
    setStatus("starting");
    setProblem(generateProblem(game));
  };

  const handleAnswer = (answer: number) => {
    if (!problem) return;
    const isCorrect = answer === problem.answer;
    lap();
    if (isCorrect) {
      addTimer(3000);
      setScore({ ...score, correct: score.correct + 1 });
    } else {
      reduceTimer(3000);
      setScore({ ...score, incorrect: score.incorrect + 1 });
    }

    const problemAnswered: Problem = {
      ...problem,
      userAnswer: answer,
      status: isCorrect ? "correct" : "incorrect",
    };

    setProblemList([...(problemList || []), problemAnswered]);

    setScore({
      ...score,
      correct: isCorrect ? score.correct + 1 : score.correct,
      incorrect: !isCorrect ? score.incorrect + 1 : score.incorrect,
    });

    setProblem(generateProblem(game));
  };

  useEffect(() => {
    if (timer.value === 0) {
      setStatus("finished");
      setProblem(null);
    }
  }, [timer]);

  useEffect(() => {
    if (formatTime(initialCountDown.value).seconds === 0) {
      setStatus("running");
      start();
    }
  }, [initialCountDown]);

  return (
    <GameLayout>
      {status === "starting" && (
        <GameStartingCountdown countdownTimer={initialCountDown.value} />
      )}
      {status === "idle" && <ClassicStartScreen />}
      {status === "running" && (
        <GameHeader>
          <GameTimer timer={timer} />
        </GameHeader>
      )}

      {status === "running" && (
        <div className="flex h-full flex-1 flex-col justify-between gap-4">
          {problem && <GameView problem={problem} />}
          <GameChoices
            onAnswer={handleAnswer}
            choices={problem?.choices || []}
          />
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
