"use client";

import { Perk } from "@prisma/client";
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

type Props = {
  perk: Perk;
};
const ShopItem = ({ perk }: Props) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col items-center justify-between gap-4">
      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="text-5xl">{perk.icon}</p>
        <Text className="mt-4 text-center font-medium">{perk.name}</Text>
        <Text className="text-center text-sm">{perk.description}</Text>
      </div>

      <Drawer onClose={() => setQuantity(1)}>
        <DrawerTrigger className="w-full" asChild>
          <Button size="sm" className="w-full">
            <Icons.coin className="mr-1 size-5" />
            <span className="font-bold">{formatNumber(perk.price)}</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg">
            <DrawerHeader>
              <DrawerTitle>Buy {perk.name}</DrawerTitle>
              <DrawerDescription>{perk.description}</DrawerDescription>
              <p className="mt-4 text-center text-5xl">{perk.icon}</p>

              <div className="flex items-center justify-center">
                <Icons.coin className="mr-1 size-5" />
                <span className="font-medium">
                  {formatNumber(perk.price * quantity)}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-center gap-2">
                <Button
                  onClick={() =>
                    setQuantity(quantity >= 2 ? quantity - 1 : quantity)
                  }
                  variant="outline"
                  className="mr-2"
                >
                  -
                </Button>
                <Text>{formatNumber(quantity)}</Text>
                <Button
                  onClick={() => setQuantity(quantity + 1)}
                  className="ml-2"
                  variant="outline"
                >
                  +
                </Button>
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Buy</Button>
              <DrawerClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ShopItem;
