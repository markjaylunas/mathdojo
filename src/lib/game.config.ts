import { PerkType } from "@prisma/client";
import { GameSessionState } from "../store/useGameSessionStore";
import { GameInfo } from "./types";

export const PERK_SOON: PerkType[] = [
  "DOUBLE_COIN",
  "DOUBLE_SCORE",
  "SHOW_ANSWER",
];

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

export const CLASSIC_LEVEL_UP_THRESHOLD = 10;
export const MAX_CLASSIC_LEVEL = 12;

export const INITIAL_CLASSIC_GAME_INFO: GameInfo = {
  id: "",
  score: 0,
  correct: 0,
  wrong: 0,
  totalAnswered: 0,
  highestCombo: 0,
  level: 1,
  gameTime: 0,
  rating: "E",
  coin: 0,
  expGained: 0,
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
  seconds: 10,
});

export const INITIAL_GAME_SESSION_STATE: GameSessionState = {
  combo: 0,
  gameInfo: INITIAL_CLASSIC_GAME_INFO,
  problem: null,
  problemList: null,
  initialGameMode: null,
  gameMode: null,
  gameCreatedAt: null,
  levelCounter: 1,
  activePerkList: [],
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
    maxTime: GAME_MAX_TIMER,
  },
  isCooldown: false,
};

export const RATING_CSS = {
  SSS: "",
  SS: "",
  S: "",
  A: "text-blue-600",
  B: "text-green-600",
  C: "text-orange-600",
  D: "text-indigo-600",
  E: "text-gray-600",
};
