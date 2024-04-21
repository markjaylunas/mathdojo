import { Perk, Prisma, User } from "@prisma/client";
import prisma from "@lib/prisma";

export const updateUser = async (
  params: Prisma.UserUpdateInput
): Promise<User> => {
  const { id, ...userWithoutId } = params;
  if (!id) throw new Error("id is required");

  const user = await prisma.user.update({
    data: userWithoutId,
    where: {
      id: `${id}`,
    },
  });
  return user;
};

export const buyPerk = async (params: {
  userId: User["id"];
  perkId: Perk["id"];
  quantity: number;
}): Promise<string> => {
  const { userId, perkId, quantity } = params;

  const perkToBuy = await prisma.perk.findUnique({
    where: {
      id: perkId,
    },
  });
  if (!perkToBuy) throw new Error("Perk not found");

  const buyer = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!buyer) throw new Error("User not found");

  const totalPrice = perkToBuy.price * quantity;
  if (buyer.coin < totalPrice) throw new Error("Not enough coin");

  const existingBuyerPerk = await prisma.userPerk.findFirst({
    where: {
      userId: userId,
      perkId: perkId,
    },
  });

  if (existingBuyerPerk) {
    const updatedBuyerPerk = await prisma.userPerk.update({
      where: {
        id: existingBuyerPerk.id,
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
    if (!updatedBuyerPerk) throw new Error("Failed to update user perk");
  } else {
    const createdBuyerPerk = await prisma.userPerk.create({
      data: {
        userId: userId,
        perkId: perkId,
        quantity: quantity,
      },
    });
    if (!createdBuyerPerk) throw new Error("Failed to create user perk");
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      coin: {
        decrement: existingBuyerPerk ? totalPrice : 0,
      },
    },
  });

  return "Perk bought successfully";
};
