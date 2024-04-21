import {
  Difficulty,
  OperationSymbol,
  Problem,
  GameMode,
  GameOperation,
  GameInfo,
} from "./types";
import { v4 as uuidV4 } from "uuid";
import { evaluate } from "mathjs";
import { Rating } from "@prisma/client";
import { MAX_CLASSIC_LEVEL } from "./game.config";

export const getRandomInt = (min: number, max: number) => {
  let byteArray = new Uint32Array(1);
  window.crypto.getRandomValues(byteArray);
  let range = max - min;
  let maxRange = Math.pow(2, 32) - 1;
  return Math.floor((byteArray[0] / maxRange) * range) + min;
};

export const generateChoices = (answer: number) => {
  const choices = new Set<number>();

  choices.add(answer);
  while (choices.size !== 4) {
    const choice = Math.floor(
      Math.random() * (answer + 10 - (answer - 10) + 1) + (answer - 10)
    );
    choices.add(choice);
  }
  return Array.from(choices).sort(() => Math.random() - 0.5);
};

export const toTwoDecimalNumber = (num: number) => {
  return Number(num.toFixed(2));
};

export const generateProblem = ({
  gameMode,
  gameInfo,
}: {
  gameMode: GameMode | null;
  gameInfo: GameInfo;
}): Problem => {
  if (gameMode === null)
    throw new Error("Game setting is null, cannot generate problem");
  const { gameOperations, id: game_id } = gameMode;
  const operation =
    gameOperations[Math.floor(Math.random() * gameOperations.length)];

  let answer: number;
  let operationSymbol: OperationSymbol;
  let numberList: number[] = [];

  numberList = operation.digitRange.map((range) =>
    getRandomInt(range.minRange, range.maxRange)
  );

  switch (operation.operation) {
    case "ADDITION":
      answer = evaluate(numberList.join(" + "));
      operationSymbol = "+";
      break;

    case "SUBTRACTION":
      answer = evaluate(numberList.join(" - "));
      operationSymbol = "-";
      break;

    case "MULTIPLICATION":
      answer = evaluate(numberList.join(" * "));
      operationSymbol = "x";
      break;

    case "DIVISION":
      const [firstNumber, secondNumber] = numberList.sort((a, b) => b - a);
      answer = evaluate(`${firstNumber} / ${secondNumber}`);
      operationSymbol = "÷";
      break;

    default:
      throw new Error(`Invalid operation: ${operation}`);
  }

  answer = toTwoDecimalNumber(answer);
  const choices = generateChoices(answer);
  const id = uuidV4().toString();

  const coin = getRandomInt(0, 2) + gameInfo.level;

  const newProblem: Problem = {
    id,
    operation: operation.operation,
    numberList,
    operationSymbol,
    answer,
    userAnswer: null,
    choices,
    game_id: game_id,
    status: "UNANSWERED",
    coin,
    lapTime: null,
  };

  return newProblem;
};

export const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const DIFFICULTY_HEIRARCHY: Difficulty[] = [
  "EASY",
  "MEDIUM",
  "HARD",
  "EXPERT",
];

export const adjustGameSettingDifficulty = ({
  gameMode,
}: {
  gameMode: GameMode | null;
}) => {
  if (gameMode === null)
    throw new Error("Game setting is null, cannot adjust difficulty");
  let lowestDifficultyIndex = 1;
  lowestDifficultyIndex = gameMode.gameOperations.reduce(
    (acc, operation, index) => {
      const difficultyIndex = DIFFICULTY_HEIRARCHY.indexOf(
        operation.difficulty
      );
      if (acc === -1) return index;
      return difficultyIndex <
        DIFFICULTY_HEIRARCHY.indexOf(gameMode.gameOperations[acc].difficulty)
        ? index
        : acc;
    },
    -1
  );

  const operation = gameMode.gameOperations[lowestDifficultyIndex];

  let maxDigit = 6;
  switch (operation.operation) {
    case "ADDITION":
      maxDigit = 7;
      break;
    case "SUBTRACTION":
      maxDigit = 7;
      break;
    case "MULTIPLICATION":
      maxDigit = 5;
      break;
    case "DIVISION":
      maxDigit = 7;
      break;
    default:
      maxDigit = 6;
      break;
  }

  const digitRangeIndex = operation.digitRange[0].digit >= maxDigit ? 1 : 0;

  const digitRange = operation.digitRange[digitRangeIndex];

  const newDigit = Math.min(digitRange.digit + 1, maxDigit);
  let newMinRange = Math.pow(10, newDigit - 1);
  let newMaxRange = Math.pow(10, newDigit) - 1;

  // Restrictions for each operation
  switch (operation.operation) {
    case "ADDITION":
      break;
    case "SUBTRACTION":
      if (operation.difficulty === "EXPERT") {
        newMinRange = Math.min(newMinRange, newMaxRange - 1);
      }
      break;
    case "MULTIPLICATION":
      newMaxRange = Math.min(newMaxRange, 9);
      break;
    case "DIVISION":
      newMinRange = Math.max(newMinRange, 1);
      break;
    default:
      break;
  }

  const newDigitRange = {
    ...digitRange,
    digit: newDigit,
    minRange: newMinRange,
    maxRange: newMaxRange,
  };

  const newOperation: GameOperation = {
    ...operation,
    difficulty:
      DIFFICULTY_HEIRARCHY[
        DIFFICULTY_HEIRARCHY.indexOf(operation.difficulty) + 1
      ],
    digitRange: operation.digitRange.map((range, rangeIndex) =>
      rangeIndex === digitRangeIndex ? newDigitRange : range
    ),
  };

  const newGameSetting: GameMode = {
    ...gameMode,
    gameOperations: [
      ...gameMode.gameOperations.filter((_, i) => i !== lowestDifficultyIndex),
      newOperation,
    ],
  };
  return newGameSetting;
};

export const getRating = ({
  correct,
  wrong,
  level,
}: {
  correct: number;
  wrong: number;
  level: number;
}): Rating => {
  const totalQuestions = correct + wrong;
  const accuracy = correct / totalQuestions;

  // Define base level thresholds
  const levelThresholds = [
    1, 0.95, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0,
  ].sort((a, b) => b - a);

  const levelThreshold = levelThresholds[level - 1]; // Adjust level to zero-based index

  if (accuracy === levelThreshold + 1 && level === MAX_CLASSIC_LEVEL) {
    return "SSS";
  } else if (
    accuracy >= levelThreshold - 0.1 &&
    level > MAX_CLASSIC_LEVEL / 2
  ) {
    return "SS";
  } else if (accuracy >= levelThreshold - 0.2) {
    return "S";
  } else if (accuracy >= levelThreshold - 0.3) {
    return "A";
  } else if (accuracy >= levelThreshold - 0.4) {
    return "B";
  } else if (accuracy >= levelThreshold - 0.5) {
    return "C";
  } else if (accuracy >= levelThreshold - 0.6) {
    return "D";
  } else {
    return "E";
  }
};
