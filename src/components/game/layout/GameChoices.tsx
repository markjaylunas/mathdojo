"use client";

import { Problem } from "@/src/lib/types";
import { Button } from "../../ui/button";
import { cn } from "@/src/lib/utils";
import { useStore } from "zustand";
import useGameSessionStore from "@/src/store/useGameSessionStore";
import { formatNumber } from "@/src/lib/game";

type Props = {
  problem: Problem;
  onAnswer: (answer: number) => void;
  disabled: boolean;
};
const GameChoices = ({ problem, onAnswer, disabled }: Props) => {
  const {
    revealAnswer,
    gameSession: { activePerkList },
  } = useStore(useGameSessionStore, (state) => state);
  const isLessChoices = activePerkList.includes("REMOVE_TWO_WRONG_ANSWER");
  const wrongAnswers = problem.choices
    .filter((choice) => choice !== problem.answer)
    .slice(0, 2);

  return (
    <div className="grid grid-flow-row auto-rows-fr  grid-cols-2 gap-5">
      {problem.choices.map((choice, index) => {
        const showAnswer = problem.status !== "UNANSWERED" || revealAnswer;
        const isAnswer = problem.answer === choice;
        const choiceLength = choice.toString().length;
        return (
          <Button
            size="icon"
            className={cn(
              "size-full min-h-20 text-4xl font-bold transition-all duration-150  ease-in-out active:scale-105",
              {
                "bg-green-500": showAnswer && isAnswer,
              }
            )}
            onClick={() => onAnswer(choice)}
            disabled={
              disabled || (isLessChoices && wrongAnswers.includes(choice))
            }
            key={problem.id + index}
          >
            <p
              className={cn(
                choiceLength > 6
                  ? "text-lg"
                  : choiceLength > 4
                    ? "text-2xl"
                    : ""
              )}
            >
              {formatNumber(choice)}
            </p>
          </Button>
        );
      })}
    </div>
  );
};

export default GameChoices;
