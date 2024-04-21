import { Perk } from "@prisma/client";
import Text from "../ui/text";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

type Props = {
  perk: Perk;
};
const ShopItem = ({ perk }: Props) => {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="text-5xl">{perk.icon}</p>
        <Text className="text-center font-medium">{perk.name}</Text>
        <Text className="text-center text-sm">{perk.description}</Text>
      </div>
      <Button size="sm" className="w-full">
        <Icons.coin className="mr-1 size-5" />
        {perk.price}
      </Button>
    </div>
  );
};

export default ShopItem;
