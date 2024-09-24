const Tile = ({ value }) => {
  const classNames = ['tile'];
  if (value > 0) {
    classNames.push(`tile-${value}`);
  }

  return <div className={classNames.join(' ')}>{value > 0 ? value : ''}</div>;
};

export default Tile;
