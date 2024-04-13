import { create } from "zustand";
import { CLASSIC_TIME } from "../lib/game.config";
import { createJSONStorage, persist } from "zustand/middleware";

type TimerStatus = "IDLE" | "RUNNING" | "PAUSED" | "FINISHED";
type TimerActionState = "START" | "PAUSE" | "RESUME" | "LAP" | "FINISH";

type TimerAction = {
  action: TimerActionState;
  time: number;
};

type TimerState = {
  value: number;
  status: TimerStatus;
  isActive: boolean;
  pauseTime: number;
  lastLapTime: number;
  lap: number;
  history: TimerAction[];
  lapHistory: number[];
};

type GameSessionState = {
  timer: TimerState;
};

type UseGameSession = {
  gameSession: GameSessionState;
};

type UseGameSessionActions = {
  setGameSession: (gameSession: GameSessionState) => void;
  setTimerValue: (value: number) => void;
  timerStart: () => void;
  timerPause: () => void;
  timerResume: () => void;
  timerLap: () => void;
  timerFinish: () => void;
  timerReset: () => void;
};

const INITIAL_GAME_SESSION_STATE: GameSessionState = {
  timer: {
    value: CLASSIC_TIME,
    isActive: false,
    status: "IDLE",
    history: [],
    lastLapTime: Date.now(),
    lap: 0,
    lapHistory: [],
    pauseTime: 0,
  },
};

const useGameSessionStoreV2 = create<UseGameSession & UseGameSessionActions>()(
  persist(
    (set) => ({
      gameSession: INITIAL_GAME_SESSION_STATE,

      setGameSession: (gameSession) => set({ gameSession }),

      setTimerValue: (value: number) => {
        set((state) => {
          const { timer } = state.gameSession;
          return {
            gameSession: {
              ...state.gameSession,
              timer: {
                ...timer,
                value,
              },
            },
          };
        });
      },

      timerStart: () => {
        set((state) => {
          const { timer } = state.gameSession;
          if (timer.status !== "IDLE") return state;

          return {
            gameSession: {
              ...state.gameSession,
              timer: {
                ...timer,
                value: CLASSIC_TIME,
                status: "RUNNING",
                isActive: true,
                lap: Date.now(),
                lastLapTime: Date.now(),
                history: [
                  ...timer.history,
                  { action: "START", time: Date.now() },
                ],
              },
            },
          };
        });
      },

      timerLap: () => {
        set((state) => {
          const { timer } = state.gameSession;
          if (timer.status !== "RUNNING") return state;

          const currentLapTime = Date.now();
          return {
            gameSession: {
              ...state.gameSession,
              timer: {
                ...timer,
                lap: currentLapTime,
                lapHistory: [...timer.lapHistory, currentLapTime - timer.lap],
                history: [
                  ...timer.history,
                  { action: "LAP", time: currentLapTime },
                ],
              },
            },
          };
        });
      },

      timerPause: () => {
        set((state) => {
          const { timer } = state.gameSession;
          if (timer.status !== "RUNNING") return state;

          return {
            gameSession: {
              ...state.gameSession,
              timer: {
                ...timer,
                isActive: false,
                status: "PAUSED",
                pauseTime: Date.now(),
                history: [
                  ...timer.history,
                  { action: "PAUSE", time: Date.now() },
                ],
              },
            },
          };
        });
      },
      timerResume: () => {
        set((state) => {
          const { timer } = state.gameSession;
          if (timer.status !== "PAUSED") return state;

          const pauseDuration = Date.now() - timer.pauseTime;
          return {
            gameSession: {
              ...state.gameSession,
              timer: {
                ...timer,
                status: "RUNNING",
                isActive: true,
                lap: timer.lap + pauseDuration,
                pauseTime: 0,
                history: [
                  ...timer.history,
                  { action: "RESUME", time: Date.now() },
                ],
              },
            },
          };
        });
      },
      timerReset: () => {
        set((state) => {
          const { timer } = state.gameSession;
          return {
            gameSession: {
              ...state.gameSession,
              timer: {
                ...timer,
                value: CLASSIC_TIME,
                status: "IDLE",
                isActive: false,
                history: [],
                lap: 0,
                lapHistory: [],
                pauseTime: 0,
              },
            },
          };
        });
      },
      timerFinish: () => {
        set((state) => {
          const { timer } = state.gameSession;
          if (timer.status !== "RUNNING") return state;

          return {
            gameSession: {
              ...state.gameSession,
              timer: {
                ...timer,
                status: "FINISHED",
                isActive: false,
                history: [
                  ...timer.history,
                  { action: "FINISH", time: Date.now() },
                ],
              },
            },
          };
        });
      },
    }),
    {
      name: "game-session-v2",
      skipHydration: true,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useGameSessionStoreV2;
