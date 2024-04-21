import { Perk } from "@prisma/client";
import { Card } from "../ui/card";
import ShopItem from "./ShopItem";

type Props = {
  perkList: Perk[];
};
const ShopList = ({ perkList }: Props) => {
  return (
    <Card className="mt-4 grid grid-cols-1 gap-8  p-4 py-8 sm:grid-cols-2 md:grid-cols-3">
      {perkList.map((perk) => (
        <ShopItem key={perk.id} perk={perk} />
      ))}
    </Card>
  );
};

export default ShopList;
