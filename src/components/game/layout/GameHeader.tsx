import { Score } from "@/src/lib/types";
import Text from "../../ui/text";
import Heading from "../../ui/heading";

type Props = {
  score?: Score;
  showScore: boolean;
  children: React.ReactNode;
};
const GameHeader = ({ children, score, showScore }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <Heading className="">Classic</Heading>
        {showScore && score && (
          <div className="flex flex-col gap-2">
            <Text>Correct: {score.correct}</Text>
            <Text>Incorrect: {score.incorrect}</Text>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default GameHeader;
