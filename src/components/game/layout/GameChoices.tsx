"use client";

import { Problem } from "@/src/lib/types";
import { Button } from "../../ui/button";

type Props = {
  choices: Problem["choices"];
  onAnswer: (answer: number) => void;
  disabled: boolean;
};
const GameChoices = ({ choices, onAnswer, disabled }: Props) => {
  return (
    <div className="grid grid-flow-row auto-rows-fr  grid-cols-2 gap-5">
      {choices.map((choice, index) => (
        <Button
          variant="secondary"
          size="icon"
          className="size-full min-h-20 text-4xl font-bold text-gray-600 transition-all duration-150  ease-in-out hover:scale-105 hover:bg-primary hover:text-white dark:text-gray-300 hover:dark:text-black"
          onClick={() => onAnswer(choice)}
          disabled={disabled}
          key={index}
        >
          <p className="px-2">{choice}</p>
        </Button>
      ))}
    </div>
  );
};

export default GameChoices;
