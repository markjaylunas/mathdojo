"use client";
import React, { useEffect } from "react";
import Heading from "../../ui/heading";
import GameLayout from "./GameLayout";
import { formatTime } from "@/src/lib/utils";
import useTimer from "@/src/hooks/use-timer";

type Props = {
  action: string;
  milliseconds?: number;
  onComplete: () => void;
};

const GameStartingCountdown = ({
  action,
  milliseconds = 4_000,
  onComplete,
}: Props) => {
  const { value, start, reset } = useTimer(milliseconds);
  const { seconds } = formatTime(value);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete();
      reset();
    }
  }, [value, onComplete, reset]);

  useEffect(() => {
    if (seconds <= 0) reset();
    start();
    return () => reset();
  }, []);

  if (seconds <= 0) return null;
  return (
    <GameLayout>
      <div className=" flex flex-1 flex-col  items-center justify-center">
        <Heading order="5xl">{action}</Heading>
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
