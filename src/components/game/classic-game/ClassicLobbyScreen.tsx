import { Button } from "../../ui/button";
import Heading from "../../ui/heading";
import GameLayout from "../layout/GameLayout";

type Props = {
  onGameStart: () => void;
};
const ClassicLobbyScreen = ({ onGameStart }: Props) => {
  return (
    <GameLayout>
      <Heading order="6xl" className="mt-10 text-center">
        Classic
      </Heading>

      <Button className="flex-none" onClick={onGameStart}>
        Start
      </Button>
    </GameLayout>
  );
};

export default ClassicLobbyScreen;
