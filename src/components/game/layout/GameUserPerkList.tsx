"use client";

import { PlayerInfo } from "@/src/lib/types";
import { ScrollArea } from "../../ui/scroll-area";
import { Button } from "../../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import { Icons } from "../../ui/icons";
import { useState } from "react";
import Text from "../../ui/text";
import { useStore } from "zustand";
import useGameSessionStore from "@/src/store/useGameSessionStore";
import { PerkType } from "@prisma/client";
import { actionUsePerk } from "@/src/actions/update";
import { PERK_SOON } from "@/src/lib/game.config";

type Props = {
  userPerkList: PlayerInfo["userPerkList"];
  disabled?: boolean;
};

const GameUserPerkList = ({
  userPerkList: initialUerPerkList,
  disabled,
}: Props) => {
  const [userPerkList, setUserPerkList] = useState(initialUerPerkList);
  const {
    applyPerk,
    gameSession: { activePerkList },
  } = useStore(useGameSessionStore, (state) => state);

  const [open, setOpen] = useState(false);

  const handeUsePerk = async (userPerkId: string, perkType: PerkType) => {
    setOpen(false);
    const appliable = !activePerkList.includes(perkType);
    if (!appliable) return;

    try {
      const { status } = await actionUsePerk({ userPerkId });
      if (status === "error") return;
      applyPerk(perkType);
      setUserPerkList((prev) =>
        prev.map((userPerk) => {
          if (userPerk.id === userPerkId) {
            return { ...userPerk, quantity: userPerk.quantity - 1 };
          }
          return userPerk;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="font-bold"
          disabled={disabled}
        >
          <Icons.bolt className="w-full" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Perks</DrawerTitle>
          </DrawerHeader>

          <ScrollArea className="max-h-xs">
            <div className="mx-auto mb-4 grid w-fit  grid-cols-3 gap-2 p-4 md:grid-cols-4">
              {userPerkList.map((userPerk) => (
                <div key={userPerk.id} className="relative">
                  <Button
                    variant="outline"
                    className="size-20 "
                    onClick={() =>
                      handeUsePerk(userPerk.id, userPerk.perk.type)
                    }
                    disabled={
                      userPerk.quantity <= 0 ||
                      PERK_SOON.includes(userPerk.perk.type) ||
                      activePerkList.includes(userPerk.perk.type)
                    }
                  >
                    <div className="flex flex-col">
                      <p className="text-xl">{userPerk.perk.icon} </p>
                      <Text className="text-xs">{userPerk.perk.name}</Text>
                    </div>
                  </Button>
                  <div className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full border  bg-secondary p-2 ">
                    <p className="text-center text-xs">{userPerk.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GameUserPerkList;
