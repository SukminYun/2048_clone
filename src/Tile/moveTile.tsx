type BoardType = number[][];

// 주어진 row, col에 value를 설정
function setTile(
  brd: number[][],
  row: number,
  col: number,
  value: number,
): number[][] {
  return brd.map((Row, rowIndex) =>
    Row.map((cell, colIndex) =>
      rowIndex === row && colIndex === col ? value : cell,
    ),
  );
}

export function addNewTile(brd: BoardType): BoardType {
  const emptyCells: [number, number][] = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (brd[i]?.[j] === 0) {
        emptyCells.push([i, j]);
      }
    }
  }

  if (emptyCells.length === 0) return brd;
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const selectedCell = emptyCells[randomIndex];
  if (selectedCell !== undefined) {
    const [row, col] = selectedCell;
    const setv = Math.random() < 0.8 ? 2 : 4;
    const newGrid = setTile(brd, row, col, setv);
    return newGrid;
  }
  return brd;
}

export function moveLeft(grid: BoardType): BoardType {
  let newboard = grid.map((line) => [...line]);
  let isMerge = Array(4)
    .fill(0)
    .map(() => Array<number>(4).fill(0));

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (newboard[j]?.[i] === 0) continue;
      let x = i;

      // 0 안나올 때까지 왼쪽으로 한칸씩
      while (x > 0 && newboard[j]?.[x - 1] === 0) {
        newboard = setTile(newboard, j, x - 1, newboard[j]?.[x] as number);
        newboard = setTile(newboard, j, x, 0);
        x--;
      }

      // 합치기 단계 (합쳐진 곳에서 안합쳐지도록)
      if (
        x > 0 &&
        newboard[j]?.[x - 1] === newboard[j]?.[x] &&
        isMerge[j]?.[x - 1] === 0
      ) {
        newboard = setTile(
          newboard,
          j,
          x - 1,
          (newboard[j]?.[x - 1] as number) * 2,
        );
        newboard = setTile(newboard, j, x, 0);
        isMerge = setTile(isMerge, j, x - 1, 1);
      }
    }
  }
  return newboard;
}

export function moveRight(grid: BoardType): BoardType {
  let newboard = grid.map((line) => [...line]);
  let isMerge = Array(4)
    .fill(0)
    .map(() => Array<number>(4).fill(0));

  for (let i = 3; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (newboard[j]?.[i] === 0) continue;
      let x = i;

      // 0 안나올 때까지 오른쪽으로 한칸씩
      while (x < 3 && newboard[j]?.[x + 1] === 0) {
        newboard = setTile(newboard, j, x + 1, newboard[j]?.[x] as number);
        newboard = setTile(newboard, j, x, 0);
        x++;
      }

      // 합치기 단계 (합쳐진 곳에서 안합쳐지도록)
      if (
        x < 3 &&
        newboard[j]?.[x + 1] === newboard[j]?.[x] &&
        isMerge[j]?.[x + 1] === 0
      ) {
        newboard = setTile(
          newboard,
          j,
          x + 1,
          (newboard[j]?.[x + 1] as number) * 2,
        );
        newboard = setTile(newboard, j, x, 0);
        isMerge = setTile(isMerge, j, x + 1, 1);
      }
    }
  }
  return newboard;
}

export function moveUp(grid: BoardType): BoardType {
  let newboard = grid.map((line) => [...line]);
  let isMerge = Array(4)
    .fill(0)
    .map(() => Array<number>(4).fill(0));
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (newboard[i]?.[j] === 0) continue;
      let y = i;

      // 0 안나올 때까지 위쪽으로 한칸씩
      while (y > 0 && newboard[y - 1]?.[j] === 0) {
        newboard = setTile(newboard, y - 1, j, newboard[y]?.[j] as number);
        newboard = setTile(newboard, y, j, 0);
        y--;
      }

      // 합치기 단계 (합쳐진 곳에서 안합쳐지도록)
      if (
        y > 0 &&
        newboard[y - 1]?.[j] === newboard[y]?.[j] &&
        isMerge[y - 1]?.[j] === 0
      ) {
        newboard = setTile(
          newboard,
          y - 1,
          j,
          (newboard[y - 1]?.[j] as number) * 2,
        );
        newboard = setTile(newboard, y, j, 0);
        isMerge = setTile(isMerge, y - 1, j, 1);
      }
    }
  }
  return newboard;
}

export function moveDown(grid: BoardType): BoardType {
  let newboard = grid.map((line) => [...line]);
  let isMerge = Array(4)
    .fill(0)
    .map(() => Array<number>(4).fill(0));
  for (let i = 3; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (newboard[i]?.[j] === 0) continue;
      let y = i;

      // 0 안나올 때까지 아래쪽으로 한칸씩
      while (y < 3 && newboard[y + 1]?.[j] === 0) {
        newboard = setTile(newboard, y + 1, j, newboard[y]?.[j] as number);
        newboard = setTile(newboard, y, j, 0);
        y++;
      }

      // 합치기 단계 (합쳐진 곳에서 안합쳐지도록)
      if (
        y < 3 &&
        newboard[y + 1]?.[j] === newboard[y]?.[j] &&
        isMerge[y + 1]?.[j] === 0
      ) {
        newboard = setTile(
          newboard,
          y + 1,
          j,
          (newboard[y + 1]?.[j] as number) * 2,
        );
        newboard = setTile(newboard, y, j, 0);
        isMerge = setTile(isMerge, y + 1, j, 1);
      }
    }
  }
  return newboard;
}
