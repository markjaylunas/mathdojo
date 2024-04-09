import { TimerAction } from "@/src/hooks/use-game-timer";
import { formatTime } from "@/src/lib/utils";
import React from "react";

interface GameTimerProps {
  timer: number;
  history: TimerAction[];
}

const GameTimer: React.FC<GameTimerProps> = ({ timer, history }) => {
  const { formattedTime, hours, minutes, seconds, milliseconds } =
    formatTime(timer);

  return (
    <div>
      <li>{hours}</li>
      <li>{minutes}</li>
      <li>{seconds}</li>
      <li>{milliseconds}</li>
      {/* <h1>Timer: {formattedTime}</h1> */}

      {/* <div>
        <h2>Saved Times:</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              Action: {item.action}, Time: {formatTime(item.time).formattedTime}
              , {item.lapDifference && `Difference: ${item.lapDifference}`},{" "}
              {item.added && `Added: ${item.added}`}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default GameTimer;
