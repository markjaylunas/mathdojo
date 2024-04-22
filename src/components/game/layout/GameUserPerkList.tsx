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

type Props = {
  userPerkList: PlayerInfo["userPerkList"];
  disabled?: boolean;
};

const GameUserPerkList = ({ userPerkList, disabled }: Props) => {
  const [open, setOpen] = useState(false);
  const handeUsePerk = (perkId: string) => {
    setOpen(false);
    console.log(perkId);
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
                <Button
                  variant="outline"
                  className="size-20 bg-gray-200 dark:bg-gray-600"
                  onClick={() => handeUsePerk(userPerk.id)}
                  key={userPerk.id}
                >
                  <div className="flex flex-col">
                    <p className="text-xl">{userPerk.perk.icon} </p>
                    <Text className="text-xs">{userPerk.perk.name}</Text>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GameUserPerkList;
