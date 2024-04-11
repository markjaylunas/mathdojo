import { Game, OperationSymbol, Problem } from "./types";
import { v4 as uuidV4 } from "uuid";
import { evaluate } from "mathjs";

export const game: Game = {
  id: "1",
  title: "Classic Math",
  description: "Basic math operations",
  difficulty: "DYNAMIC",
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
  // operationList: ["ADDITION", "SUBTRACTION", "MULTIPLICATION", "DIVISION"],
  operationList: ["DIVISION"],
};

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
  game,
  level = 0,
}: {
  game: Game;
  level?: number;
}): Problem => {
  const { digitRange, operationList, id: game_id } = game;
  const operation =
    operationList[Math.floor(Math.random() * operationList.length)];

  let answer: number;
  let operationSymbol: OperationSymbol;
  let numberList: number[] = [];

  numberList = digitRange.map((range) =>
    generateNumberFromRange(range.minRange, range.maxRange)
  );

  switch (operation) {
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
      console.log(`${firstNumber} / ${secondNumber}`);

      answer = evaluate(`${firstNumber} / ${secondNumber}`);
      console.log({ answer });
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
    numberList,
    operation,
    operationSymbol,
    answer,
    userAnswer: null,
    choices,
    game_id: game_id,
    status: "UNANSWERED",
  };
};

export const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
