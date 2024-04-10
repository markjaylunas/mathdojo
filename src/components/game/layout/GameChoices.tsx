import { Problem } from "@/src/lib/types";
import { Button } from "../../ui/button";

type Props = {
  problemId: string;
  choices: Problem["choices"];
  onAnswer: (answer: number) => void;
  disabled: boolean;
};
const GameChoices = ({ problemId, choices, onAnswer, disabled }: Props) => {
  return (
    <div className="grid grid-flow-row auto-rows-fr  grid-cols-2 gap-5">
      {choices.map((choice, index) => (
        <Button
          size="icon"
          className="size-full min-h-20 text-4xl font-bold transition-all duration-150  ease-in-out active:scale-105"
          onClick={() => onAnswer(choice)}
          disabled={disabled}
          key={problemId + index}
        >
          <p className="px-2">{choice}</p>
        </Button>
      ))}
    </div>
  );
};

export default GameChoices;
