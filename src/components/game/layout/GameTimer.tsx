"use client";

import { formatTime } from "@/src/lib/utils";
import React, { useEffect } from "react";
import { Progress } from "../../ui/progress";
import { Problem } from "@/src/lib/types";
import { TimerState } from "@/src/store/useGameSessionStore";

type GameTimerProps = {
  timer: TimerState;
  status: Problem["status"];
  setTimerValue: (value: number) => void;
  gameFinish: () => void;
};

const GameTimer: React.FC<GameTimerProps> = ({
  timer,
  status,
  setTimerValue,
  gameFinish,
}) => {
  const { value, initialValue, totalAddedTime, isActive } = timer;
  const { formattedTime } = formatTime(value);
  const percentage = (timer.value / (initialValue + totalAddedTime)) * 100;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isActive) {
        const newValue = value - 1000;
        if (newValue <= 0) {
          gameFinish();
        } else {
          setTimerValue(newValue);
        }
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, value]);

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
