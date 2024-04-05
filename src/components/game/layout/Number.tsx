import Text from "../../ui/text";

type Props = {
  children: React.ReactNode;
};
const Number = ({ children }: Props) => {
  return <Text className="text-right text-5xl font-bold">{children}</Text>;
};

export default Number;
