import { Card } from "../../ui/card";

type Props = {
  children: React.ReactNode;
};
const GameLayout = ({ children }: Props) => {
  return (
    <Card className="sm:min-h-[calc(80vh-70px) flex min-h-[calc(85vh)] flex-col p-3">
      {children}
    </Card>
  );
};

export default GameLayout;
