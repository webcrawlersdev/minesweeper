import create from "zustand";
import { boardStateEnum } from "./boardStateEnum";

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
