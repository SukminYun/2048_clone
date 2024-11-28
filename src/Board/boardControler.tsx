import { addNewTile } from '../Tile/moveTile';
type BoardType = number[][];

export function initializeBoard(): BoardType {
  let newBoard = Array(4)
    .fill(0)
    .map(() => Array<number>(4).fill(0));
  newBoard = addNewTile(addNewTile(newBoard));
  return newBoard;
}

export function calculateScore(brd: BoardType): number {
  return brd.flat().reduce((sum, cell) => sum + cell, 0);
}

export function isWin(brd: BoardType): boolean {
  return brd.some((row) => row.some((cell) => cell >= 128));
}

export function isGameOver(brd: BoardType): boolean {
  // 0이 있는지 확인 -> 있으면 게임 안끝남
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (brd[i]?.[j] === 0) {
        return false;
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const current = brd[i]?.[j];

      if (current === brd[i]?.[j + 1]) {
        return false;
      }
      if (current === brd[i + 1]?.[j]) {
        return false;
      }
    }
  }

  if (brd[3]?.[3] === brd[2]?.[3] || brd[3]?.[3] === brd[3]?.[2]) {
    return false;
  }

  return true;
}
