"use client";

import { Problem } from "@/src/lib/types";
import { Button } from "../../ui/button";
import { cn } from "@/src/lib/utils";
import { useStore } from "zustand";
import useGameSessionStore from "@/src/store/useGameSessionStore";

type Props = {
  problem: Problem;
  onAnswer: (answer: number) => void;
  disabled: boolean;
};
const GameChoices = ({ problem, onAnswer, disabled }: Props) => {
  const { revealAnswer } = useStore(useGameSessionStore, (state) => state);
  return (
    <div className="grid grid-flow-row auto-rows-fr  grid-cols-2 gap-5">
      {problem.choices.map((choice, index) => {
        const showAnswer = problem.status !== "UNANSWERED" || revealAnswer;
        const isAnswer = problem.answer === choice;
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
            disabled={disabled}
            key={problem.id + index}
          >
            <p className="px-2">{choice}</p>
          </Button>
        );
      })}
    </div>
  );
};

export default GameChoices;
