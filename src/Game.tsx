import React, { useEffect, useState } from 'react';

import Board from './Board.tsx';

const Game = () => {
  const [board, setBoard] = useState<BoardType>(initializeBoard());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameOver && !win) {
        switch (e.key) {
          case 'ArrowLeft':
            moveLeft();
            break;
          case 'ArrowUp':
            moveUp();
            break;
          case 'ArrowRight':
            moveRight();
            break;
          case 'ArrowDown':
            moveDown();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  function initializeBoard() {
    const newBoard = Array(4)
      .fill()
      .map(() => Array(4).fill(0));
    addNewTile(newBoard);
    addNewTile(newBoard);
    return newBoard;
  }

  function addNewTile(board) {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyCells.push({ i, j });
        }
      }
    }
    if (emptyCells.length > 0) {
      const { i, j } =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[i][j] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  const move = (direction: Direction) => {
    if (gameOver || win) return;

    const newBoard = JSON.parse(JSON.stringify(board));
    let changed = false;

    const moveAndMerge = (line: number[]) => {
      let filtered = line.filter((num) => num !== 0);

      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          filtered[i + 1] = 0;
          changed = true;
        }
      }
      filtered = filtered.filter((num) => num !== 0);

      while (filtered.length < 4) {
        filtered.push(0);
      }

      return filtered;
    };

    switch (direction) {
      case 'left':
        for (let i = 0; i < 4; i++) {
          const newLine = moveAndMerge(newBoard[i]);
          if (newLine.some((val, index) => val !== newBoard[i][index])) {
            changed = true;
          }
          newBoard[i] = newLine;
        }
        break;

      case 'right':
        for (let i = 0; i < 4; i++) {
          const newLine = moveAndMerge(newBoard[i].reverse()).reverse();
          if (newLine.some((val, index) => val !== newBoard[i][index])) {
            changed = true;
          }
          newBoard[i] = newLine;
        }
        break;

      case 'up':
        for (let j = 0; j < 4; j++) {
          const column = [
            newBoard[0][j],
            newBoard[1][j],
            newBoard[2][j],
            newBoard[3][j],
          ];
          const newColumn = moveAndMerge(column);
          if (newColumn.some((val, index) => val !== newBoard[index][j])) {
            changed = true;
          }
          for (let i = 0; i < 4; i++) {
            newBoard[i][j] = newColumn[i];
          }
        }
        break;

      case 'down':
        for (let j = 0; j < 4; j++) {
          const column = [
            newBoard[3][j],
            newBoard[2][j],
            newBoard[1][j],
            newBoard[0][j],
          ];
          const newColumn = moveAndMerge(column);
          if (newColumn.some((val, index) => val !== newBoard[3 - index][j])) {
            changed = true;
          }
          for (let i = 0; i < 4; i++) {
            newBoard[i][j] = newColumn[3 - i];
          }
        }
        break;
    }

    if (changed) {
      addNewTile(newBoard);
      setBoard(newBoard);
      setScore(calculateScore(newBoard));
      if (isWin(newBoard)) {
        setWin(true);
      } else if (isGameOver(newBoard)) {
        setGameOver(true);
      }
    }
  };

  function moveLeft() {
    move('left');
  }

  function moveRight() {
    move('right');
  }

  function moveUp() {
    move('up');
  }

  function moveDown() {
    move('down');
  }

  function calculateScore(board: BoardType) {
    return board.flat().reduce((sum, cell) => sum + cell, 0);
  }

  function isWin(board: BoardType) {
    return board.some((row) => row.some((cell) => cell >= 128));
  }

  function isGameOver(board: BoardType) {
    // Implement game over logic
    return false;
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
        <div className="scores-container">
          <div className="score-container">Score: {score}</div>
        </div>
      </div>
      <Board board={board} />
      {gameOver && <div className="game-message">Game Over!</div>}
      {win && <div className="game-message">You Win!</div>}
      <button onClick={restartGame}>New Game</button>
    </div>
  );
};

type Direction = 'left' | 'right' | 'up' | 'down';
type BoardType = number[][];

export default Game;
