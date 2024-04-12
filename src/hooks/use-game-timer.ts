import { useState, useEffect, Dispatch, SetStateAction } from "react";

export type GameTimerState = {
  value: number;
  initialValue: number;
  isActive: boolean;
  history: TimerAction[];
  duration: number;
  totalAddedTime: number;
  totalReducedTime: number;
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
  lap: () => number | null;
  add: (milliseconds: number) => void;
  reduce: (milliseconds: number) => void;
  resume: () => void;
};

const useGameTimer = (initialValue: number): UseGameTimer => {
  const [status, setStatus] = useState<
    "idle" | "running" | "paused" | "finished"
  >("idle");
  const [value, setValue] = useState(initialValue);
  const [isActive, setIsActive] = useState(false);
  const [history, setHistory] = useState<TimerAction[]>([]);
  const [lastLapTime, setLastLapTime] = useState(0);
  const [totalAdded, setTotalAdded] = useState(0);
  const [totalReduced, setTotalReduced] = useState(0);
  const [duration, setDuration] = useState(0);
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
    setTotalAdded(0);
    setTotalReduced(0);
    setDuration(0);
    setTotalAddedTime(0);
    setTotalReducedTime(0);
    setHistory([{ action: "Reset", time: initialValue }]);
  };

  const lap = () => {
    if (status !== "running") return null;
    const lastLapAction = history
      .filter((action) => action.action === "Lap")
      .pop();
    const startTime =
      history.find((action) => action.action === "Start")?.time || 0;
    const lastLapTime = lastLapAction ? lastLapAction.time : startTime;
    const lapDifference = Math.abs(
      value - totalAdded + totalReduced - lastLapTime
    );
    setTotalAdded(0);
    setTotalReduced(0);
    setHistory((prevHistory) => [
      ...prevHistory,
      { action: "Lap", time: value, lapDifference },
    ]);
    return lapDifference;
  };

  const add = (addedMilliseconds: number) => {
    if (status !== "running") return;
    setValue((prevMilliseconds) => prevMilliseconds + addedMilliseconds);
    setTotalAdded(
      (prevTotalAddedTime) => prevTotalAddedTime + addedMilliseconds
    );
    setTotalAddedTime(
      (prevTotalAddedTime) => prevTotalAddedTime + addedMilliseconds
    );
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        action: `Add`,
        time: value,
        added: addedMilliseconds,
      },
    ]);
  };

  const reduce = (reducedMilliseconds: number) => {
    if (status !== "running" || value - reducedMilliseconds < 0) return;
    setValue((prevMilliseconds) => prevMilliseconds - reducedMilliseconds);
    setTotalReduced(
      (prevTotalReducedTime) => prevTotalReducedTime + reducedMilliseconds
    );
    setTotalReducedTime(
      (prevTotalReducedTime) => prevTotalReducedTime + reducedMilliseconds
    );
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        action: `Reduce`,
        time: value,
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

  const finish = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      { action: "Finish", time: value },
    ]);
    setIsActive(false);
    setStatus("finished");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && value > 0) {
      interval = setInterval(() => {
        if (isActive) {
          setValue((prevMilliseconds) => prevMilliseconds - 10);
          setDuration((prevDuration) => prevDuration + 10);
        }
      }, 10);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }

    if (value === 0) {
      finish();
      reset();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, value]);

  return {
    timer: {
      value,
      initialValue,
      isActive,
      history,
      duration,
      totalAddedTime,
      totalReducedTime,
    },
    setValue,
    start,
    pause,
    reset,
    lap,
    add,
    reduce,
    resume,
  };
};

export default useGameTimer;
