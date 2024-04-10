type Props = {
  label?: string;
  children: React.ReactNode;
};
const GameHeader = ({ children, label }: Props) => {
  return <div className="relative flex flex-col">{children}</div>;
};

export default GameHeader;
