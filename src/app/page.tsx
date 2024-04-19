import { actionGetGameWithUserList } from "../actions/game";
import HomeGameList from "../components/home/HomeGameList";
import EmptyList from "../components/ui/empty-list";
import Heading from "../components/ui/heading";

const Page = async () => {
  const { data: gameList } = await actionGetGameWithUserList({
    page: 1,
  });

  if (!gameList?.length) return <EmptyList />;

  return (
    <div className="">
      <main className="mx-auto flex min-h-screen  max-w-3xl flex-col items-start justify-between border-x py-6 ">
        <div className="px-8">
          <Heading>Activity</Heading>
        </div>

        <HomeGameList gameList={gameList} />
      </main>
    </div>
  );
};

export default Page;
