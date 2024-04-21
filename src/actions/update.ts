"use server";

import { buyPerk } from "@/data/update";
import { ActionResponse } from "../lib/types";
import { revalidatePath } from "next/cache";
import { routesConfig } from "../lib/config";

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
