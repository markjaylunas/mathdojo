import { Problem } from "@/src/lib/types";

type Props = {
  choices: Problem["choices"];
};
const GameChoices = ({ choices }: Props) => {
  return (
    <div className="grid flex-1 grid-cols-2 gap-10">
      {choices.map((choice, index) => (
        <button className="border-2 border-red-500" key={index}>
          {choice}
        </button>
      ))}
    </div>
  );
};

export default GameChoices;
