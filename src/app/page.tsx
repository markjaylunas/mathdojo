import { actionGetGameWithUserList } from "../actions/game";
import HomeGameList from "../components/home/HomeGameList";
import { SiteFooter } from "../components/layout/site-footer";
import EmptyList from "../components/ui/empty-list";
import Heading from "../components/ui/heading";
import { Separator } from "../components/ui/separator";
import Text from "../components/ui/text";
import { siteConfig } from "../lib/config";

const Page = async () => {
  const { data: gameList } = await actionGetGameWithUserList({
    page: 1,
  });

  if (!gameList?.length) return <EmptyList />;

  return (
    <div className="">
      <main className="mx-auto flex min-h-screen  max-w-3xl flex-col items-start justify-between border-x py-6 ">
        <div className="w-full px-8">
          <Heading className="text-center" order="5xl">
            mathwars
          </Heading>

          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            built by{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              makje
            </a>
            .
          </p>
        </div>

        <Text className="mt-4 px-4 text-2xl font-semibold">Activities</Text>

        <HomeGameList gameList={gameList} />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Page;
