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
  const userAnswerLength = problem.userAnswer
    ? problem.userAnswer.toString().length
    : 0;

  const maxDigitLength = Math.max(
    userAnswerLength,
    ...problem.numberList.map((num) => num.toString().length)
  );
  const answer = problem.answer;

  return (
    <div className="mx-auto flex max-w-fit flex-col gap-1 p-3">
      <div className="flex items-end justify-between gap-5">
        <Text className="text-right text-5xl font-bold">{operationSymbol}</Text>
        <div>
          {topNumbers.map((firstNumber, index) => (
            <Number
              key={index}
              maxDigitLength={maxDigitLength}
              value={firstNumber}
            />
          ))}
          <Number value={lastNumber} maxDigitLength={maxDigitLength} />
        </div>
      </div>
      <div className="border-[3px] border-gray-600 dark:border-gray-300" />
      <div className="flex items-end justify-between gap-5">
        <Text className="text-right text-5xl font-bold">=</Text>
        <Number value={answer} maxDigitLength={maxDigitLength} />
      </div>
    </div>
  );
};

export default GameView;
