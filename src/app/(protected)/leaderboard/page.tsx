import { actionGetHighScoreList } from "@/src/actions/get";
import HighScoreList from "@/src/components/leaderboard/highscore/HighScoreList";
import Heading from "@/src/components/ui/heading";

const LeaderBoardPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const month = searchParams?.mopnth || new Date().getMonth() + 1;
  const year = searchParams?.year || new Date().getFullYear();

  const { data: highScoreList } = await actionGetHighScoreList({
    month: Number(month),
    year: Number(year),
  });
  if (!highScoreList) throw new Error("Failed to fetch high score list");

  return (
    <div className="py-8">
      <Heading order="4xl" className="px-8">
        Leaderboard
      </Heading>
      <Heading order="2xl" className="px-8  font-medium text-slate-500">
        High Scores
      </Heading>

      <div className="mt-4">
        <HighScoreList highScoreList={highScoreList} />
      </div>
    </div>
  );
};

export default LeaderBoardPage;
