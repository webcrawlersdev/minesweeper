import { useEffect, useState, useRef } from "react";
import { useAtom } from "jotai";

import Cell from "../components/Cell";
import {
  wonAtom,
  lostAtom,
  dugCellsNumAtom,
  dimSizeAtom,
  bombNumberAtom,
} from "../lib/store";

export default function Board() {
  const [won] = useAtom(wonAtom);
  const [lost, setLost] = useAtom(lostAtom);
  const [dugCellsNum, setDugCellsNum] = useAtom(dugCellsNumAtom);
  const [dimSize] = useAtom(dimSizeAtom);
  const [bombNumber] = useAtom(bombNumberAtom);

  const dugCellsRef = useRef([]);

  const [board, setBoard] = useState([]);

  const resetGame = () => {
    dugCellsRef.current = [];
    setDugCellsNum(0);
    setLost(false);
    setBoard(create_board(dimSize, bombNumber));
  };

  useEffect(() => {
    console.log(dugCellsRef.current.length, dugCellsNum);
  }, [dugCellsNum]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-6">Bombs: {bombNumber}</h1>
      <main className="flex flex-col gap-1">
        {board.map((rows, r) => {
          return (
            <div className="flex h-5 md:h-10 gap-1" key={`${r}`}>
              {rows.map((item, c) => {
                return (
                  <Cell
                    board={board}
                    setBoard={setBoard}
                    key={`${r}-${c}`}
                    item={item}
                    row={r}
                    col={c}
                    dugCellsRef={dugCellsRef}
                  />
                );
              })}
            </div>
          );
        })}
      </main>
      <h1>{lost ? "YOU LOST" : won ? "YOU WON" : "Not yet"}</h1>
      <button onClick={resetGame}>Reset game</button>
    </div>
  );
}

import { create_board } from "../lib/utils";
