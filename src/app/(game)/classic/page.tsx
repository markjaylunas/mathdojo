import { getGameMode } from "@/data/get";
import ClassicGame from "@/src/components/game/classic-game/ClassicGame";
import { notFound } from "next/navigation";

const ClassicPage = async () => {
  const gameMode = await getGameMode({ title: "Mathwars" });

  if (!gameMode) {
    notFound();
  }

  return (
    <div className="flex min-h-[calc(100vh-7.2rem)] flex-col p-8">
      <ClassicGame gameMode={gameMode} />
    </div>
  );
};

export default ClassicPage;
