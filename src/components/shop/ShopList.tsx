import { Perk, UserPerk } from "@prisma/client";
import { Card } from "../ui/card";
import ShopItem from "./ShopItem";

type Props = {
  perkList: Perk[];
  userPerkList: UserPerk[];
};
const ShopList = ({ perkList, userPerkList }: Props) => {
  return (
    <Card className="mt-4 grid grid-cols-1 gap-8  p-4 py-8 sm:grid-cols-2 md:grid-cols-3">
      {perkList.map((perk) => {
        const userPerk = userPerkList.find(
          (userPerk) => userPerk.perkId === perk.id
        );
        return <ShopItem key={perk.id} perk={perk} userPerk={userPerk} />;
      })}
    </Card>
  );
};

export default ShopList;
