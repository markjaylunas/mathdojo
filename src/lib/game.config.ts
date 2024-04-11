import { convertTimeToMilliseconds } from "./game";
import { GameInfo } from "./types";

export const INITIAL_CLASSIC_GAME_INFO: GameInfo = {
  highestCombo: 0,
  totalCombo: 0,
  totalQuestion: 0,
  correct: 0,
  incorrect: 0,
  score: 0,
  duration: 0,
};

export const GAME_START_TIME = convertTimeToMilliseconds({
  hours: 0,
  minutes: 0,
  seconds: 4,
  milliseconds: 0,
});

export const CLASSIC_ANSWER_DELAY_TIME = convertTimeToMilliseconds({
  hours: 0,
  minutes: 0,
  seconds: 1,
  milliseconds: 500,
});

export const CLASSIC_TIME = convertTimeToMilliseconds({
  hours: 0,
  minutes: 2,
  seconds: 0,
  milliseconds: 0,
});

export const CLASSIC_CORRECT_ADD_TIME = convertTimeToMilliseconds({
  hours: 0,
  minutes: 0,
  seconds: 7,
  milliseconds: 0,
});

export const CLASSIC_INCORRECT_REDUCE_TIME = convertTimeToMilliseconds({
  hours: 0,
  minutes: 0,
  seconds: 5,
  milliseconds: 0,
});
