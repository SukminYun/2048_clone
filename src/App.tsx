import './App.css';

import Game from './Game.tsx';

function App() {
  return (
    <div className="game">
      <div className="header">
        <div className="title">2048 Game</div>
        <a href="https://play2048.co">
          <img
            src="./assets/2048.png"
            className="origin-link"
            alt="Original game link"
          />
        </a>
      </div>
      <div>
        <Game />
      </div>
    </div>
  );
}

export default App;
