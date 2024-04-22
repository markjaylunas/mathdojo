import { Perk, UserPerk } from "@prisma/client";
import { Card } from "../ui/card";
import ShopItem from "./ShopItem";
import { ShopOnLoad } from "@/src/lib/types";

type Props = {
  shopOnLoad: ShopOnLoad;
};
const ShopList = ({
  shopOnLoad: { perkList, userPerkList, userCoin },
}: Props) => {
  return (
    <Card className="mt-4 grid grid-cols-1 gap-8  p-4 py-8 sm:grid-cols-2 md:grid-cols-3">
      {perkList.map((perk) => {
        const userPerk = userPerkList.find(
          (userPerk) => userPerk.perkId === perk.id
        );
        return (
          <ShopItem
            key={perk.id}
            perk={perk}
            userPerk={userPerk}
            userCoin={userCoin}
          />
        );
      })}
    </Card>
  );
};

export default ShopList;
