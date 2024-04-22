import { PlayerInfo } from "@/src/lib/types";

type Props = {
  userPerkList: PlayerInfo["userPerkList"];
};

const GameUserPerkList = ({ userPerkList }: Props) => {
  return <div>GameUserPerkList Component</div>;
};

export default GameUserPerkList;
