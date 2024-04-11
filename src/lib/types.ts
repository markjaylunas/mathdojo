import { Icons } from "@components/ui/icons";
import { User } from "next-auth";

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
  operation: Operation;
  operationSymbol: OperationSymbol;
  answer: number;
  userAnswer: number | null;
  choices: number[];
  status: "CORRECT" | "WRONG" | "UNANSWERED";
};

export type Operation =
  | "ADDITION"
  | "SUBTRACTION"
  | "MULTIPLICATION"
  | "DIVISION";

export type Difficulty =
  | "DYNAMIC"
  | "EASY"
  | "MEDIUM"
  | "HARD"
  | "EXTREME"
  | "INSANE"
  | "IMPOSSIBLE";

export type Game = {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  digitRange: {
    id: string;
    order: number;
    digit: number;
    minRange: number;
    maxRange: number;
    gameId: number;
  }[];
  operationList: Operation[];
};

export type GameInfo = {
  highestCombo: number;
  totalCombo: number;
  totalQuestion: number;
  correct: number;
  incorrect: number;
  score: number;
};

export type GameStatus =
  | "IDLE"
  | "STARTING"
  | "RUNNING"
  | "PAUSED"
  | "RESUMING"
  | "FINISHED";
