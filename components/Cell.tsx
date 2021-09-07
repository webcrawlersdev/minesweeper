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
      <div className="w-5 md:w-10 focus-within:ring ring-yellow-300 rounded select-none bg-gray-300">
        <button
          className="w-full h-full"
          onClick={() => {
            dig(row, col, board);
          }}
        >
          {open == "v" ? value : flag != "_" ? flag : ""}
        </button>
      </div>
    );
  }
);

export default Cell;

import produce from "immer";
import { memo, useCallback } from "react";
import { useAtom } from "jotai";

import { dugCellsNumAtom, lostAtom } from "../lib/store";
