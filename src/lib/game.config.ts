import { GameSession } from "../store/useGameSessionStore";
import { convertTimeToMilliseconds, game } from "./game";
import { GameInfo } from "./types";

export const INITIAL_CLASSIC_GAME_INFO: GameInfo = {
  highestCombo: 0,
  totalCombo: 0,
  totalQuestion: 0,
  correct: 0,
  incorrect: 0,
  score: 0,
};

export const GAME_SESSION_STORE_INITIAL_STATE: GameSession = {
  gameSetting: null,
  status: "idle",
  problem: null,
  problemList: null,
  level: 1,
  combo: 0,
  gameInfo: INITIAL_CLASSIC_GAME_INFO,
  timer: {
    value: 0,
    initialValue: 0,
    isActive: false,
    history: [],
    duration: 0,
    totalAddedTime: 0,
    totalReducedTime: 0,
  },
};

export const GAME_START_TIME = convertTimeToMilliseconds({
  seconds: 4,
});

export const CLASSIC_ANSWER_DELAY_TIME = convertTimeToMilliseconds({
  seconds: 1,
  milliseconds: 500,
});

export const CLASSIC_TIME = convertTimeToMilliseconds({
  minutes: 2,
});

export const CLASSIC_CORRECT_ADD_TIME = convertTimeToMilliseconds({
  seconds: 7,
});

export const CLASSIC_INCORRECT_REDUCE_TIME = convertTimeToMilliseconds({
  seconds: 5,
});
