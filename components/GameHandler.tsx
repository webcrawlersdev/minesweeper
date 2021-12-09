// This is the guy who plays as bank in monopoly, thank you GameHandler, nothing would be possible without you

// bombNumber is needed so I can compare th number of cells left with it to manage win state
export default function GameHandler({
  board,
  dimSize,
  bombNumber,
  isThisCellRevealed,
  cellStaggerValues,
  setCellStaggerValues,
  setIsThisCellRevealed,
  revealedCells,
}: {
  board: number[][];
  dimSize: number;
  bombNumber: number;
  cellStaggerValues: number[][];
  setCellStaggerValues: any;
  isThisCellRevealed: any;
  setIsThisCellRevealed: any;
  revealedCells: any;
}) {
  const { gameState, lose, start, win } = useGameStateStore();

  let staggerStep = useRef(0);
  const revealCell = (row, col, board, value) => {
    // If game was pristine, set it to started
    if (gameState === boardStateEnum.PRISTINE) {
      start();
    }

    revealedCells.current.push(`${row}-${col}`);
    let revealedTempArray = [...isThisCellRevealed];
    revealedTempArray[row][col] = true;

    // This is VERY inneficient, I'm setting the entire board every time a cell is revealed. There should be a way to only update the cells that change and not cause a render in the entire baord.
    setIsThisCellRevealed(revealedTempArray);

    let staggerTempArray = [...cellStaggerValues];
    staggerTempArray[row][col] = staggerStep.current;
    setCellStaggerValues(staggerTempArray);
    if (staggerStep.current < 20) {
      staggerStep.current = staggerStep.current + 2;
    } else {
      staggerStep.current = staggerStep.current + 1;
    }

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
        lose();
        break;
    }

    // Check if the player won by revealing this
    if (
      value != 9 &&
      gameState != boardStateEnum.LOST &&
      revealedCells.current.length == dimSize * dimSize - bombNumber
    ) {
      win();
    }
  };

  return (
    <div className="flex flex-col gap-[2px]">
      {isThisCellRevealed &&
        board.map((row, i) => (
          <Row key={`row-${i}`} className="flex gap-[2px]">
            {row.map((value, j) => (
              <Cell
                id={`cell-${j}-${i}`}
                key={`cell-${j}-${i}`}
                value={value}
                isRevealed={isThisCellRevealed[i][j]}
                staggerValue={cellStaggerValues[i][j]}
                handleReveal={() => {
                  staggerStep.current = 0;
                  revealCell(i, j, board, board[i][j]);
                }}
                coordinates={{
                  x: j,
                  y: i,
                }}
              />
            ))}
          </Row>
        ))}
    </div>
  );
}

const Row = styled("div", {
  display: "flex",
  gap: "2px",

  /* Add bottom border for all boxes except the last row */
  "&:not(:last-child) > *::after": {
    zIndex: "0",
    content: "",
    position: "absolute",
    bottom: "-2px",
    width: "50%",
    left: "25%",
    height: "2px",
    backgroundColor: "$border",
  },

  /* Add right border for all indexed boxes except last one */
  "& > *:not(:last-child):before": {
    zIndex: "0",
    content: "",
    position: "absolute",
    right: "-2px",
    height: "50%",
    top: "25%",
    width: "2px",
    backgroundColor: "$border",
  },
});

import Cell from "./Cell";

import { styled } from "../stitches.config";
import { useRef } from "react";
import { useGameStateStore } from "../lib/store";
import { boardStateEnum } from "../lib/boardStateEnum";
