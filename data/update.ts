import prisma from "@lib/prisma";
import { Perk, Prisma, User, UserPerk } from "@prisma/client";

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

  const existingBuyerPerk = await prisma.userPerk.findFirst({
    where: {
      userId: userId,
      perkId: perkId,
    },
  });

  const totalPrice = existingBuyerPerk ? perkToBuy.price * quantity : 0;
  if (buyer.coin < totalPrice) throw new Error("Not enough coin");

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

  if (existingBuyerPerk) {
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
  }

  return "Perk bought successfully";
};

export const updateUsePerk = async (params: {
  userPerkId: UserPerk["id"];
}): Promise<boolean> => {
  const udpatedUserPerk = await prisma.userPerk.update({
    data: {
      quantity: {
        decrement: 1,
      },
    },
    where: {
      id: params.userPerkId,
    },
  });

  return Boolean(udpatedUserPerk);
};

export const editProfile = async (
  params: Prisma.UserUpdateInput
): Promise<User> => {
  const editProfileCost = 1_800;
  const { id, coin, ...userWithoutId } = params;
  if (!id) throw new Error("id is required");

  const user = await prisma.user.findUnique({
    where: {
      id: `${id}`,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.coin < editProfileCost) {
    throw new Error("User's coin is not enough");
  }

  await prisma.user.update({
    data: {
      coin: {
        decrement: editProfileCost,
      },
      ...userWithoutId,
    },
    where: {
      id: `${id}`,
    },
  });
  return user;
};
