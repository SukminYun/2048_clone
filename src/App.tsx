import Game from './Game.tsx';

function App() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-96 justify-evenly">
        <div className="text-4xl font-bold">2048 Game</div>
        <a href="https://play2048.co">
          <img
            src="./src/assets/2048.png"
            className="w-20 h-20"
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
