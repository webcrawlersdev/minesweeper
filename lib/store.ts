import { atom } from "jotai";

export const dugCellsNumAtom = atom(0);
export const dimSizeAtom = atom(12);
export const bombNumberAtom = atom(30);
export const lostAtom = atom(false);

export const wonAtom = atom(
  (get) =>
    get(dugCellsNumAtom) ==
      get(dimSizeAtom) * get(dimSizeAtom) - get(bombNumberAtom) &&
    !get(lostAtom)
);
