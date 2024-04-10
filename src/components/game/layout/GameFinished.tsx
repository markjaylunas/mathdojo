import { Score } from "@/src/lib/types";
import Heading from "../../ui/heading";
import { Button } from "../../ui/button";
import { IconHome, IconReload } from "@tabler/icons-react";
import Link from "next/link";
import { DEFAULT_HOME_PATH } from "@/src/lib/routes";

type Props = {
  score: Score;
  onRetry: () => void;
};
const GameFinished = ({ score, onRetry }: Props) => {
  return (
    <div className="flex flex-1 flex-col justify-around">
      <div className="flex h-full flex-col items-center justify-center">
        <Heading className="text-5xl">Game Over</Heading>
        <h2 className="mt-6 text-2xl">Correct: {score.correct}</h2>
        <h2 className="mt-2 text-2xl">Incorrect: {score.incorrect}</h2>
      </div>

      <div className="flex justify-center gap-4 ">
        <Link href={DEFAULT_HOME_PATH}>
          <Button className="w-full max-w-40">
            <IconHome className="mr-2" size={16} />
            Home
          </Button>
        </Link>

        <Button
          onClick={onRetry}
          className="w-full max-w-40"
          variant="secondary"
        >
          <IconReload className="mr-2" size={16} />
          Retry
        </Button>
      </div>
    </div>
  );
};

export default GameFinished;
