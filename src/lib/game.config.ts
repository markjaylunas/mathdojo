import { GameSession } from "../store/useGameSessionStore";
import { convertTimeToMilliseconds } from "./game";
import { GameInfo, GameSetting } from "./types";

export const CLASSIC_LEVEL_UP_THRESHOLD = 2;

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
  status: "IDLE",
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

export const gameSetting: GameSetting = {
  id: "1",
  title: "Classic Math",
  description: "Basic math operations",
  difficulty: "CUSTOM",

  operationList: [
    {
      id: "1",
      operation: "ADDITION",
      symbol: "+",
      difficulty: "EASY",
      digitRange: [
        {
          id: "1",
          order: 1,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          gameId: 1,
        },
        {
          id: "2",
          order: 2,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          gameId: 1,
        },
      ],
    },
    {
      id: "2",
      operation: "SUBTRACTION",
      symbol: "-",
      difficulty: "EASY",
      digitRange: [
        {
          id: "3",
          order: 1,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          gameId: 1,
        },
        {
          id: "4",
          order: 2,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          gameId: 1,
        },
      ],
    },
    {
      id: "3",
      operation: "MULTIPLICATION",
      symbol: "x",
      difficulty: "EASY",
      digitRange: [
        {
          id: "5",
          order: 1,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          gameId: 1,
        },
        {
          id: "6",
          order: 2,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          gameId: 1,
        },
      ],
    },
    {
      id: "4",
      operation: "DIVISION",
      symbol: "÷",
      difficulty: "EASY",
      digitRange: [
        {
          id: "7",
          order: 1,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          gameId: 1,
        },
        {
          id: "8",
          order: 2,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          gameId: 1,
        },
      ],
    },
  ],
};
