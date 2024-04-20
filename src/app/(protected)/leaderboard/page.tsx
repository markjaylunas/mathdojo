import { actionGetHighScoreList } from "@/src/actions/get";

const LeaderBoardPage = async () => {
  const { data: highScoreList } = await actionGetHighScoreList({});
  console.log({ highScoreList });
  return <div>LeaderBoard Page</div>;
};

export default LeaderBoardPage;
