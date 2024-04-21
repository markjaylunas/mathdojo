import { actionGetPerkList } from "@/src/actions/get";
import ShopList from "@/src/components/shop/ShopList";
import Heading from "@/src/components/ui/heading";

const ShopPage = async () => {
  const { data: perkList, message } = await actionGetPerkList({});
  if (!perkList) throw new Error(message);

  return (
    <div className="py-8">
      <Heading>Shop</Heading>

      <ShopList perkList={perkList} />
    </div>
  );
};

export default ShopPage;
