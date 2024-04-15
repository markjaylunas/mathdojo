import { GameSessionState } from "../store/useGameSessionStore";
import { convertTimeToMilliseconds } from "./game";
import { GameInfo, GameSetting } from "./types";

export const CLASSIC_LEVEL_UP_THRESHOLD = 20;

export const INITIAL_CLASSIC_GAME_INFO: GameInfo = {
  highestCombo: 0,
  totalCombo: 0,
  totalQuestion: 0,
  correct: 0,
  wrong: 0,
  score: 0,
};

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
  seconds: 7,
});

export const CLASSIC_WRONG_REDUCE_TIME = convertTimeToMilliseconds({
  seconds: 5,
});

export const gameSetting: GameSetting = {
  id: "5115284c-fb71-456f-9c5b-3eda365727c4",
  title: "Classic Math",
  description: "Basic math operations",
  difficulty: "CUSTOM",

  operationList: [
    {
      id: "d1c992f3-3933-433e-9d00-e7370a56a08e",
      operation: "ADDITION",
      symbol: "+",
      difficulty: "EASY",
      digitRange: [
        {
          id: "1f0f495c-df36-4e72-882a-92b50efb0f1f",
          order: 1,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          operationId: "d1c992f3-3933-433e-9d00-e7370a56a08e",
        },
        {
          id: "d080ddc5-7c86-488f-bd0f-d56a71276d9f",
          order: 2,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          operationId: "d1c992f3-3933-433e-9d00-e7370a56a08e",
        },
      ],
    },
    {
      id: "726780f3-a5b3-423f-abcf-51dd7eabb1c7",
      operation: "SUBTRACTION",
      symbol: "-",
      difficulty: "EASY",
      digitRange: [
        {
          id: "c857ae3d-e31e-496a-bdd4-d877a1949110",
          order: 1,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          operationId: "726780f3-a5b3-423f-abcf-51dd7eabb1c7",
        },
        {
          id: "65359496-205b-4b94-bbb9-362ef9efbfa3",
          order: 2,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          operationId: "726780f3-a5b3-423f-abcf-51dd7eabb1c7",
        },
      ],
    },
    {
      id: "682d8358-7c38-455d-9e85-c65b556848cd",
      operation: "MULTIPLICATION",
      symbol: "x",
      difficulty: "EASY",
      digitRange: [
        {
          id: "ef073793-460a-4b21-bbd3-39d2cda7b9d6",
          order: 1,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          operationId: "682d8358-7c38-455d-9e85-c65b556848cd",
        },
        {
          id: "32f061ef-1faf-4199-b940-eac0a1d98806",
          order: 2,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          operationId: "682d8358-7c38-455d-9e85-c65b556848cd",
        },
      ],
    },
    {
      id: "fe173de8-7a5b-403d-bc83-334b0cb92017",
      operation: "DIVISION",
      symbol: "÷",
      difficulty: "EASY",
      digitRange: [
        {
          id: "9bf11b18-2dca-4e82-be6c-865e8419e3ba",
          order: 1,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          operationId: "fe173de8-7a5b-403d-bc83-334b0cb92017",
        },
        {
          id: "45115df1-21ae-44d5-a10e-3ecaae0eccf7",
          order: 2,
          digit: 1,
          minRange: 1,
          maxRange: 9,
          operationId: "fe173de8-7a5b-403d-bc83-334b0cb92017",
        },
      ],
    },
  ],
};

export const INITIAL_GAME_SESSION_STATE: GameSessionState = {
  combo: 0,
  gameInfo: {
    correct: 0,
    wrong: 0,
    score: 0,
    highestCombo: 0,
    totalCombo: 0,
    totalQuestion: 0,
  },
  problem: null,
  problemList: null,
  gameSetting: gameSetting,
  level: 1,
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
  totalRunningTime: 0,
  isCooldown: false,
};
