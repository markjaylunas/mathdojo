import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Game, GameInfo, GameStatus, Problem } from "../lib/types";
import { GameTimerState } from "../hooks/use-game-timer";
import { GAME_SESSION_STORE_INITIAL_STATE } from "../lib/game.config";

export type GameSession = {
  gameSetting: Game | null;
  status: GameStatus;
  problemList: Problem[] | null;
  problem: Problem | null;
  level: number;
  combo: number;
  gameInfo: GameInfo;
  timer: GameTimerState;
};

export type UseGameSessionState = {
  gameSession: GameSession;
};

export type UseGameSessionActions = {
  setGameSession: (gameSession: GameSession) => void;
  resetGameSession: () => void;
};

const useGameSessionStore = create<
  UseGameSessionState & UseGameSessionActions
>()(
  persist(
    (set) => ({
      gameSession: GAME_SESSION_STORE_INITIAL_STATE,
      setGameSession: (gameSession) => set({ gameSession }),
      resetGameSession: () =>
        set({ gameSession: GAME_SESSION_STORE_INITIAL_STATE }),
    }),
    {
      name: "game-session",
      skipHydration: true,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useGameSessionStore;
