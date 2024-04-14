import { create } from "zustand";
import {
  CLASSIC_ANSWER_DELAY_TIME,
  CLASSIC_CORRECT_ADD_TIME,
  CLASSIC_WRONG_REDUCE_TIME,
  CLASSIC_LEVEL_UP_THRESHOLD,
  CLASSIC_TIME,
  gameSetting,
  INITIAL_GAME_SESSION_STATE,
} from "../lib/game.config";
import { createJSONStorage, persist } from "zustand/middleware";
import { GameInfo, GameSetting, Problem } from "../lib/types";
import { adjustGameSettingDifficulty, generateProblem } from "../lib/game";
import { chain } from "mathjs";

export type GameTimerStatus =
  | "IDLE"
  | "STARTING"
  | "RUNNING"
  | "PAUSED"
  | "CONTINUING"
  | "FINISHED";

type TimerActionState = "START" | "PAUSE" | "CONTINUE" | "ANSWER" | "FINISH";

type TimerAction = {
  action: TimerActionState;
  time: number;
};

export type TimerState = {
  value: number;
  status: GameTimerStatus;
  isActive: boolean;
  pauseTime: number;
  startRunningTime: number;
  lastLapTime: number;
  lap: number;
  history: TimerAction[];
  lapHistory: number[];
  totalAddedTime: number;
  totalReducedTime: number;
  initialValue: number;
};

export type GameSessionState = {
  gameSetting: GameSetting | null;
  problemList: Problem[] | null;
  problem: Problem | null;
  level: number;
  levelCounter: number;
  combo: number;
  gameInfo: GameInfo;
  timer: TimerState;
  totalRunningTime: number;
  isCooldown: boolean;
};

type UseGameSession = {
  gameSession: GameSessionState;
};

type UseGameSessionActions = {
  setGameSession: (gameSession: GameSessionState) => void;
  setTimerValue: (value: number) => void;
  gameStart: () => void;
  gamePause: () => void;
  gameContinue: () => void;
  gameAnswer: (answer: number) => void;
  gameFinish: () => void;
  gameReset: () => void;
  gameDoneCooldown: (adjustedGameSetting: GameSetting | null) => void;
  setStatus: (status: GameTimerStatus) => void;
};

