type Props = {
  label?: string;
  children: React.ReactNode;
};
const GameHeader = ({ children, label }: Props) => {
  return <div className="relative flex flex-col gap-2">{children}</div>;
};

export default GameHeader;
