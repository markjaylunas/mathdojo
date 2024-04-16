import { Difficulty, OperationSymbol, Problem, GameMode } from "./types";
import { v4 as uuidV4 } from "uuid";
import { evaluate, re } from "mathjs";
import { GameSessionState } from "../store/useGameSessionStore";
import { Game, Rating } from "@prisma/client";

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

export const generateNumberFromRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
  level = 0,
}: {
  gameMode: GameMode | null;
  level?: number;
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
    generateNumberFromRange(range.minRange, range.maxRange)
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

  return {
    id,
    operation: operation.operation,
    numberList,
    operationSymbol,
    answer,
    userAnswer: null,
    choices,
    game_id: game_id,
    status: "UNANSWERED",
    lapTime: null,
  };
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

  const lowestDifficultyIndex = gameMode.gameOperations.reduce(
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

  const newOperationList = gameMode.gameOperations.map((operation, index) => {
    if (index === lowestDifficultyIndex) {
      const newDigitRange = operation.digitRange.map((digitRange) => {
        const newDigit = Math.min(digitRange.digit + 1, 9);
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

        return {
          ...digitRange,
          digit: newDigit,
          minRange: newMinRange,
          maxRange: newMaxRange,
        };
      });

      return {
        ...operation,
        difficulty:
          DIFFICULTY_HEIRARCHY[
            DIFFICULTY_HEIRARCHY.indexOf(operation.difficulty) + 1
          ],
        digitRange: newDigitRange,
      };
    }
    return operation;
  });

  const newGameSetting: GameMode = {
    ...gameMode,
    gameOperations: newOperationList,
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
  const baseLevelThresholds = [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3];
  let levelThresholds = baseLevelThresholds;

  // Extend level thresholds if level exceeds the number of base thresholds
  if (level > baseLevelThresholds.length) {
    const diff = level - baseLevelThresholds.length;
    const newThresholds = Array(diff).fill(0.2); // Fill with default threshold (0.2)
    levelThresholds = baseLevelThresholds.concat(newThresholds);
  }

  // Adjust level within the range of level thresholds
  const adjustedLevel = Math.min(level, levelThresholds.length);

  const levelThreshold = levelThresholds[adjustedLevel - 1]; // Adjust level to zero-based index

  if (adjustedLevel > levelThresholds.length) {
    if (accuracy >= levelThreshold) {
      return "SSS";
    } else if (accuracy >= levelThreshold - 0.1) {
      return "SS";
    } else if (accuracy >= levelThreshold - 0.2) {
      return "S";
    }
  }

  if (accuracy >= levelThreshold - 0.3) {
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
