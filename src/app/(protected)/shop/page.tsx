import { actionGetShopOnLoad } from "@/src/actions/get";
import ShopList from "@/src/components/shop/ShopList";
import Heading from "@/src/components/ui/heading";
import { Icons } from "@/src/components/ui/icons";
import Text from "@/src/components/ui/text";
import { auth } from "@/src/lib/auth";
import { formatNumber } from "@/src/lib/game";

const ShopPage = async () => {
  const session = await auth();
  const { data, message } = await actionGetShopOnLoad({
    userId: session?.user.id || "",
  });
  if (!data) throw new Error(message);

  return (
    <div className="py-8">
      <div className="flex items-center justify-between">
        <Heading>Shop</Heading>
        <div className="flex items-center">
          <Icons.coin className="mr-2 size-6" />
          <Text>{formatNumber(data.userCoin)}</Text>
        </div>
      </div>

      <ShopList perkList={data.perkList} userPerkList={data.userPerkList} />
    </div>
  );
};

export default ShopPage;
