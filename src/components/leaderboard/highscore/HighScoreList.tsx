"use client";

import { Button } from "@components/ui/button";

import { actionGetHighScoreList } from "@/src/actions/get";
import { formatNumber } from "@/src/lib/game";
import { HighScore } from "@/src/lib/types";
import { cn } from "@/src/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { CalendarIcon } from "@radix-ui/react-icons";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import EmptyList from "../../ui/empty-list";
import { Icons } from "../../ui/icons";
import UserProfileSection from "../../user/UserProfileSection";

type Props = {
  highScoreList: HighScore[];
};
const HighScoreList = ({ highScoreList: initialHighScoreList }: Props) => {
  const topThree = [0, 1, 2];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const month = Number(searchParams.get("month"));
  const year = Number(searchParams.get("year"));

  const [highScoreList, setHighScoreList] =
    useState<HighScore[]>(initialHighScoreList);

  const handleMonthChange = async (direction: "next" | "previous") => {
    let newMonth;
    let newYear;

    if (direction === "next") {
      if (month === 12) {
        newMonth = 1;
        newYear = year + 1;
      } else {
        newMonth = month + 1;
        newYear = year;
      }
    } else if (direction === "previous") {
      if (month === 1) {
        newMonth = 12;
        newYear = year - 1;
      } else {
        newMonth = month - 1;
        newYear = year;
      }
    }

    router.push(`${pathname}?month=${newMonth}&year=${newYear}`);

    const { data: highScoreList } = await actionGetHighScoreList({
      month: Number(newMonth),
      year: Number(newYear),
    });

    setHighScoreList(highScoreList || []);
  };

  return (
    <section>
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className={cn(!month || (!year && "text-muted-foreground"))}
          onClick={() => handleMonthChange("previous")}
        >
          <IconChevronLeft className="size-4" />
        </Button>
        <p className="flex items-center">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {`${new Date(0, month - 1).toLocaleString("default", { month: "long" })} ${year}`}
        </p>
        <Button
          variant="outline"
          size="icon"
          className={cn(!month || (!year && "text-muted-foreground"))}
          onClick={() => handleMonthChange("next")}
          disabled={
            month === new Date().getMonth() + 1 &&
            year === new Date().getFullYear()
          }
        >
          <IconChevronRight className="size-4" />
        </Button>
      </div>

      <Table className="mt-4">
        <TableCaption>A list of high scores.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px] md:w-[100px]">Ranking</TableHead>
            <TableHead>Player</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="min-h-[400px]">
          {highScoreList.map((highScore, highScoreIndex) => (
            <TableRow key={highScore.id}>
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
                      highScoreIndex === 0 &&
                        "text-gold-900 dark:text-gold-500 ",
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
    </section>
  );
};

export default HighScoreList;
