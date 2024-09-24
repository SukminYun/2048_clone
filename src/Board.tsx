import Tile from './Tile.tsx';

const Board = ({ board }) => {
  return (
    <div className="board">
      {board.map((row, i) =>
        row.map((value, j) => <Tile key={`${i}-${j}`} value={value} />),
      )}
    </div>
  );
};

export default Board;
