type Tiletype = {
  value: number;
};

const Tile = ({ value }: Tiletype) => {
  const getColorClass = (tailVal: number) => {
    switch (tailVal) {
      case 2:
        return 'bg-blue-200';
      case 4:
        return 'bg-blue-300';
      case 8:
        return 'bg-blue-400';
      case 16:
        return 'bg-purple-200';
      case 32:
        return 'bg-purple-300';
      case 64:
        return 'bg-pink-200';
      case 128:
        return 'bg-purple-400';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div
      className={`w-24 h-24 rounded-md flex justify-center items-center text-4xl font-bold text-gray-700 ${getColorClass(value)}`}
    >
      {value > 0 ? value : ''}
    </div>
  );
};

export default Tile;
