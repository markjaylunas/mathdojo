import { Score } from "@/src/lib/types";
import Text from "../../ui/text";
import Heading from "../../ui/heading";

type Props = {
  score: Score;
  showScore: boolean;
};
const GameHeader = ({ score, showScore }: Props) => {
  const { correct, incorrect } = score;
  const total = correct + incorrect;
  return (
    <div className="flex justify-between">
      <Heading className="">Classic</Heading>
      {showScore && (
        <div className="flex flex-col gap-2">
          <Text>Correct: {correct}</Text>
          <Text>Incorrect: {incorrect}</Text>
          <Text>Total: {total}</Text>
        </div>
      )}
    </div>
  );
};

export default GameHeader;
