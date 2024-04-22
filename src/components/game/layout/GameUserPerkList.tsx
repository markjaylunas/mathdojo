import { PlayerInfo } from "@/src/lib/types";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { Avatar } from "../../ui/avatar";
import { Button } from "../../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import { Icons } from "../../ui/icons";

type Props = {
  userPerkList: PlayerInfo["userPerkList"];
  disabled?: boolean;
};

const GameUserPerkList = ({ userPerkList, disabled }: Props) => {
  return (
    <Drawer>
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

          <DrawerFooter>{/* show all perks */}</DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GameUserPerkList;
