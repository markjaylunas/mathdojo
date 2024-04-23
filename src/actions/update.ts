"use server";

import { buyPerk, updateUsePerk } from "@/data/update";
import { ActionResponse } from "../lib/types";
import { revalidatePath } from "next/cache";
import { routesConfig } from "../lib/config";
import { User } from "next-auth";
import { UserPerk } from "@prisma/client";

// buy perk
export const actionBuyPerk = async (params: {
  userId: string;
  perkId: string;
  quantity: number;
}): Promise<ActionResponse> => {
  const message = await buyPerk(params);

  if (!message) {
    return { status: "error", message: "Failed to buy perk" };
  }

  revalidatePath("/shop");
  return {
    status: "success",
    message: "Bought perk successfully",
  };
};

// use perk
export const actionUsePerk = async (params: {
  userPerkId: UserPerk["id"];
}): Promise<ActionResponse> => {
  const updated = await updateUsePerk(params);

  if (!updated) {
    return { status: "error", message: "Failed to use perk" };
  }

  revalidatePath("/classic");
  return {
    status: "success",
    message: "Used perk successfully",
  };
};
