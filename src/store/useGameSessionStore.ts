import { create } from "zustand";
import {
  CLASSIC_ANSWER_DELAY_TIME,
  CLASSIC_CORRECT_ADD_TIME,
  CLASSIC_WRONG_REDUCE_TIME,
  CLASSIC_LEVEL_UP_THRESHOLD,
  CLASSIC_TIME,
  INITIAL_GAME_SESSION_STATE,
  MAX_CLASSIC_LEVEL,
  GAME_MAX_TIMER,
} from "../lib/game.config";
import { createJSONStorage, persist } from "zustand/middleware";
import { GameInfo, GameMode, Problem } from "../lib/types";
import {
  adjustGameSettingDifficulty,
  generateProblem,
  getRating,
} from "../lib/game";

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
  initialGameMode: GameMode | null;
  gameMode: GameMode | null;
  problemList: Problem[] | null;
  problem: Problem | null;
  levelCounter: number;
  combo: number;
  gameInfo: GameInfo;
  timer: TimerState;
  isCooldown: boolean;
  gameCreatedAt: Date | null;
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
  gameDoneCooldown: (adjustedGameSetting: GameMode | null) => void;
  setStatus: (status: GameTimerStatus) => void;
};

type GamePowers = {
  revealAnswer: boolean;
};

type GamePowersActions = {
  setRevealAnswer: (revealAnswer: boolean) => void;
};

const useGameSessionStore = create<
  UseGameSession & UseGameSessionActions & GamePowers & GamePowersActions
>()(
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
                gameMode: state.gameSession.gameMode,
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
          const { gameSession } = state;

          const {
            timer,
            problemList,
            problem,
            gameMode,
            gameInfo,
            levelCounter,
          } = gameSession;

          const { level } = gameInfo;

          // restrictions
          if (timer.status !== "RUNNING") return state;
          if (!problem) return state;

          // constants
          const isCorrect = answer === problem.answer;
          let newLevelCounter = isCorrect ? levelCounter + 1 : 1;
          const doLevelUp =
            levelCounter === CLASSIC_LEVEL_UP_THRESHOLD &&
            level < MAX_CLASSIC_LEVEL;
          const initialValue = isCorrect
            ? timer.value + CLASSIC_CORRECT_ADD_TIME
            : timer.value - CLASSIC_WRONG_REDUCE_TIME;
          const timerValue = Math.min(initialValue, GAME_MAX_TIMER);

          // new values
          const newCoin = isCorrect ? gameInfo.coin + 1 : gameInfo.coin;
          const newCorrect = isCorrect
            ? gameInfo.correct + 1
            : gameInfo.correct;
          const newWrong = !isCorrect ? gameInfo.wrong + 1 : gameInfo.wrong;
          const newCombo = isCorrect ? gameSession.combo + 1 : 0;
          const newLevel = doLevelUp ? level + 1 : level;
          const newScore = gameInfo.score + newCombo * newLevel;
          const newHighestCombo =
            isCorrect && gameSession.combo + 1 > gameInfo.highestCombo
              ? gameSession.combo + 1
              : gameInfo.highestCombo;
          const newTotalAnswered = gameInfo.totalAnswered + 1;
          const currentLapTime = Date.now();
          const newLapHistory = [
            ...timer.lapHistory,
            currentLapTime - timer.lap,
          ];
          const newHistory: TimerAction[] = [
            ...timer.history,
            { action: "ANSWER", time: currentLapTime },
          ];
          const newTotalAddedTime = isCorrect
            ? timer.totalAddedTime + CLASSIC_CORRECT_ADD_TIME
            : timer.totalAddedTime;
          const newTotalReducedTime = !isCorrect
            ? timer.totalReducedTime + CLASSIC_WRONG_REDUCE_TIME
            : timer.totalReducedTime;

          // update problem
          const problemAnswered: Problem = {
            ...problem,
            userAnswer: answer,
            status: isCorrect ? "CORRECT" : "WRONG",
            lapTime: currentLapTime - timer.lap,
          };

          const newProblemList = [...(problemList || []), problemAnswered];

          // update game setting
          let adjustedGameSetting = gameMode;
          if (doLevelUp) {
            newLevelCounter = 1;
            adjustedGameSetting = adjustGameSettingDifficulty({
              gameMode: adjustedGameSetting,
            });
          }

          // generate new problem
          setTimeout(() => {
            useGameSessionStore
              .getState()
              .gameDoneCooldown(adjustedGameSetting);
          }, CLASSIC_ANSWER_DELAY_TIME);

          return {
            gameSession: {
              ...gameSession,
              gameInfo: {
                ...gameInfo,
                correct: newCorrect,
                wrong: newWrong,
                score: newScore,
                coin: newCoin,
                highestCombo: newHighestCombo,
                totalAnswered: newTotalAnswered,
                level: newLevel,
              },
              gameMode: adjustedGameSetting,
              isCooldown: true,
              combo: newCombo,
              levelCounter: newLevelCounter,
              problem: problemAnswered,
              problemList: newProblemList,
              timer: {
                ...timer,
                value: timerValue,
                lap: currentLapTime,
                lapHistory: newLapHistory,
                history: newHistory,
                totalAddedTime: newTotalAddedTime,
                totalReducedTime: newTotalReducedTime,
              },
            },
          };
        });
      },

      gameDoneCooldown: (adjustedGameSetting: GameMode | null) => {
        set((state) => {
          return {
            gameSession: {
              ...state.gameSession,
              problem: generateProblem({
                gameMode: adjustedGameSetting,
              }),

              isCooldown: false,
            },
          };
        });
      },

      gamePause: () => {
        set((state) => {
          const {
            timer,
            gameInfo: { gameTime },
          } = state.gameSession;
          if (timer.status !== "RUNNING") return state;
          const runningTime = Date.now() - timer.startRunningTime;

          return {
            gameSession: {
              ...state.gameSession,
              gameInfo: {
                ...state.gameSession.gameInfo,
                gameTime: gameTime + runningTime,
              },
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

      gameContinue: () => {
        set((state) => {
          const { timer } = state.gameSession;
          if (timer.status !== "CONTINUING") return state;

          const pauseDuration = Date.now() - timer.pauseTime;
          return {
            gameSession: {
              ...state.gameSession,
              problem: generateProblem({
                gameMode: state.gameSession.gameMode,
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
              initialGameMode: state.gameSession.initialGameMode,
              gameMode: state.gameSession.initialGameMode,
              problemList: null,
              problem: null,
              levelCounter: 1,
              combo: 0,
              gameCreatedAt: null,
              gameInfo: {
                correct: 0,
                wrong: 0,
                score: 0,
                highestCombo: 0,
                totalAnswered: 0,
                gameTime: 0,
                level: 1,
                rating: "E",
                coin: 0,
              },
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
          const {
            timer,
            gameInfo: { gameTime },
          } = state.gameSession;
          if (timer.status !== "RUNNING") return state;
          const runningTime = Date.now() - timer.startRunningTime;
          const newGameTime = gameTime + runningTime;

          const rating = getRating({
            correct: state.gameSession.gameInfo.correct,
            wrong: state.gameSession.gameInfo.wrong,
            level: state.gameSession.gameInfo.level,
          });

          return {
            gameSession: {
              ...state.gameSession,
              problem: null,
              gameInfo: {
                ...state.gameSession.gameInfo,
                gameTime: newGameTime,
                rating,
              },
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

      revealAnswer: false,

      setRevealAnswer: (revealAnswer) => {
        set({ revealAnswer });
      },
    }),
    {
      name: "game-session",
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGameSessionStore;
