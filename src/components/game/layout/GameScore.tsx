import { Score } from "@/src/lib/types";
import Text from "../../ui/text";

type Props = {
  score: Score;
};
const GameScore = ({ score }: Props) => {
  const { correct, incorrect } = score;
  const total = correct + incorrect;
  return (
    <div className="mt-4 flex gap-2">
      <Text>Correct: {correct}</Text>
      <Text>Incorrect: {incorrect}</Text>
      <Text>Total: {total}</Text>
    </div>
  );
};

export default GameScore;
