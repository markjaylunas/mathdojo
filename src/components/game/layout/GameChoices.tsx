import { Problem } from "@/src/lib/types";
import { Button } from "../../ui/button";

type Props = {
  choices: Problem["choices"];
};
const GameChoices = ({ choices }: Props) => {
  return (
    <div className="grid flex-1 grid-cols-2 gap-5">
      {choices.map((choice, index) => (
        <Button
          variant="secondary"
          size="icon"
          className="size-full text-5xl font-bold"
          key={index}
        >
          {choice}
        </Button>
      ))}
    </div>
  );
};

export default GameChoices;
