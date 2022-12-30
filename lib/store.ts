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
} as const;

interface GameState {
  gameState: typeof boardStateEnum[keyof typeof boardStateEnum];
  reset: () => void;
  start: () => void;
  lose: () => void;
  win: () => void;
}

export const useGameStateStore = create<GameState>((set) => ({
  gameState: boardStateEnum.PRISTINE,
  reset: () => set({ gameState: boardStateEnum.PRISTINE }),
  start: () => set({ gameState: boardStateEnum.IN_PROGRESS }),
  lose: () => set({ gameState: boardStateEnum.LOST }),
  win: () => set({ gameState: boardStateEnum.WON }),
}));

interface TimerState {
  timer: number;
  increaseTimerBy: (by: number) => void;
  resetTimer: () => void;
}
export const useTimerStore = create<TimerState>((set) => ({
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

export const toolOptionsEnum = {
  DIG: "DIG",
  FLAG: "FLAG",
} as const;
export type Tool = typeof toolOptionsEnum[keyof typeof toolOptionsEnum];

interface ToolState {
  currentTool: keyof typeof toolOptionsEnum;
  setCurrentTool: (newTool: Tool) => void;
}

export const useToolStore = create<ToolState>((set) => ({
  currentTool: toolOptionsEnum.DIG,
  setCurrentTool: (newTool) => set(() => ({ currentTool: newTool })),
}));

interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}
export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

interface CmdkState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setIsOpen: (isOpen: boolean) => void;
}
export const useCmdkStore = create<CmdkState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));

interface TimerVisibilityState {
  isVisible: boolean;
  toggleVisibility: () => void;
  hide: () => void;
  show: () => void;
}
export const useTimerVisibilityStore = create<TimerVisibilityState>((set) => ({
  isVisible: true,
  toggleVisibility: () =>
    set((state: { isVisible: boolean }) => ({
      isVisible: !state.isVisible,
    })),
  hide: () => set({ isVisible: false }),
  show: () => set({ isVisible: true }),
}));

interface ToolbarVisibilityState {
  isVisible: boolean;
  hide: () => void;
  show: () => void;
  toggleVisibility: () => void;
  autoMode: boolean;
  enterAutoMode: () => void;
  exitAutoMode: () => void;
}
export const useToolbarVisibilityStore = create<ToolbarVisibilityState>(
  (set) => ({
    isVisible: true,
    hide: () => set({ isVisible: false }),
    show: () => set({ isVisible: true }),
    toggleVisibility: () =>
      set((state: { isVisible: boolean }) => ({
        isVisible: !state.isVisible,
      })),
    autoMode: false,
    enterAutoMode: () => set({ autoMode: true }),
    exitAutoMode: () => set({ autoMode: false }),
  })
);
