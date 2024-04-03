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

export type Problem = {
  id: string;
  game_id: string;
  numberList: number[];
  operation: Operation;
  operationSymbol: OperationSymbol;
  answer: number;
  userAnswer: number | null;
  choices: number[];
  status: "correct" | "incorrect" | "unanswered";
};

export type Operation =
  | "ADDITION"
  | "SUBTRACTION"
  | "MULTIPLICATION"
  | "DIVISION";

export type OperationSymbol = "+" | "-" | "x" | "÷";

export type Difficulty =
  | "easy"
  | "medium"
  | "hard"
  | "expert"
  | "insane"
  | "impossible"
  | "godlike";

export type Game = {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  digit_range: {
    id: string;
    order: number;
    digit: number;
    minRange: number;
    maxRange: number;
    game_id: number;
  }[];
  operation: Operation;
  operationSymbol: OperationSymbol;
};

export type Score = {
  correct: number;
  incorrect: number;
};
