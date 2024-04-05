import { Problem } from "@/src/lib/types";
import Number from "./Number";
import { Separator } from "../../ui/separator";
import Text from "../../ui/text";
import { cn } from "@/src/lib/utils";

type Props = {
  problem: Problem;
};
const GameView = ({ problem }: Props) => {
  const { operationSymbol } = problem;
  const topNumbers = problem.numberList.slice(0, -1);
  const lastNumber = problem.numberList[problem.numberList.length - 1];
  const maxDigitLength = Math.max(
    ...problem.numberList.map((num) => num.toString().length)
  );

  return (
    <div className="mx-auto flex max-w-fit flex-col gap-1 p-3">
      <div className="flex items-end justify-between gap-5">
        <Number>{operationSymbol}</Number>
        <div>
          {topNumbers.map((firstNumber, index) => (
            <Number key={index}>{firstNumber}</Number>
          ))}
          <Number>{lastNumber}</Number>
        </div>
      </div>
      <div className="border-[3px] border-gray-600 dark:border-gray-300" />
      <Text className="text-5xl font-bold">=</Text>
    </div>
  );
};

export default GameView;
