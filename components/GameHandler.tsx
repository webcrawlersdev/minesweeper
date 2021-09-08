// This is the guy who plays as bank in monopoly, thank you GameHandler, nothing would be possible without you

// bombNumber is needed so I can compare th number of cells left with it to manage win state
export default function GameHandler({
  board,
  dimSize,
  bombNumber,
  isThisCellRevealed,
  setIsThisCellRevealed,
  revealedCells,
}: {
  board: number[][];
  dimSize: number;
  bombNumber: number;
  isThisCellRevealed: any;
  setIsThisCellRevealed: any;
  revealedCells: any;
}) {
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
    <div className="flex flex-col gap-[2px]">
      {isThisCellRevealed &&
        board.map((row, i) => (
          <Row key={`row-${i}`} className="flex gap-[2px]">
            {row.map((value, j) => (
              <Cell
                key={`cell-${i}-${j}`}
                value={value}
                isRevealed={isThisCellRevealed[i][j]}
                handleReveal={() => revealCell(i, j, board, board[i][j])}
                handleBomb={() => {
                  console.log(`dang, ${i}-${j} was a bomb`);
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

import Cell from "./NewCell";

import { styled } from "@stitches/react";
