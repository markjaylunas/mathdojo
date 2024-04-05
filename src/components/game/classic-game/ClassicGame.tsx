"use client";

import GameLayout from "../layout/GameLayout";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Game, Problem, Score } from "@/src/lib/types";
import GameView from "../layout/GameView";
import { v4 as uuidV4 } from "uuid";
import GameScore from "../layout/GameHeader";
import GameChoices from "../layout/GameChoices";
import GameHeader from "../layout/GameHeader";
import { CardContent, CardFooter, CardHeader } from "../../ui/card";

const game: Game = {
  id: "1",
  title: "Add two numbers",
  description: "Add two numbers together",
  difficulty: "easy",
  digit_range: [
    {
      id: "1",
      digit: 4,
      order: 1,
      minRange: 1111,
      maxRange: 91111,
      game_id: 1,
    },
    {
      id: "2",
      digit: 6,
      order: 2,
      minRange: 11111,
      maxRange: 991111,
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
  const wrongChoices = Array.from({ length: 3 }, () =>
    Math.floor(
      Math.random() * (answer + 10 - (answer - 10) + 1) + (answer - 10)
    )
  );
  const choices = [answer, ...wrongChoices].sort(() => Math.random() - 0.5);
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

type Props = {};

const ClassicGame = ({}: Props) => {
  const [problemList, setProblemList] = useState<Problem[] | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [score, setScore] = useState<Score>({
    correct: 0,
    incorrect: 0,
  });

  // const handleAnswer = (answer: number) => {
  //   if (answer === problem.answer) {
  //     setProblem({ ...problem, status: "correct" });
  //   } else {
  //     setProblem({ ...problem, status: "incorrect" });
  //   }
  // };

  const handleNext = () => {
    setProblem(generateProblem(game));
  };

  const handleGameStart = () => {
    setProblem(generateProblem(game));
  };

  return (
    <GameLayout>
      <GameHeader showScore={Boolean(problem)} score={score} />
      {problem && (
        <div className="flex h-full flex-1 flex-col justify-between gap-4">
          {problem && <GameView problem={problem} />}
          <GameChoices choices={problem?.choices || []} />
        </div>
      )}

      {!problemList && !problem && (
        <Button className="flex-none" onClick={handleGameStart}>
          Start
        </Button>
      )}
    </GameLayout>
  );
};

export default ClassicGame;
