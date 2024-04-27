"use client";

import { actionGetGameWithUserList } from "@/src/actions/game";
import { actionLikeGame, actionUnlikeGame } from "@/src/actions/update";
import { GameWithUser } from "@/src/lib/types";
import { useInViewport } from "@mantine/hooks";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import HomeGameCard from "./HomeGameCard";
import HomeGameCardSkeleton from "./HomeGameCardSkeleton";

type Props = {
  gameList: GameWithUser[];
  userId: User["id"];
  isGlobal?: boolean;
};

const HomeGameList = ({
  gameList: initialGameList,
  isGlobal,
  userId,
}: Props) => {
  const [gameList, setGameList] = useState<GameWithUser[]>(initialGameList);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noMoreGame, setNoMoreGame] = useState(false);
  const { ref: inViewRef, inViewport } = useInViewport();

  const handleFetchMoreGame = async () => {
    if (noMoreGame) return;
    try {
      setLoading(true);
      const newPage = page + 1;

      const {
        data: newGameList,
        status,
        message,
      } = await actionGetGameWithUserList({
        page: newPage,
        userId,
        isGlobal,
      });

      if (status === "error") {
        throw new Error(message);
      }

      if (newGameList?.length === 0 && status === "success") {
        setNoMoreGame(true);
        return;
      }

      if (!newGameList) return;

      setGameList((currentGameList) => [...currentGameList, ...newGameList]);
      setPage(newPage);
    } catch (error) {
      console.error(error);

      toast({
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inViewport) {
      handleFetchMoreGame();
    }
  }, [inViewport]);

  return (
    <div className="flex w-full flex-col">
      {gameList.map((game) => {
        return (
          <HomeGameCard
            game={game}
            key={isGlobal ? `global-${game.id}` : `following-${game.id}`}
            setGameList={setGameList}
            userId={userId}
          />
        );
      })}

      {loading && <HomeGameCardSkeleton />}
      {!noMoreGame && <div ref={inViewRef} />}
    </div>
  );
};

export default HomeGameList;
