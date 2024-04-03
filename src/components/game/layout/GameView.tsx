import { Problem } from "@/src/lib/types";
import Number from "./Number";

type Props = {
  problem: Problem;
};
const GameView = ({ problem }: Props) => {
  const { operationSymbol } = problem;
  const [firstNumber, secondNumber] = problem.numberList;
  return (
    <div className="flex-1">
      <Number>{firstNumber}</Number>
      <Number>{operationSymbol}</Number>
      <Number>{secondNumber}</Number>
    </div>
  );
};

export default GameView;
