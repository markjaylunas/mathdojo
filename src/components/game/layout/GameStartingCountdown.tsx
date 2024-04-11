import { formatTime } from "@/src/lib/utils";
import React from "react";
import Heading from "../../ui/heading";
import GameLayout from "./GameLayout";

const GameStartingCountdown: React.FC<{ countdownTimer: number }> = ({
  countdownTimer,
}) => {
  const { seconds } = formatTime(countdownTimer);
  if (seconds === 0) return null;
  return (
    <GameLayout>
      <div className=" flex flex-1 flex-col  items-center justify-center">
        <Heading order="5xl">Starting</Heading>
        <Heading order="5xl" className="mt-4">
          in
        </Heading>
        <Heading order="8xl" className="mt-4">
          {seconds}
        </Heading>
      </div>
    </GameLayout>
  );
};

export default GameStartingCountdown;
