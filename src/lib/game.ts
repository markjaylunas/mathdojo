import { Game, Problem } from "./types";
import { v4 as uuidV4 } from "uuid";

export const game: Game = {
  id: "1",
  title: "Add two numbers",
  description: "Add two numbers together",
  difficulty: "easy",
  digit_range: [
    {
      id: "1",
      digit: 2,
      order: 1,
      minRange: 11,
      maxRange: 99,
      game_id: 1,
    },
    {
      id: "2",
      digit: 1,
      order: 2,
      minRange: 1,
      maxRange: 9,
      game_id: 1,
    },
  ],
  operation: "ADDITION",
  operationSymbol: "+",
};

export const convertTimeToMilliseconds = (time: {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}) => {
  const { hours, minutes, seconds, milliseconds } = time;
  return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
};

export const generateProblem = (game: Game): Problem => {
  const { digit_range, operation, operationSymbol, id: game_id } = game;
  const sortedDigitRange = digit_range.sort((a, b) => a.order - b.order);

  const numberList = sortedDigitRange.map((digitRange) => {
    const { minRange, maxRange } = digitRange;
    return Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);
  });

  let answer: number;
  switch (operation) {
    case "ADDITION":
      answer = numberList.reduce((acc, num) => acc + num, 0);
      break;
    case "SUBTRACTION":
      answer = numberList.reduce((acc, num) => acc - num, 0);
      break;
    case "MULTIPLICATION":
      answer = numberList.reduce((acc, num) => acc * num, 1);
      break;
    case "DIVISION":
      answer = numberList.reduce((acc, num) => acc / num, 1);
    default:
      throw new Error(`Invalid operation: ${operation}`);
  }

  const generateChoices = (answer: number) => {
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
    status: "unanswered",
  };
};

export const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
