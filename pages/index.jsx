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
