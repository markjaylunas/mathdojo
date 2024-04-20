import { Card } from "../../ui/card";

type Props = {
  children: React.ReactNode;
};
const GameLayout = ({ children }: Props) => {
  return (
    <Card className="sm:border-1 mx-auto flex w-full max-w-3xl  flex-1 select-none flex-col justify-between border-hidden p-0 shadow-none sm:border-solid sm:p-3 sm:shadow">
      {children}
    </Card>
  );
};

export default GameLayout;
