"use client";

import { Perk, UserPerk } from "@prisma/client";
import Text from "../ui/text";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useState } from "react";
import { formatNumber } from "@/src/lib/game";
import { actionBuyPerk } from "@/src/actions/update";
import useUserStore from "@/src/store/useUserStore";
import { toast } from "../ui/use-toast";
import SubmitButton from "../ui/submit-button";
import { cn } from "@/src/lib/utils";
import { PERK_SOON } from "@/src/lib/game.config";

type Props = {
  perk: Perk;
  userPerk: UserPerk | undefined;
  userCoin: number;
};
const ShopItem = ({ perk, userPerk, userCoin }: Props) => {
  const user = useUserStore((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const [loading, setIsLoading] = useState(false);

  const handleBuy = async () => {
    try {
      setIsLoading(true);
      if (quantity <= 0) return;
      if (!user) return;
      const message = await actionBuyPerk({
        userId: user?.id,
        perkId: perk.id,
        quantity,
      });

      if (message) {
        toast({
          description: message.message,
        });
        setQuantity(1);
      }
    } catch (error) {
      console.error(error);
      toast({
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isSoon = PERK_SOON.includes(perk.type);

  return (
    <div className="flex flex-col items-center justify-between gap-4">
      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="text-5xl">{perk.icon}</p>
        <Text className="mt-4 text-center font-medium">{perk.name}</Text>
        <Text className="text-center text-sm">{perk.description}</Text>
      </div>

      <Drawer onClose={() => setQuantity(1)}>
        <DrawerTrigger className="w-full" asChild>
          <Button
            size="sm"
            className="relative w-full"
            disabled={loading || isSoon}
          >
            {isSoon && (
              <span className="absolute right-0 top-0 rounded-bl bg-accent px-1 text-xs text-white">
                Avalable soon
              </span>
            )}
            <Icons.coin className="mr-1 size-5" />
            <span className="font-bold">
              {userPerk ? formatNumber(perk.price) : "Free"}
            </span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg">
            <DrawerHeader>
              <div className="flex items-center justify-between">
                <DrawerTitle>Buy {perk.name}</DrawerTitle>
                <Text>
                  Owned:{" "}
                  <span className="font-medium">{userPerk?.quantity || 0}</span>
                </Text>
              </div>

              <DrawerDescription>{perk.description}</DrawerDescription>
              <p className="mt-4 text-center text-5xl">{perk.icon}</p>

              <div className="flex items-center justify-center">
                <Icons.coin className="mr-1 size-5" />
                <span
                  className={cn(
                    "font-medium",
                    perk.price * quantity > userCoin && "text-destructive"
                  )}
                >
                  {userPerk ? formatNumber(perk.price * quantity) : "Free"}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-center gap-2">
                <Button
                  onClick={() =>
                    setQuantity(quantity >= 2 ? quantity - 1 : quantity)
                  }
                  variant="outline"
                  className="mr-2"
                  disabled={loading || !userPerk}
                >
                  -
                </Button>
                <Text>{formatNumber(quantity)}</Text>
                <Button
                  onClick={() => setQuantity(quantity + 1)}
                  className="ml-2"
                  variant="outline"
                  disabled={loading || !userPerk}
                >
                  +
                </Button>
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <SubmitButton
                onClick={handleBuy}
                disabled={perk.price * quantity > userCoin}
                loading={loading}
              >
                Buy
              </SubmitButton>
              <DrawerClose asChild>
                <Button variant="secondary" disabled={loading}>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ShopItem;
