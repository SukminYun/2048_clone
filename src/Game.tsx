import { useEffect, useState } from 'react';

import Board from './Board/Board.tsx';
import {
  calculateScore,
  initializeBoard,
  isGameOver,
  isWin,
} from './Board/boardControler.tsx';
import {
  addNewTile,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from './Tile/moveTile.tsx';
type BoardType = number[][];

const Game = () => {
  const [board, setBoard] = useState<BoardType>(initializeBoard());
  const [score, setScore] = useState<number>(0);
  const [bscore, setBscore] = useState<number>(0);
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

        if (calculateScore(newboard) >= bscore) {
          setBscore(calculateScore(newboard));
        }
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

  function restartGame() {
    setBoard(initializeBoard());
    setScore(0);
    setGameOver(false);
    setWin(false);
  }

  return (
    <div className="w-100 mx-auto">
      <div className="flex justify-between">
        <div className="block mx-auto my-4 px-8 py-2 text-lg bg-blue-400 text-white rounded">
          Score: {score}
        </div>
        <div className="block mx-auto my-4 px-8 py-2 text-lg bg-blue-400 text-white rounded">
          Best: {bscore}
        </div>
        <button
          className="block mx-auto my-4 px-8 py-2 text-lg bg-blue-400 text-white rounded"
          onClick={restartGame}
        >
          New Game
        </button>
      </div>
      <Board board={board} />
      {gameOver && (
        <div className="w-1/5 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 text-center text-4xl font-bold rounded-lg border-4 border-blue-400">
          Game Over!
        </div>
      )}
      {win && (
        <div className="w-1/5 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 text-center text-4xl font-bold rounded-lg border-4 border-blue-400">
          You Win!
        </div>
      )}
    </div>
  );
};

export default Game;
