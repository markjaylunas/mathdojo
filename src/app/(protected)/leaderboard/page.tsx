import { actionGetHighScoreList } from "@/src/actions/get";
import HighScoreList from "@/src/components/leaderboard/highscore/HighScoreList";
import Heading from "@/src/components/ui/heading";

const LeaderBoardPage = async () => {
  const { data: highScoreList } = await actionGetHighScoreList({});
  if (!highScoreList) throw new Error("Failed to fetch high score list");

  return (
    <div className="py-8">
      <Heading>Leaderboard</Heading>
      <HighScoreList highScoreList={highScoreList} />
    </div>
  );
};

export default LeaderBoardPage;
