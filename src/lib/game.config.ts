import { convertTimeToMilliseconds } from "./game";

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
  minutes: 10,
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
