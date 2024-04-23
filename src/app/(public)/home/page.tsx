import { actionGetGameWithUserList } from "@/src/actions/game";
import HomeGameList from "@/src/components/home/HomeGameList";
import { SiteFooter } from "@/src/components/layout/site-footer";
import EmptyList from "@/src/components/ui/empty-list";
import Heading from "@/src/components/ui/heading";
import Text from "@/src/components/ui/text";
import { siteConfig } from "@/src/lib/config";

const Page = async () => {
  const { data: gameList } = await actionGetGameWithUserList({
    page: 1,
  });

  if (!gameList?.length) return <EmptyList />;

  return (
    <div>
      <div>
        <Heading className="pt-4 text-center" order="5xl">
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
    </div>
  );
};

export default Page;
