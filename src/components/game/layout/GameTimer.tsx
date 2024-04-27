"use client";

import { Problem } from "@/src/lib/types";
import { formatTime } from "@/src/lib/utils";
import { TimerState } from "@/src/store/useGameSessionStore";
import React, { useEffect } from "react";
import { Progress } from "../../ui/time-progress";

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
  const {
    value,
    maxTime,
    initialValue,
    totalAddedTime,
    totalReducedTime,
    isActive,
  } = timer;
  const { formattedTime } = formatTime(value);
  const totalTime = Math.min(
    initialValue + totalAddedTime - totalReducedTime,
    maxTime
  );
  const percentage = (timer.value / totalTime) * 100;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isActive) {
        const newValue = value - 100;
        if (newValue <= 0) {
          gameFinish();
        } else {
          setTimerValue(newValue);
        }
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, value]);

  return (
    <div>
      <div className="relative">
        <p className="absolute left-1/2  top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-xs  text-white mix-blend-difference">
          {formattedTime}
        </p>
        <Progress size="lg" value={percentage} status={status} />
      </div>
    </div>
  );
};

export default GameTimer;
