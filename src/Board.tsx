import Tile from './Tile.tsx';
type BoardType = {
  board: number[][];
};

const Board = ({ board }: BoardType) => {
  return (
    <div className="board">
      {board.map((row: number[], i: number) =>
        row.map((value, j) => <Tile key={`${i}-${j}`} value={value} />),
      )}
    </div>
  );
};

export default Board;
