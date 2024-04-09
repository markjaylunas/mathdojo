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

type GameStatus = "start" | "running" | "paused" | "finished";

type Props = {};

const ClassicGame = ({}: Props) => {
  const [status, setStatus] = useState<GameStatus>("start");
  const [problemList, setProblemList] = useState<Problem[] | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const oneSecond = 1000;
  const initialTime = 60 * oneSecond;
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

  const handleGameStart = () => {
    start();
    setStatus("running");
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

  return (
    <GameLayout>
      {status === "start" && <ClassicStartScreen />}
      {status === "running" && (
        <GameHeader>
          <div className="flex  gap-2">
            <Text>Correct: {score.correct}</Text>
            <Text>Incorrect: {score.incorrect}</Text>
          </div>

          <GameTimer timer={timer} />
          {/* {history.length > 0 &&
          history.map((item, index) => {
            return (
              <div key={index}>
                <Text>
                  {item.action} - {item.time} - {item.lapDifference || 0} -{" "}
                  {item.added || 0} - {item.reduced || 0}
                </Text>
              </div>
            );
          })} */}
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

      {status === "start" && (
        <Button className="flex-none" onClick={handleGameStart}>
          Start
        </Button>
      )}
    </GameLayout>
  );
};

export default ClassicGame;
