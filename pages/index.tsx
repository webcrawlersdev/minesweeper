import { memo, useEffect, useState, useCallback } from "react";
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

let dugCells = [];

export default function Board() {
  const [won] = useAtom(wonAtom);
  const [lost, setLost] = useAtom(lostAtom);
  const [dugCellsNum, setDugCellsNum] = useAtom(dugCellsNumAtom);
  const [dimSize] = useAtom(dimSizeAtom);
  const [bombNumber] = useAtom(bombNumberAtom);

  const [board, setBoard] = useState([]);

  const resetGame = () => {
    setDugCellsNum(0);
    setLost(false);
    dugCells = [];
    setBoard(create_board(dimSize, bombNumber));
  };

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    //console.table(board);
  }, [board]);

  useEffect(() => {
    // console.log(won);
  }, [won]);

  useEffect(() => {
    console.log(dugCellsNum);
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
  }: {
    item: string;
    row: number;
    col: number;
    board;
    setBoard;
  }) => {
  const [, setDugCellsNum] = useAtom(dugCellsNumAtom);
  const [, setLost] = useAtom(lostAtom);

  const dig = useCallback((row, col, board) => {
    if (board[row][col].includes("h")) {
      setDugCellsNum(dugCells.push(`${row}-${col}`));
    }

    if (board[row][col].includes("*")) {
      setLost(true);
    }

    if (board[row][col].includes("0") && board[row][col].includes("h")) {
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
                !dugCells.find(
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
});

const create_board = (dim_size, bomb_number) => {
  // create an array with the amount of cells the board will have
  let board_array = new Array(dim_size * dim_size).fill(" _h");

  // put the bombs in the board
  board_array.fill("*_h", 0, bomb_number);

  // suffle the board to distribute the bombs
  board_array = fisherYatesShuffle(board_array);

  // create a two dimentional array `board` from the suffled board
  let board = singleToMultiDimentionalArray(board_array, dim_size);

  // evaluate and assign the number of neighboring bombs for each cell
  for (let r = 0; r <= dim_size - 1; r++) {
    for (let c = 0; c <= dim_size - 1; c++) {
      if (
        // don't need to assign neighboringbombs to bomb cells
        !board[r][c].includes("*")
      ) {
        board[r][c] = board[r][c].replace(
          " ",
          getNumOfNeighboringBombs(board, r, c)
        );
      }
    }
  }

  return board;
};

/**  Credit:
 * http://bost.ocks.org/mike/shuffle/
 */
const fisherYatesShuffle = function (array) {
  let m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

const singleToMultiDimentionalArray = (initial_array, num_cols) => {
  let rows = initial_array.length / num_cols;
  let multi_dimentional_array = [];

  for (let i = 0; i < rows; i++) {
    multi_dimentional_array.push(initial_array.splice(0, num_cols));
  }

  return multi_dimentional_array;
};

const getNumOfNeighboringBombs = (board, row, col) => {
  let num = 0;

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
          if (board[checking_row][checking_col].includes("*")) {
            num = num + 1;
          }
        }
      }
    }
  }

  return num;
};
