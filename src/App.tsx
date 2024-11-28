import Game from './Game.tsx';
import { Header } from './Header.tsx';

function App() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <Game />
    </div>
  );
}

export default App;
