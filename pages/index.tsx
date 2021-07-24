import { memo, useEffect, useState, useCallback, useRef } from "react";
import { atom, useAtom } from "jotai";
import produce from "immer";

const dugCellsNumAtom = atom(0);
const dimSizeAtom = atom(16);
const bombNumberAtom = atom(40);
const lostAtom = atom(false);

const wonAtom = atom(
  (get) =>
    get(dugCellsNumAtom) ==
      get(dimSizeAtom) * get(dimSizeAtom) - get(bombNumberAtom) &&
    !get(lostAtom)
);

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

const Cell = memo(
  ({
    item,
    row,
    col,
    board,
    setBoard,
    dugCellsRef,
  }: {
    item: string;
    row: number;
    col: number;
    board;
    setBoard;
    dugCellsRef;
  }) => {
    const [, setDugCellsNum] = useAtom(dugCellsNumAtom);
    const [, setLost] = useAtom(lostAtom);

    const dig = useCallback((row, col, board) => {
      if (board[row][col].includes("h")) {
        setDugCellsNum(dugCellsRef.current.push(`${row}-${col}`));
      }

      if (board[row][col].includes("*")) {
        setLost(true);
      }

      if (board[row][col].includes(" ") && board[row][col].includes("h")) {
        for (let r = -1; r <= 1; r++) {
          for (let c = -1; c <= 1; c++) {
            let checking_row = row + r;
            let checking_col = col + c;
            if (
              // we don't need to check the cell we passed
              !(checking_row == row && checking_col == col)
            ) {
              if (
                // checking_row and checking_col are inside the board
                checking_row >= 0 &&
                checking_row <= board.length - 1 &&
                checking_col >= 0 &&
                checking_col <= board.length - 1
              ) {
                if (
                  !dugCellsRef.current.find(
                    (element) => element == `${checking_row}-${checking_col}`
                  )
                ) {
                  dig(checking_row, checking_col, board);
                }
              }
            }
          }
        }
      }
      setBoard(
        produce((draft) => {
          draft[row][col] = draft[row][col].replace("h", "v");
        })
      );
    }, []);

    const value = item[0];
    const flag = item[1];
    const open = item[2];

    return (
      <div
        className={`w-5 md:w-10 focus-within:ring ring-yellow-300 rounded ${
          open.includes("h") ? "bg-gray-300" : "bg-green-300"
        }`}
      >
        <button
          className="w-full h-full"
          onClick={() => {
            dig(row, col, board);
          }}
        >
          {open == "v" ? value : flag != "_" ? flag : " "}
        </button>
      </div>
    );
  }
);

import { create_board } from "../lib/utils";
