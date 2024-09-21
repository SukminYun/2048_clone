import React, { useEffect, useState } from 'react';

import moveTiles from './moveTiles.tsx';

function TileController({ state, setState }) {
  const handleKeyDown = (event) => {
    let newBoard;

    switch (event.key) {
      case 'ArrowLeft':
        newBoard = moveTiles({ board: state.board, dir: 0 });
        break;
      case 'ArrowUp':
        newBoard = moveTiles({ board: state.board, dir: 1 });
        break;
      case 'ArrowRight':
        newBoard = moveTiles({ board: state.board, dir: 2 });
        break;
      case 'ArrowDown':
        newBoard = moveTiles({ board: state.board, dir: 3 });
        break;
      default:
        return; // 관련 없는 키 입력시 함수 종료
    }

    setState((prevState) => ({
      ...prevState,
      board: newBoard,
    }));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="tile-container">
        {state.board.flat().map((value, index) => (
          <div key={index} className="tile">
            {value !== 0 && value}
          </div>
        ))}
      </div>
    </>
  );
}

export default TileController;
