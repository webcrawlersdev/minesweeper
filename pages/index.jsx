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
