import { useEffect, useState } from 'react';

const DirectionKeyHandler = () => {
  const [direction, setDirection] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('위');
          break;
        case 'ArrowDown':
          setDirection('아래');
          break;
        case 'ArrowLeft':
          setDirection('왼쪽');
          break;
        case 'ArrowRight':
          setDirection('오른쪽');
          break;
        default:
          setDirection('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <h2>방향키 이벤트 처리</h2>
      <p className="text-lg">
        {direction !== ''
          ? `${direction} 방향키가 눌렸습니다.`
          : '방향키를 눌러보세요.'}
      </p>
    </div>
  );
};

export default DirectionKeyHandler;
