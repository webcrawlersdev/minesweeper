import create from "zustand";
import { boardStateEnum } from "./boardStateEnum";
export const difficultyOptions = {
  BEGINNER: {
    name: "beginner",
    dimSize: 9,
    bombNumber: 10,
  },
  INTERMEDIATE: {
    name: "intermediate",
    dimSize: 16,
    bombNumber: 40,
  },
  EXPERT: {
    name: "expert",
    dimSize: 22,
    bombNumber: 99,
  },
};

export const useGameStateStore = create((set) => ({
  gameState: boardStateEnum.PRISTINE,
  reset: () => set({ gameState: boardStateEnum.PRISTINE }),
  start: () => set({ gameState: boardStateEnum.IN_PROGRESS }),
  lose: () => set({ gameState: boardStateEnum.LOST }),
  win: () => set({ gameState: boardStateEnum.WON }),
}));

export const useTimerStore = create((set) => ({
  timer: 0,
  increaseTimerBy: (by: number) =>
    set((state: { timer: number }) => ({ timer: state.timer + by })),
  resetTimer: () => set({ timer: 0 }),
}));

type Difficulty = {
  difficulty: {
    name: string;
    dimSize: number;
    bombNumber: number;
  };
  setToDifficulty: (newDifficulty: {
    name: string;
    dimSize: number;
    bombNumber: number;
  }) => void;
};

export const useDifficultyStore = create<Difficulty>((set) => ({
  difficulty: difficultyOptions.BEGINNER,
  setToDifficulty: (newDifficulty) =>
    set(() => ({ difficulty: newDifficulty })),
}));
