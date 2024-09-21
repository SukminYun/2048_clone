import './App.css';

import { useState } from 'react';

import SimpleGrid from './SimpleGrid.tsx';
import TileControler from './TileController.tsx';

function App() {
  const [state, setState] = useState({
    board: [
      [0, 0, 2, 2],
      [0, 2, 0, 0],
      [2, 0, 0, 0],
      [0, 4, 2, 0],
    ],
  });

  return (
    <div className="container upper">
      <div className="title">2048 Game</div>
      <a href="https://play2048.co">Original game link</a>
      <div className="game-container">
        <SimpleGrid />
        <TileControler state={state} setState={setState} />
      </div>
    </div>
  );
}

export default App;
