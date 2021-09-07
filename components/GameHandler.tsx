// This is the guy who plays as bank in monopoly, thank you GameHandler, nothing would be possible without you

// bombNumber is needed so I can compare th number of cells left with it to manage win state
export default function GameHandler({
  board,
  dimSize,
  bombNumber,
}: {
  board: number[][];
  dimSize: number;
  bombNumber: number;
}) {
  // make a bidimentional array the same size of board, give cells a calback so they can update themsemves here;
  const [isThisCellRevealed, setIsThisCellRevealed] = useState(null);
  useEffect(() => {
    let tempArray = new Array(dimSize * dimSize).fill(false);
    setIsThisCellRevealed(singleToMultiDimentionalArray(tempArray, dimSize));
  }, [dimSize, board]);

  useEffect(() => {
    if (!isThisCellRevealed) {
      return;
    }

    // console.table(isThisCellRevealed);
  }, [isThisCellRevealed]);

  const revealedCells = useRef([]);

  const revealCell = (row, col, board, value) => {
    revealedCells.current.push(`${row}-${col}`);
    // Send if this was a bomb or not to the game handler
    let tempArray = [...isThisCellRevealed];
    tempArray[row][col] = true;
    setIsThisCellRevealed(tempArray);

    switch (value) {
      case 0: //this was an empty cell
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
                  !revealedCells.current.find(
                    (element) => element == `${checking_row}-${checking_col}`
                  )
                ) {
                  console.log(
                    `Running revealCell on ${checking_row}-${checking_col}`
                  );
                  revealCell(
                    checking_row,
                    checking_col,
                    board,
                    board[checking_row][checking_col]
                  );
                }
              }
            }
          }
        }

        break;

      case 9: //this was a bomb
        console.log(`dang, ${row}-${col} was a bomb`);
        break;
    }
  };

  return (
    <div className="flex gap-2 flex-col">
      {isThisCellRevealed &&
        board.map((row, i) => (
          <div key={`row-${i}`} className="flex gap-2">
            {row.map((value, j) => (
              <Cell
                //memoize this later to see if the entire board rerenders
                key={`cell-${i}-${j}`}
                value={value}
                isRevealed={isThisCellRevealed[i][j]}
                coords={[i, j]}
                handleReveal={() => revealCell(i, j, board, board[i][j])}
                handleEmptyCell={(coords) => {
                  console.log(`${coords[0]}-${coords[1]} was empty`);
                }}
                handleBomb={(coords) => {
                  console.log(`dang, ${coords[0]}-${coords[1]} was a bomb`);
                }}
              />
            ))}
          </div>
        ))}
    </div>
  );
}

import { useRef, useEffect, useState } from "react";
import Cell from "./NewCell";

import { singleToMultiDimentionalArray } from "../lib/utils";
