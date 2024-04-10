import { TimerAction, TimerProps } from "@/src/hooks/use-game-timer";
import { formatTime } from "@/src/lib/utils";
import React from "react";
import { Progress } from "../../ui/progress";
import { Problem } from "@/src/lib/types";

interface GameTimerProps {
  timer: TimerProps;
  status: Problem["status"];
}

const GameTimer: React.FC<GameTimerProps> = ({ timer, status }) => {
  const { formattedTime } = formatTime(timer.value);
  const percentage =
    (timer.value / (timer.initialValue + timer.totalAddedTime)) * 100;

  return (
    <div>
      <div className="relative">
        <p className="absolute left-1/2  top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-sm text-white mix-blend-exclusion">
          {formattedTime}
        </p>
        <Progress size="lg" value={percentage} status={status} />
      </div>
    </div>
  );
};

export default GameTimer;
