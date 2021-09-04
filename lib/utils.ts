export const create_board = (dim_size, bomb_number) => {
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

export const createBoardWithJustNumbers = (dim_size, bomb_number) => {
  // create an array with the amount of cells the board will have
  let board_array = new Array(dim_size * dim_size).fill(0);

  // put the bombs in the board
  board_array.fill(9, 0, bomb_number);

  // suffle the board to distribute the bombs
  board_array = fisherYatesShuffle(board_array);

  // create a two dimentional array `board` from the suffled board
  let board = singleToMultiDimentionalArray(board_array, dim_size);

  // evaluate and assign the number of neighboring bombs for each cell
  for (let r = 0; r <= dim_size - 1; r++) {
    for (let c = 0; c <= dim_size - 1; c++) {
      if (
        // don't need to assign neighboringbombs to bomb cells
        !(board[r][c] === 9)
      ) {
        board[r][c] = board[r][c] = getNumOfNeighboringBombsIfBombsAre9(
          board,
          r,
          c
        );
      }
    }
  }

  console.log(board);
  return board;
};

export const getNumOfNeighboringBombsIfBombsAre9 = (
  board: number[],
  row,
  col
) => {
  let bombNum = 0;

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
          if (board[checking_row][checking_col] === 9) {
            bombNum = bombNum + 1;
          }
        }
      }
    }
  }

  return bombNum;
};

/**  Credit:
 * http://bost.ocks.org/mike/shuffle/
 */
export const fisherYatesShuffle = function (array) {
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

export const singleToMultiDimentionalArray = (initial_array, num_cols) => {
  let rows = initial_array.length / num_cols;
  let multi_dimentional_array = [];

  for (let i = 0; i < rows; i++) {
    multi_dimentional_array.push(initial_array.splice(0, num_cols));
  }

  return multi_dimentional_array;
};

export const getNumOfNeighboringBombs = (board, row, col) => {
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
  if (num > 0) {
    return num;
  } else {
    return " ";
  }
};
