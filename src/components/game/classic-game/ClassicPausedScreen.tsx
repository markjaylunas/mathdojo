import { IconArrowRight, IconHome, IconReload } from "@tabler/icons-react";
import { Button } from "../../ui/button";
import Heading from "../../ui/heading";
import GameLayout from "../layout/GameLayout";

type Props = {
  onResume: () => void;
  onRestart: () => void;
  onHome: () => void;
};

const ClassicPausedScreen = ({ onResume, onRestart, onHome }: Props) => {
  return (
    <GameLayout>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-10">
        <Heading className="text-center">Game Paused</Heading>

        <div className="flex w-full max-w-sm flex-col gap-5">
          <Button onClick={onResume}>
            <IconArrowRight size={16} className="mr-2" />
            Continue
          </Button>
          <Button onClick={onRestart} variant="secondary">
            <IconReload size={16} className="mr-2" />
            Restart
          </Button>
          <Button onClick={onHome} variant="destructive">
            <IconHome size={16} className="mr-2" />
            Go to Home
          </Button>
        </div>
      </div>
    </GameLayout>
  );
};

export default ClassicPausedScreen;
