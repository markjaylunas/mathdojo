"use client";

import { useEffect, useState } from "react";
import { useInViewport } from "@mantine/hooks";
import { actionGetGameWithUserList } from "@/src/actions/game";
import HomeGameCard from "./HomeGameCard";
import HomeGameCardSkeleton from "./HomeGameCardSkeleton";
import { toast } from "../ui/use-toast";
import { GameWithUser } from "@/src/lib/types";

type Props = {
  gameList: GameWithUser[];
};

const HomeGameList = ({ gameList: initialGameList }: Props) => {
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
        return <HomeGameCard game={game} key={game.id} />;
      })}

      {loading && <HomeGameCardSkeleton />}
      {!noMoreGame && <div ref={inViewRef} />}
    </div>
  );
};

export default HomeGameList;
