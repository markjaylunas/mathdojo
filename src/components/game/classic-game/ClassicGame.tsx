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
import { set } from "lodash";
import GameTimer from "../layout/GameTimer";
import useGameTimer from "@/src/hooks/use-game-timer";

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

  const {
    state: { milliseconds },
    start,
    pause,
    reset,
    add,
    lap,
    history,
    resume,
  } = useGameTimer(60 * 1000);

  const handleGameStart = () => {
    setProblem(generateProblem(game));
  };

  const handleAnswer = (answer: number) => {
    if (!problem) return;
    const isCorrect = answer === problem.answer;
    if (isCorrect) {
      setScore({ ...score, correct: score.correct + 1 });
    } else {
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

  return (
    <GameLayout>
      <GameHeader showScore={Boolean(problem)} score={score}>
        <GameTimer milliseconds={milliseconds} history={history} />
        <div className="space-x-1">
          <button onClick={start}>Start</button>
          <button onClick={resume}>Continue</button>
          <button onClick={pause}>Pause</button>
          <button onClick={reset}>Reset</button>
          <button onClick={lap}>Lap</button>
          <button onClick={() => add(10000)}>Add</button>
        </div>
      </GameHeader>

      {problem && (
        <div className="flex h-full flex-1 flex-col justify-between gap-4">
          {problem && <GameView problem={problem} />}
          <GameChoices
            onAnswer={handleAnswer}
            choices={problem?.choices || []}
          />
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
