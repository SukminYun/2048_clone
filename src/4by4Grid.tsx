import { useState } from 'react';

// import DirectionKeyHandler from './directionControler.tsx';

const SimpleGrid = () => {
  const [board, setBoard] = useState([
    [0, 0, 2, 2],
    [0, 2, 0, 4],
    [2, 0, 0, 8],
    [0, 4, 2, 16],
  ]);

  return (
    <div className="Grid">
      {board.flat().map((value, index) => (
        <div key={index} className="tail">
          {value !== 0 && value}
        </div>
      ))}
    </div>
  );
};

export default SimpleGrid;
