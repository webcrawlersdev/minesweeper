import create from "zustand";
import { boardStateEnum } from "./boardStateEnum";

export const useGameStateStore = create((set) => ({
  gameState: boardStateEnum.PRISTINE,
  reset: () => set({ gameState: boardStateEnum.PRISTINE }),
  start: () => set({ gameState: boardStateEnum.IN_PROGRESS }),
  lose: () => set({ gameState: boardStateEnum.LOST }),
  win: () => set({ gameState: boardStateEnum.WON }),
}));
