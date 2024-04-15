import ClassicGame from "@/src/components/game/classic-game/ClassicGame";
import { gameSetting } from "@/src/lib/game.config";

const ClassicPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-3.6rem)] flex-col p-8">
      <ClassicGame gameSetting={gameSetting} />
    </div>
  );
};

export default ClassicPage;
