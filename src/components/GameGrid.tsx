import React from 'react';
import { Position } from '@/types/game';
import { GRID_WIDTH, GRID_HEIGHT } from '@/types/game';

interface GameGridProps {
  snake: Position[];
  food: Position;
  blockers: Position[];
}

export const GameGrid: React.FC<GameGridProps> = ({ snake, food, blockers }) => {
  const cells = [];

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
      const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
      const isFood = food.x === x && food.y === y;
      const isBlocker = blockers.some(blocker => blocker.x === x && blocker.y === y);

      let className = 'grid-cell';
      
      if (isSnakeHead) {
        className += ' snake-head';
      } else if (isSnakeBody) {
        className += ' snake-body';
      } else if (isFood) {
        className += ' food';
      } else if (isBlocker) {
        className += ' blocker';
      }

      cells.push(
        <div
          key={`${x}-${y}`}
          className={className}
          style={{
            // Add inline styles as fallback to ensure visibility
            backgroundColor: isSnakeHead ? '#00ff41' : 
                           isSnakeBody ? '#00cc33' : 
                           isFood ? '#ffff00' : 
                           isBlocker ? '#ff4444' : '#001100'
          }}
        />
      );
    }
  }

  return (
    <div 
      className="game-grid crt-screen"
      style={{
        gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_HEIGHT}, 1fr)`,
        aspectRatio: `${GRID_WIDTH} / ${GRID_HEIGHT}`,
        width: '90vw',
        maxWidth: '400px',
        height: 'auto'
      }}
    >
      {cells}
    </div>
  );
};