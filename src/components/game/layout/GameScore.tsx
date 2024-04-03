import { Score } from "@/src/lib/types";
import Text from "../../ui/text";

type Props = {
  score: Score;
};
const GameScore = ({ score }: Props) => {
  const { correct, incorrect, total } = score;
  return (
    <div className="mt-4 flex">
      <Text>Correct: {correct}</Text>
      <Text>Incorrect: {incorrect}</Text>
      <Text>Total: {total}</Text>
    </div>
  );
};

export default GameScore;
