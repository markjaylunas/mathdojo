import { getGameMode } from "@/data/get";
import { actionGetPlayerInfo } from "@/src/actions/get";
import ClassicGame from "@/src/components/game/classic-game/ClassicGame";
import { auth } from "@/src/lib/auth";
import { notFound } from "next/navigation";

const ClassicPage = async () => {
  const session = await auth();
  if (!session) notFound();

  const gameModePromise = getGameMode({ title: "Mathwars" });
  const playerInfoPromise = actionGetPlayerInfo({
    userId: `${session.user.id}`,
  });

  const [gameMode, playerInfo] = await Promise.all([
    gameModePromise,
    playerInfoPromise,
  ]);

  const playerInfoData = playerInfo.data;
  if (!session || !gameMode || !playerInfoData) notFound();

  return (
    <div className="flex min-h-[calc(100vh-7.2rem)] flex-col px-8 py-4 sm:p-8 ">
      <ClassicGame gameMode={gameMode} playerInfo={playerInfoData} />
    </div>
  );
};

export default ClassicPage;
