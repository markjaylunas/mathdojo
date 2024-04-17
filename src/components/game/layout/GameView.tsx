import { Problem } from "@/src/lib/types";
import Number from "./Number";
import Text from "../../ui/text";

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
  const { userAnswer, status } = problem;

  return (
    <div className="mx-auto flex max-w-fit flex-auto flex-col justify-center gap-1 p-3 transition-all duration-150 ease-in-out">
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
        {userAnswer !== null ? (
          <Number
            numberFullValue={userAnswer}
            maxDigitLength={maxDigitLength}
            status={status}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default GameView;
