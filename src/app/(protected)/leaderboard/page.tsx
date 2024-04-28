import { actionGetHighScoreList } from "@/src/actions/get";
import HighScoreList from "@/src/components/leaderboard/highscore/HighScoreList";
import Heading from "@/src/components/ui/heading";

const LeaderBoardPage = async () => {
  const { data: highScoreList } = await actionGetHighScoreList({});
  if (!highScoreList) throw new Error("Failed to fetch high score list");

  return (
    <div className="py-8">
      <Heading order="4xl" className="px-4 sm:px-8">
        Leaderboard
      </Heading>
      <Heading
        order="2xl"
        className="px-4 font-medium  text-slate-500 sm:px-8 "
      >
        High Scores
      </Heading>

      <div className="mt-8">
        <HighScoreList highScoreList={highScoreList} />
      </div>
    </div>
  );
};

export default LeaderBoardPage;
