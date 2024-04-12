import ClassicGame from "@/src/components/game/classic-game/ClassicGame";
import { gameSetting } from "@/src/lib/game.config";

const ClassicPage = () => {
  return <ClassicGame gameSetting={gameSetting} />;
};

export default ClassicPage;
