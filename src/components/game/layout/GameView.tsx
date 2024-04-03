import { Problem } from "@/src/lib/types";

type Props = {
  problem: Problem;
};
const GameView = ({ problem }: Props) => {
  console.log(problem);
  return <div>GameView Component {problem.answer}</div>;
};

export default GameView;
