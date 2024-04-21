import { HighScore } from "@/src/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import UserProfileSection from "../../user/UserProfileSection";
import { formatNumber } from "@/src/lib/game";
import { Icons } from "../../ui/icons";
import { cn } from "@/src/lib/utils";

type Props = {
  highScoreList: HighScore[];
};
const HighScoreList = ({ highScoreList }: Props) => {
  const topThree = [0, 1, 2];
  return (
    <Table>
      <TableCaption>A list of high scores.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Ranking</TableHead>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {highScoreList.map((highScore, highScoreIndex) => (
          <TableRow key={highScore.user.id}>
            <TableCell>
              <div className="relative w-10">
                {topThree.includes(highScoreIndex) && (
                  <Icons.medal
                    className={cn(
                      "size-10 ",
                      highScoreIndex === 0 && "text-gold-500 ",
                      highScoreIndex === 1 && "text-silver-500",
                      highScoreIndex === 2 && "text-bronze-500"
                    )}
                  />
                )}
                <span
                  className={cn(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xl font-medium",
                    topThree.includes(highScoreIndex) && "font-extrabold",
                    highScoreIndex === 0 && "text-gold-900 dark:text-gold-500 ",
                    highScoreIndex === 1 &&
                      "text-silver-900 dark:text-silver-500",
                    highScoreIndex === 2 &&
                      "text-bronze-900 dark:text-bronze-500"
                  )}
                >
                  {highScoreIndex + 1}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <UserProfileSection user={highScore.user} />
            </TableCell>
            <TableCell className="text-right text-lg">
              {formatNumber(highScore.score)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HighScoreList;
