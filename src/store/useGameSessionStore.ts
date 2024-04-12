import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GameSetting, GameInfo, GameStatus, Problem } from "../lib/types";
import { GameTimerState } from "../hooks/use-game-timer";
import { GAME_SESSION_STORE_INITIAL_STATE } from "../lib/game.config";

export type GameSession = {
  gameSetting: GameSetting | null;
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
  initialGameSetting: GameSetting | null;
};

export type UseGameSessionActions = {
  setGameSession: (gameSession: GameSession) => void;
  setInitialGameSetting: (gameSetting: GameSetting) => void;
  resetGameSession: () => void;
  clearGameSession: () => void;
  resetInitialGameSetting: () => void;
};

const useGameSessionStore = create<
  UseGameSessionState & UseGameSessionActions
>()(
  persist(
    (set) => ({
      gameSession: GAME_SESSION_STORE_INITIAL_STATE,
      setGameSession: (gameSession) => set({ gameSession }),
      resetGameSession: () =>
        set((state) => ({
          gameSession: state.initialGameSetting
            ? {
                ...GAME_SESSION_STORE_INITIAL_STATE,
                gameSetting: state.initialGameSetting,
              }
            : GAME_SESSION_STORE_INITIAL_STATE,
        })),
      clearGameSession: () =>
        set({ gameSession: GAME_SESSION_STORE_INITIAL_STATE }),

      initialGameSetting: null,
      setInitialGameSetting: (gameSetting) =>
        set({ initialGameSetting: gameSetting }),
      resetInitialGameSetting: () => set({ initialGameSetting: null }),
    }),
    {
      name: "game-session",
      skipHydration: true,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useGameSessionStore;
