import { Icons } from "@components/ui/icons";
import {
  Follower,
  Game,
  Perk,
  Prisma,
  GameDigitRange as Prisma__GameDigitRangeClient,
  GameMode as Prisma__GameMode,
  GameOperation as Prisma__GameOperation,
  Rating,
  User,
  UserPerk,
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
  coin: number;
  status: "CORRECT" | "WRONG" | "UNANSWERED";
  lapTime: number | null;
};

export type OperationName =
  | "ADDITION"
  | "SUBTRACTION"
  | "MULTIPLICATION"
  | "DIVISION";

export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "EXPERT" | "CUSTOM";

export type GameInfo = {
  id: string;
  score: number;
  correct: number;
  wrong: number;
  totalAnswered: number;
  highestCombo: number;
  gameTime: number;
  level: number;
  rating: Rating;
  coin: number;
};

export type GameOperation = Prisma__GameOperation & {
  digitRange: Prisma__GameDigitRangeClient[];
};

export type GameMode = Prisma__GameMode & {
  gameOperations: GameOperation[];
};

export type GameWithUser = Game & {
  user: BasicUser;
};

export type PlayerInfo = {
  highestScore: number;
  userPerkList: UserPerkWithPerk[];
};

export type UserPerkWithPerk = {
  id: UserPerk["id"];
  quantity: UserPerk["quantity"];
  perk: {
    id: Perk["id"];
    name: Perk["name"];
    description: Perk["description"];
    icon: Perk["icon"];
    type: Perk["type"];
  };
};

export type HighScore = {
  score: Game["score"];
  user: BasicUser;
};

export type UserProfile = {
  user: BasicUser;
  games: number;
  followings: number;
  followers: number;
  followUser: Follower | null;
};

export type BasicUser = {
  id: User["id"];
  name: User["name"];
  username: User["username"];
  email: User["email"];
  image: User["image"];
};

export type ShopOnLoad = {
  perkList: Perk[];
  userPerkList: UserPerk[];
  userCoin: User["coin"];
};

export type FollowAction = "FOLLOW" | "UNFOLLOW";

export type GetGameWithUserListParams = {
  include?: Prisma.GameInclude;
  page?: number;
  limit?: number;
  isGlobal?: boolean;
  userId?: User["id"];
};
