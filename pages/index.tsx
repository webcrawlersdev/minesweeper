import { useState, useRef } from "react";
import { useAtom } from "jotai";

import Board from "../components/Board";
import {
  wonAtom,
  lostAtom,
  dugCellsNumAtom,
  dimSizeAtom,
  bombNumberAtom,
} from "../lib/store";

export default function Home() {
  const [won] = useAtom(wonAtom);
  const [lost, setLost] = useAtom(lostAtom);
  const [, setDugCellsNum] = useAtom(dugCellsNumAtom);
  const [dimSize] = useAtom(dimSizeAtom);
  const [bombNumber] = useAtom(bombNumberAtom);

  const dugCellsRef = useRef([]);
  // this is passed to the cells so they can mutate an array of checked cells so we don't have to check cells more than once. This improves performance a lot.

  const [board, setBoard] = useState([]);

  const resetGame = () => {
    dugCellsRef.current = [];
    setDugCellsNum(0);
    setLost(false);
    setBoard(create_board(dimSize, bombNumber));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-6">Bombs: {bombNumber}</h1>
      <Board board={board} setBoard={setBoard} dugCellsRef={dugCellsRef} />
      <h1>{lost ? "YOU LOST" : won ? "YOU WON" : "Not yet"}</h1>
      <button onClick={resetGame}>Reset game</button>
    </div>
  );
}

import { create_board } from "../lib/utils";
