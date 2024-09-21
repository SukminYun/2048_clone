function moveTiles({ board, dir }) {
  const newboard = [...board];
  newboard[1][1] = '4';
  return newboard;
}

export default moveTiles;
