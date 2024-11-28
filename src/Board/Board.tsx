import Tile from '../Tile/Tile.tsx';
type BoardType = {
  board: number[][];
};

const Board = ({ board }: BoardType) => {
  return (
    <div className="grid grid-cols-4 gap-4 bg-blue-400 rounded-lg p-4">
      {board.map((row: number[], i: number) =>
        row.map((value, j) => <Tile key={`${i}-${j}`} value={value} />),
      )}
    </div>
  );
};

export default Board;
