import { Icons } from "@components/ui/icons";
import { User } from "next-auth";
import {
  GameMode as Prisma__GameMode,
  GameOperation as Prisma__GameOperation,
  GameDigitRange as Prisma__GameDigitRangeClient,
} from "@prisma/client";

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
};

export type NavItemWithChildren = NavItem & {
  items: NavItemWithChildren[];
};

export type MainNavItem = NavItem & {};
export type UserNavItem = NavItemWithChildren & {};

export type SidebarNavItem = NavItemWithChildren & {};

export type ActionResponse = {
  status: "success" | "error";
  path?: string;
  message: string;
};

export type Role = "ADMIN" | "USER";

export type TUser = (User & { role: Role }) | null | undefined;

export type OperationSymbol = "+" | "-" | "x" | "÷";

export type Problem = {
  id: string;
  game_id: string;
  numberList: number[];
  operation: OperationName;
  operationSymbol: OperationSymbol;
  answer: number;
  userAnswer: number | null;
  choices: number[];
  status: "CORRECT" | "WRONG" | "UNANSWERED";
  lapTime: number | null;
};

export type OperationName =
  | "ADDITION"
  | "SUBTRACTION"
  | "MULTIPLICATION"
  | "DIVISION";

export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "EXPERT" | "CUSTOM";
// | "INFINITE";

// export type GameOperation = {
//   id: string;
//   operation: OperationName;
//   symbol: OperationSymbol;
//   difficulty: Difficulty;
//   digitRange: {
//     id: string;
//     order: number;
//     digit: number;
//     minRange: number;
//     maxRange: number;
//     operationId: string;
//   }[];
// };

export type GameInfo = {
  highestCombo: number;
  totalCombo: number;
  totalAnswered: number;
  correct: number;
  wrong: number;
  score: number;
  gameTime: number;
  level: number;
};

export type GameOperation = Prisma__GameOperation & {
  digitRange: Prisma__GameDigitRangeClient[];
};

export type GameMode = Prisma__GameMode & {
  gameOperations: GameOperation[];
};
