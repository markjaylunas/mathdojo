import { Problem } from "@/src/lib/types";
import { cn } from "@/src/lib/utils";
import { PerkType } from "@prisma/client";
import Text from "../../ui/text";
import Number from "./Number";

type Props = {
  problem: Problem;
  activePerkList: PerkType[];
};
const GameView = ({ problem, activePerkList }: Props) => {
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
  const { userAnswer, status } = problem;

  return (
    <div className="mx-auto flex max-w-fit flex-auto flex-col justify-center gap-1 p-1 transition-all duration-150 ease-in-out">
      <div className="flex items-end justify-between gap-5">
        <Text className="text-right text-5xl font-medium">
          {operationSymbol}
        </Text>
        <div>
          {topNumbers.map((firstNumber, index) => (
            <Number
              key={index}
              maxDigitLength={maxDigitLength}
              numberFullValue={firstNumber}
            />
          ))}
          <Number
            numberFullValue={lastNumber}
            maxDigitLength={maxDigitLength}
          />
        </div>
      </div>
      <div className="border-[3px] border-gray-600 dark:border-gray-300" />
      <div className="flex items-end justify-end gap-5">
        {userAnswer !== null && (
          <Number
            numberFullValue={userAnswer || 0}
            maxDigitLength={maxDigitLength}
            status={status}
          />
        )}
        {userAnswer === null && <div className={cn("h-[48px] w-full")} />}
      </div>
    </div>
  );
};

export default GameView;