const useGameSessionStore = create<UseGameSession & UseGameSessionActions>()(
  persist(
    (set) => ({
      gameSession: INITIAL_GAME_SESSION_STATE,

      setGameSession: (gameSession) => set({ gameSession }),

      setStatus: (status) => {
        set((state) => ({
          ...state,
          gameSession: {
            ...state.gameSession,
            timer: {
              ...state.gameSession.timer,
              status,
            },
          },
        }));
      },

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

      gameStart: () => {
        set((state) => {
          const { timer } = state.gameSession;
          if (timer.status !== "STARTING") return state;

          return {
            gameSession: {
              ...state.gameSession,
              problem: generateProblem({
                gameSetting: state.gameSession.gameSetting,
                level: state.gameSession.level,
              }),
              timer: {
                ...timer,
                value: CLASSIC_TIME,
                status: "RUNNING",
                isActive: true,
                lap: Date.now(),
                lastLapTime: Date.now(),
                startRunningTime: Date.now(),
                history: [
                  ...timer.history,
                  { action: "START", time: Date.now() },
                ],
              },
            },
          };
        });
      },

      gameAnswer: (answer) => {
        set((state) => {
          const {
            timer,
            problemList,
            problem,
            gameSetting,
            level,
            levelCounter,
          } = state.gameSession;
          if (timer.status !== "RUNNING") return state;
          if (!problem) return state;
          const isCorrect = answer === problem.answer;
          let newLevelCounter = isCorrect ? levelCounter + 1 : 1;
          const currentLapTime = Date.now();
          const problemAnswered: Problem = {
            ...problem,
            userAnswer: answer,
            status: isCorrect ? "CORRECT" : "WRONG",
            lapTime: currentLapTime - timer.lap,
          };

          const newProblemList = [...(problemList || []), problemAnswered];

          const doLevelUp = levelCounter === CLASSIC_LEVEL_UP_THRESHOLD;

          const newLevel = doLevelUp ? level + 1 : level;

          let adjustedGameSetting = gameSetting;
          if (doLevelUp) {
            newLevelCounter = 1;
            adjustedGameSetting = adjustGameSettingDifficulty({
              gameSetting: adjustedGameSetting,
            });
          }

          const combo = isCorrect ? state.gameSession.combo + 1 : 0;
          const scoreIncrement = isCorrect ? combo * newLevel : 0;

          setTimeout(() => {
            useGameSessionStore
              .getState()
              .gameDoneCooldown(adjustedGameSetting);
          }, CLASSIC_ANSWER_DELAY_TIME);

          return {
            gameSession: {
              ...state.gameSession,
              gameInfo: {
                ...state.gameSession.gameInfo,
                correct: isCorrect
                  ? state.gameSession.gameInfo.correct + 1
                  : state.gameSession.gameInfo.correct,
                wrong: !isCorrect
                  ? state.gameSession.gameInfo.wrong + 1
                  : state.gameSession.gameInfo.wrong,
                score: state.gameSession.gameInfo.score + scoreIncrement,
                highestCombo:
                  isCorrect &&
                  state.gameSession.combo + 1 >
                    state.gameSession.gameInfo.highestCombo
                    ? state.gameSession.combo + 1
                    : state.gameSession.gameInfo.highestCombo,
                totalCombo: isCorrect
                  ? state.gameSession.gameInfo.totalCombo + 1
                  : state.gameSession.gameInfo.totalCombo,
                totalQuestion: state.gameSession.gameInfo.totalQuestion + 1,
              },
              gameSetting: adjustedGameSetting,
              isCooldown: true,
              combo: combo,
              level: newLevel,
              levelCounter: newLevelCounter,
              problem: problemAnswered,
              problemList: newProblemList,
              timer: {
                ...timer,
                value: isCorrect
                  ? timer.value + CLASSIC_CORRECT_ADD_TIME
                  : timer.value - CLASSIC_WRONG_REDUCE_TIME,
                lap: currentLapTime,
                lapHistory: [...timer.lapHistory, currentLapTime - timer.lap],
                history: [
                  ...timer.history,
                  { action: "ANSWER", time: currentLapTime },
                ],
                totalAddedTime: isCorrect
                  ? timer.totalAddedTime + CLASSIC_CORRECT_ADD_TIME
                  : timer.totalAddedTime,
                totalReducedTime: !isCorrect
                  ? timer.totalReducedTime + CLASSIC_WRONG_REDUCE_TIME
                  : timer.totalReducedTime,
              },
            },
          };
        });
      },

      gameDoneCooldown: (adjustedGameSetting: GameSetting | null) => {
        set((state) => {
          return {
            gameSession: {
              ...state.gameSession,
              problem: generateProblem({
                gameSetting: adjustedGameSetting,
              }),

              isCooldown: false,
            },
          };
        });
      },

      gamePause: () => {
        set((state) => {
          const { timer, totalRunningTime } = state.gameSession;
          if (timer.status !== "RUNNING") return state;
          const runningTime = Date.now() - timer.startRunningTime;

          return {
            gameSession: {
              ...state.gameSession,
              totalRunningTime: totalRunningTime + runningTime,
              timer: {
                ...timer,
                isActive: false,
                status: "PAUSED",
                pauseTime: Date.now(),
                totalRunningTime: totalRunningTime + runningTime,
                history: [
                  ...timer.history,
                  { action: "PAUSE", time: Date.now() },
                ],
              },
            },
          };
        });
      },

      gameContinue: () => {
        set((state) => {
          const { timer } = state.gameSession;
          if (timer.status !== "CONTINUING") return state;

          const pauseDuration = Date.now() - timer.pauseTime;
          return {
            gameSession: {
              ...state.gameSession,
              problem: generateProblem({
                gameSetting: state.gameSession.gameSetting,
                level: state.gameSession.level,
              }),
              timer: {
                ...timer,
                status: "RUNNING",
                isActive: true,
                lap: timer.lap + pauseDuration,
                pauseTime: 0,
                startRunningTime: Date.now(),
                history: [
                  ...timer.history,
                  { action: "CONTINUE", time: Date.now() },
                ],
              },
            },
          };
        });
      },

      gameReset: () => {
        set((state) => {
          return {
            gameSession: {
              gameSetting: gameSetting,
              problemList: null,
              problem: null,
              level: 1,
              levelCounter: 1,
              combo: 0,
              gameInfo: {
                correct: 0,
                wrong: 0,
                score: 0,
                highestCombo: 0,
                totalCombo: 0,
                totalQuestion: 0,
              },
              totalRunningTime: 0,
              isCooldown: false,
              timer: {
                value: CLASSIC_TIME,
                status: "IDLE",
                isActive: false,
                history: [],
                lap: 0,
                lapHistory: [],
                pauseTime: 0,
                startRunningTime: 0,
                initialValue: CLASSIC_TIME,
                totalAddedTime: 0,
                totalReducedTime: 0,
                lastLapTime: 0,
              },
            },
          };
        });
      },

      gameFinish: () => {
        set((state) => {
          const { timer, totalRunningTime } = state.gameSession;
          if (timer.status !== "RUNNING") return state;
          const runningTime = Date.now() - timer.startRunningTime;

          return {
            gameSession: {
              ...state.gameSession,
              problem: null,
              totalRunningTime: totalRunningTime + runningTime,
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
      name: "game-session",
      skipHydration: true,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useGameSessionStore;
