import './App.css';

import Game from './Game.tsx';

function App() {
  return (
    <>
      <div className="title">2048 Game</div>
      <a href="https://play2048.co">Original game link</a>
      <div>
        <Game />
      </div>
    </>
  );
}

export default App;
