import { useState, useEffect, Dispatch, SetStateAction } from "react";

export type GameTimerState = {
  value: number;
  initialValue: number;
  totalAddedTime: number;
  isActive: boolean;
};

export type TimerAction = {
  action: string;
  time: number;
  lapDifference?: number;
  added?: number;
  reduced?: number;
};

export type UseGameTimer = {
  timer: GameTimerState;
  setValue: Dispatch<SetStateAction<number>>;
  start: () => void;
  pause: () => void;
  reset: () => void;
  lap: () => void;
  add: (milliseconds: number) => void;
  reduce: (milliseconds: number) => void;
  resume: () => void;
  history: TimerAction[];
};

const useGameTimer = (initialValue: number): UseGameTimer => {
  const [status, setStatus] = useState<"idle" | "running" | "paused">("idle");
  const [value, setValue] = useState(initialValue);
  const [isActive, setIsActive] = useState(false);
  const [history, setHistory] = useState<TimerAction[]>([]);
  const [lastLapTime, setLastLapTime] = useState(0);
  const [totalAddedTime, setTotalAddedTime] = useState(0);
  const [totalReducedTime, setTotalReducedTime] = useState(0);

  const start = () => {
    if (status !== "idle") return;
    setIsActive(true);
    setStatus("running");
    setLastLapTime(value);
    setHistory((prevHistory) => [
      ...prevHistory,
      { action: "Start", time: value },
    ]);
  };

  const pause = () => {
    if (status !== "running") return;
    setIsActive(false);
    setStatus("paused");
    setHistory((prevHistory) => [
      ...prevHistory,
      { action: "Pause", time: value },
    ]);
  };

  const reset = () => {
    setIsActive(false);
    setStatus("idle");
    setValue(initialValue);
    setLastLapTime(0);
    setTotalAddedTime(0);
    setHistory([{ action: "Reset", time: initialValue }]);
  };

  const lap = () => {
    if (status !== "running") return;
    const lastLapAction = history
      .filter((action) => action.action === "Lap")
      .pop();
    const startTime =
      history.find((action) => action.action === "Start")?.time || 0;
    const lastLapTime = lastLapAction ? lastLapAction.time : startTime;
    const lapDifference = Math.abs(
      value - totalAddedTime + totalReducedTime - lastLapTime
    );
    setTotalAddedTime(0);
    setTotalReducedTime(0);
    setHistory((prevHistory) => [
      ...prevHistory,
      { action: "Lap", time: value, lapDifference },
    ]);
  };

  const add = (addedMilliseconds: number) => {
    if (status !== "running") return;
    setValue((prevMilliseconds) => prevMilliseconds + addedMilliseconds);
    setTotalAddedTime(
      (prevTotalAddedTime) => prevTotalAddedTime + addedMilliseconds
    );
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        action: `Add`,
        time: value + addedMilliseconds,
        added: addedMilliseconds,
      },
    ]);
  };

  const reduce = (reducedMilliseconds: number) => {
    if (status !== "running" || value - reducedMilliseconds < 0) return;
    setValue((prevMilliseconds) => prevMilliseconds - reducedMilliseconds);
    setTotalReducedTime(
      (prevTotalReducedTime) => prevTotalReducedTime + reducedMilliseconds
    );
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        action: `Reduce`,
        time: value - reducedMilliseconds,
        reduced: reducedMilliseconds,
      },
    ]);
  };

  const resume = () => {
    if (status !== "paused") return;
    setIsActive(true);
    setStatus("running");
    setHistory((prevHistory) => [
      ...prevHistory,
      { action: "Continue", time: value },
    ]);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && value > 0) {
      interval = setInterval(() => {
        if (isActive) {
          setValue((prevMilliseconds) => prevMilliseconds - 10);
        }
      }, 10);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }

    if (value === 0) {
      reset();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, value]);

  return {
    timer: { value, initialValue, totalAddedTime, isActive },
    setValue,
    start,
    pause,
    reset,
    lap,
    add,
    reduce,
    resume,
    history,
  };
};

export default useGameTimer;
