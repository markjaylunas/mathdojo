import { Prisma } from "@prisma/client";

export const perkSeedList: Prisma.PerkCreateInput[] = [
  {
    name: "Show Answer",
    description: "Reveals the correct answer for 30 seconds",
    type: "SHOW_ANSWER",
    icon: "👁️",
    price: 350,
  },
  {
    name: "Remove Two Wrong Answer",
    description: "Removes two incorrect options from the current problem",
    type: "REMOVE_TWO_WRONG_ANSWER",
    icon: "❌",
    price: 150,
  },
  {
    name: "New Problem",
    description: "Replaces the current problem with a new one",
    type: "NEW_PROBLEM",
    icon: "🔄",
    price: 50,
  },
  {
    name: "Extra Time",
    description: "Adds extra 1 minute time to the timer",
    type: "EXTRA_TIME",
    icon: "⏱️",
    price: 60,
  },
  {
    name: "Add Max Time",
    description: "Adds 1 minute to max time of the timer",
    type: "ADD_MAX_TIME",
    icon: "⏳",
    price: 120,
  },
  {
    name: "Double Score",
    description: "Doubles the score earned for a minute",
    type: "DOUBLE_SCORE",
    icon: "💯",
    price: 270,
  },
  {
    name: "Double Coin",
    description: "Doubles coins earned for a minute",
    type: "DOUBLE_COIN",
    icon: "💰",
    price: 30,
  },
];
