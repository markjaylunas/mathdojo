import { GameSessionState } from "../store/useGameSessionStore";
import { GameInfo } from "./types";

export const convertTimeToMilliseconds = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
}: {
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}) => {
  return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
};

export const CLASSIC_LEVEL_UP_THRESHOLD = 25;
export const MAX_CLASSIC_LEVEL = 12;

export const INITIAL_CLASSIC_GAME_INFO: GameInfo = {
  highestCombo: 0,
  totalCombo: 0,
  gameTime: 0,
  correct: 0,
  wrong: 0,
  score: 0,
  totalAnswered: 0,
  level: 1,
  rating: "E",
};

export const GAME_MAX_TIMER = convertTimeToMilliseconds({
  minutes: 3,
});

export const GAME_START_TIME = convertTimeToMilliseconds({
  seconds: 4,
});

export const CLASSIC_ANSWER_DELAY_TIME = convertTimeToMilliseconds({
  seconds: 1,
  milliseconds: 500,
});

export const CLASSIC_TIME = convertTimeToMilliseconds({
  minutes: 1,
  seconds: 30,
});

export const CLASSIC_CORRECT_ADD_TIME = convertTimeToMilliseconds({
  seconds: 5,
});

export const CLASSIC_WRONG_REDUCE_TIME = convertTimeToMilliseconds({
  seconds: 5,
});

export const INITIAL_GAME_SESSION_STATE: GameSessionState = {
  combo: 0,
  gameInfo: {
    correct: 0,
    wrong: 0,
    score: 0,
    highestCombo: 0,
    totalCombo: 0,
    totalAnswered: 0,
    level: 1,
    gameTime: 0,
    rating: "E",
  },
  problem: null,
  problemList: null,
  initialGameMode: null,
  gameMode: null,
  gameCreatedAt: null,
  levelCounter: 1,
  timer: {
    value: CLASSIC_TIME,
    isActive: false,
    status: "IDLE",
    history: [],
    lastLapTime: 0,
    lap: 0,
    lapHistory: [],
    pauseTime: 0,
    startRunningTime: 0,
    totalAddedTime: 0,
    totalReducedTime: 0,
    initialValue: CLASSIC_TIME,
  },
  isCooldown: false,
};

export const RATING_CSS = {
  SSS: "",
  SS: "",
  S: "",
  A: "text-blue-600",
  B: "text-green-600",
  C: "text-red-600",
  D: "text-purple-600",
  E: "text-gray-600",
};
