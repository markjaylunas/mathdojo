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

type Props = {
  highScoreList: HighScore[];
};
const HighScoreList = ({ highScoreList }: Props) => {
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
            <TableCell className="font-medium">{highScoreIndex + 1}</TableCell>
            <TableCell>{highScore.user.username}</TableCell>
            <TableCell className="text-right">{highScore.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HighScoreList;
