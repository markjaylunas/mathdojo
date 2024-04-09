import { set } from "lodash";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

type TimerState = {
  timer: number;
  isActive: boolean;
};

export type TimerAction = {
  action: string;
  time: number;
  lapDifference?: number;
  added?: number;
};

type ReturnType = {
  state: TimerState;
  setMilliseconds: Dispatch<SetStateAction<number>>;
  start: () => void;
  pause: () => void;
  reset: () => void;
  lap: () => void;
  add: (milliseconds: number) => void;
  resume: () => void;
  history: TimerAction[];
};

const useGameTimer = (initialMilliseconds: number): ReturnType => {
  const [status, setStatus] = useState<"idle" | "running" | "paused">("idle");
  const [timer, setMilliseconds] = useState(initialMilliseconds);
  const [isActive, setIsActive] = useState(false);
  const [history, setHistory] = useState<TimerAction[]>([]);
  const [lastLapTime, setLastLapTime] = useState(0);
  const [totalAddedTime, setTotalAddedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setMilliseconds((prevMilliseconds) => prevMilliseconds - 10);
      }, 10);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timer]);

  const start = () => {
    if (status !== "idle") return;
    setIsActive(true);
    setStatus("running");
    setLastLapTime(timer);
    setHistory((prevHistory) => [
      ...prevHistory,
      { action: "Start", time: timer },
    ]);
  };

  const pause = () => {
    if (status !== "running") return;
    setIsActive(false);
    setStatus("paused");
    setHistory((prevHistory) => [
      ...prevHistory,
      { action: "Pause", time: timer },
    ]);
  };

  const reset = () => {
    setIsActive(false);
    setStatus("idle");
    setMilliseconds(initialMilliseconds);
    setLastLapTime(0);
    setHistory([{ action: "Reset", time: initialMilliseconds }]);
  };

  const lap = () => {
    if (status !== "running") return;
    const lastLapAction = history
      .filter((action) => action.action === "Lap")
      .pop();
    const startTime =
      history.find((action) => action.action === "Start")?.time || 0;
    const lastLapTime = lastLapAction ? lastLapAction.time : startTime;
    const lapDifference = Math.abs(timer - totalAddedTime - lastLapTime);
    setTotalAddedTime(0);
    setHistory((prevHistory) => [
      ...prevHistory,
      { action: "Lap", time: timer, lapDifference },
    ]);
  };

  const add = (addedMilliseconds: number) => {
    if (status !== "running") return;
    setMilliseconds((prevMilliseconds) => prevMilliseconds + addedMilliseconds);
    setTotalAddedTime(
      (prevTotalAddedTime) => prevTotalAddedTime + addedMilliseconds
    );
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        action: `Add`,
        time: timer + addedMilliseconds,
        added: addedMilliseconds,
      },
    ]);
  };

  const resume = () => {
    if (status !== "paused") return;
    setIsActive(true);
    setStatus("running");
    setHistory((prevHistory) => [
      ...prevHistory,
      { action: "Continue", time: timer },
    ]);
  };

  return {
    state: { timer, isActive },
    setMilliseconds,
    start,
    pause,
    reset,
    lap,
    add,
    resume,
    history,
  };
};

export default useGameTimer;
