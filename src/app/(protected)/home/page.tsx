import { actionGetGameWithUserList } from "@/src/actions/game";
import HomeGameList from "@/src/components/home/HomeGameList";
import SearchUser from "@/src/components/home/search-user/SearchUser";
import EmptyList from "@/src/components/ui/empty-list";
import Heading from "@/src/components/ui/heading";
import { auth } from "@/src/lib/auth";
import { siteConfig } from "@/src/lib/config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

const Page = async ({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await auth();
  const userId = `${session?.user.id}`;
  const tab = searchParams?.tab ? `${searchParams?.tab}` : "global";

  const globalGameListPromise = actionGetGameWithUserList({
    page: 1,
    limit: 5,
    isGlobal: true,
    userId,
  });

  const followingGameListPromise = actionGetGameWithUserList({
    page: 1,
    limit: 5,
    isGlobal: false,
    userId,
  });

  const [globalGameListData, followingGameListData] = await Promise.all([
    globalGameListPromise,
    followingGameListPromise,
  ]);

  const globalGameList = globalGameListData?.data;
  const followingGameList = followingGameListData?.data;

  return (
    <div>
      <div>
        <Heading className="pt-4 text-center" order="3xl">
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

      <Tabs defaultValue={tab} className="mt-4">
        <div className="mx-4 flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <SearchUser />
        </div>
        <TabsContent value="global">
          {globalGameList ? (
            <HomeGameList
              gameList={globalGameList}
              isGlobal={true}
              userId={userId}
            />
          ) : (
            <EmptyList />
          )}
        </TabsContent>
        <TabsContent value="following">
          {globalGameList ? (
            <HomeGameList
              gameList={followingGameList}
              isGlobal={false}
              userId={userId}
            />
          ) : (
            <EmptyList />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
