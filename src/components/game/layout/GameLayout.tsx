import { Card } from "../../ui/card";

type Props = {
  children: React.ReactNode;
};
const GameLayout = ({ children }: Props) => {
  return (
    <Card className="sm:min-h-[calc(80vh-70px) sm:border-1 mx-auto flex min-h-[calc(85vh)] max-w-[500px] flex-col justify-between border-hidden p-0 shadow-none sm:border-solid sm:p-3 sm:shadow">
      {children}
    </Card>
  );
};

export default GameLayout;
