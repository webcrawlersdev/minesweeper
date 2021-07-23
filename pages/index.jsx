import { memo, useEffect, useState, useCallback } from "react";
import { atom, useAtom } from "jotai";
import { atomWithImmer } from "jotai/immer";
import produce from "immer";

export default function Board() {
  const dugCellsAtom = atom([]);
  const [dugCells, setDugCells] = useAtom(dugCellsAtom);
  const [board, setBoard] = useState([]);
  const [gameState, setGameState] = useState("");

  useEffect(() => {
    setBoard(create_board(10, 10));
  }, []);

  useEffect(() => {
    console.table(board);
  }, [board]);

  return (
    <div>
      {board.map((rows, r) => {
        return (
          <ol className="flex h-10" key={`${r}`}>
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
          </ol>
        );
      })}
    </div>
  );
}

// TODO, take board and setBoard off of the props
const Cell = memo(({ item, row, col, board, setBoard }) => {
  const dig = useCallback((row, col, board) => {
    if (board[row][col].includes("h")) {
      dugCells.push(`${row}-${col}`);
    }
    console.log(dugCells);

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
                console.log(
                  "a neighbour includes a 0",
                  checking_row,
                  checking_col
                );
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
    <li
      className={`w-10 border border-black ${
        item.includes("*") ? "bg-red-400" : "bg-green-300"
      }`}
    >
      <button
        className="w-full h-full bg-gray-300 bg-opacity-25"
        onClick={() => {
          dig(row, col, board);
        }}
      >
        {open == "v" ? value : flag != "_" ? flag : " "}
      </button>
    </li>
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
