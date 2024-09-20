import './App.css';

import SimpleGrid from './4by4Grid.tsx';

function App() {
  return (
    <div className="container">
      <div className="title">2048 Game</div>
      <a href="https://play2048.co">Original game link</a>
      <SimpleGrid />
    </div>
  );
}

export default App;
