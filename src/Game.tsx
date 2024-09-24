import { useEffect, useState } from 'react';

import Board from './Board.tsx';
type BoardType = number[][];

const Game = () => {
  const [board, setBoard] = useState<BoardType>(initializeBoard());
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let newboard;
      if (!gameOver && !win) {
        switch (e.key) {
          case 'ArrowLeft':
            newboard = moveLeft(board);
            break;
          case 'ArrowUp':
            newboard = moveUp(board);
            break;
          case 'ArrowRight':
            newboard = moveRight(board);
            break;
          case 'ArrowDown':
            newboard = moveDown(board);
            break;
          default:
            break;
        }
      }

      // 변화 있는지 검사
      if (JSON.stringify(board) !== JSON.stringify(newboard)) {
        newboard = addNewTile(newboard as BoardType);
        setBoard(newboard);
        setScore(calculateScore(newboard));
      }
      if (isGameOver(newboard as BoardType)) {
        setGameOver(true);
      }

      if (isWin(newboard as BoardType)) {
        setWin(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  function initializeBoard(): BoardType {
    const newBoard = Array(4)
      .fill(0)
      .map(() => Array<number>(4).fill(0));
    addNewTile(newBoard);
    addNewTile(newBoard);
    return newBoard;
  }

  // 주어진 row, col에 value를 설정
  function setTail(
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

  function addNewTile(brd: BoardType): BoardType {
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
      const newGrid = setTail(brd, row, col, setv);

      return newGrid;
    }
    return brd;
  }

  function moveLeft(grid: BoardType): BoardType {
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
          newboard = setTail(newboard, j, x - 1, newboard[j]?.[x] as number);
          newboard = setTail(newboard, j, x, 0);
          x--;
        }

        // 합치기 단계 (합쳐진 곳에서 안합쳐지도록)
        if (
          x > 0 &&
          newboard[j]?.[x - 1] === newboard[j]?.[x] &&
          isMerge[j]?.[x - 1] !== 1
        ) {
          newboard = setTail(
            newboard,
            j,
            x - 1,
            (newboard[j]?.[x - 1] as number) * 2,
          );
          newboard = setTail(newboard, j, x, 0);
          isMerge = setTail(isMerge, j, x - 1, 1);
        }
      }
    }
    return newboard;
  }

  function moveRight(grid: BoardType): BoardType {
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
          newboard = setTail(newboard, j, x + 1, newboard[j]?.[x] as number);
          newboard = setTail(newboard, j, x, 0);
          x++;
        }

        // 합치기 단계 (합쳐진 곳에서 안합쳐지도록)
        if (
          x < 3 &&
          newboard[j]?.[x + 1] === newboard[j]?.[x] &&
          isMerge[j]?.[x + 1] !== 1
        ) {
          newboard = setTail(
            newboard,
            j,
            x - 1,
            (newboard[j]?.[x + 1] as number) * 2,
          );
          newboard = setTail(newboard, j, x, 0);
          isMerge = setTail(isMerge, j, x + 1, 1);
        }
      }
    }
    return newboard;
  }

  function moveUp(grid: BoardType): BoardType {
    let newboard = grid.map((line) => [...line]);
    let isMerge = Array(4)
      .fill(0)
      .map(() => Array<number>(4).fill(0));
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (newboard[j]?.[i] === 0) continue;
        let y = i;

        // 0 안나올 때까지 위쪽으로 한칸씩
        while (y > 0 && newboard[y - 1]?.[j] === 0) {
          newboard = setTail(newboard, y - 1, j, newboard[y]?.[j] as number);
          newboard = setTail(newboard, y, j, 0);
          y--;
        }

        // 합치기 단계 (합쳐진 곳에서 안합쳐지도록)
        if (
          y > 0 &&
          newboard[y - 1]?.[j] === newboard[y]?.[j] &&
          isMerge[y - 1]?.[j] !== 1
        ) {
          newboard = setTail(
            newboard,
            y - 1,
            j,
            (newboard[y - 1]?.[j] as number) * 2,
          );
          newboard = setTail(newboard, y, j, 0);
          isMerge = setTail(isMerge, y - 1, j, 1);
        }
      }
    }
    return newboard;
  }

  function moveDown(grid: BoardType): BoardType {
    let newboard = grid.map((line) => [...line]);
    let isMerge = Array(4)
      .fill(0)
      .map(() => Array<number>(4).fill(0));
    for (let i = 3; i > 0; i--) {
      for (let j = 0; j < 4; j++) {
        if (newboard[j]?.[i] === 0) continue;
        let y = i;

        // 0 안나올 때까지 아래쪽으로 한칸씩
        while (y < 3 && newboard[y + 1]?.[j] === 0) {
          newboard = setTail(newboard, y + 1, j, newboard[y]?.[j] as number);
          newboard = setTail(newboard, y, j, 0);
          y++;
        }

        // 합치기 단계 (합쳐진 곳에서 안합쳐지도록)
        if (
          y < 3 &&
          newboard[y + 1]?.[j] === newboard[y]?.[j] &&
          isMerge[y + 1]?.[j] !== 1
        ) {
          newboard = setTail(
            newboard,
            y + 1,
            j,
            (newboard[y - 1]?.[j] as number) * 2,
          );
          newboard = setTail(newboard, y, j, 0);
          isMerge = setTail(isMerge, y + 1, j, 1);
        }
      }
    }
    return newboard;
  }

  function calculateScore(brd: BoardType): number {
    return brd.flat().reduce((sum, cell) => sum + cell, 0);
  }

  function isWin(brd: BoardType): boolean {
    return brd.some((row) => row.some((cell) => cell >= 128));
  }

  function isGameOver(brd: BoardType): boolean {
    const size = brd.length;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (brd[i]?.[j] === 0) {
          return false;
        }
      }
    }

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const current = board[i]?.[j];

        if (j < size - 1 && current === board[i]?.[j + 1]) {
          return false;
        }
        if (i < size - 1 && current === board[i + 1]?.[j]) {
          return false;
        }
      }
    }
    return true;
  }

  function restartGame() {
    setBoard(initializeBoard());
    setScore(0);
    setGameOver(false);
    setWin(false);
  }

  return (
    <div className="game">
      <div className="game-header">
        <div className="score-container">Score: {score}</div>
      </div>
      <Board board={board} />
      {gameOver && <div className="game-message">Game Over!</div>}
      {win && <div className="game-message">You Win!</div>}
      <button onClick={restartGame}>New Game</button>
    </div>
  );
};

export default Game;
