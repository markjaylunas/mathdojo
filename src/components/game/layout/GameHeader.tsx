import { Score } from "@/src/lib/types";
import Text from "../../ui/text";
import Heading from "../../ui/heading";

type Props = {
  label?: string;
  children: React.ReactNode;
};
const GameHeader = ({ children, label }: Props) => {
  return <div className="flex flex-col">{children}</div>;
};

export default GameHeader;
