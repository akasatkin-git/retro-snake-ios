import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Direction, Position, INITIAL_SNAKE, GRID_WIDTH, GRID_HEIGHT, INITIAL_SPEED } from '@/types/game';

const getRandomPosition = (snake: Position[]): Position => {
  let position: Position;
  do {
    position = {
      x: Math.floor(Math.random() * GRID_WIDTH),
      y: Math.floor(Math.random() * GRID_HEIGHT)
    };
  } while (snake.some(segment => segment.x === position.x && segment.y === position.y));
  return position;
};

const getDirectionFromSwipe = (startX: number, startY: number, endX: number, endY: number): Direction | null => {
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);

  if (Math.max(absDeltaX, absDeltaY) < 50) return null; // Minimum swipe distance

  if (absDeltaX > absDeltaY) {
    return deltaX > 0 ? Direction.RIGHT : Direction.LEFT;
  } else {
    return deltaY > 0 ? Direction.DOWN : Direction.UP;
  }
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: [...INITIAL_SNAKE],
    food: getRandomPosition(INITIAL_SNAKE),
    direction: Direction.RIGHT,
    nextDirection: Direction.RIGHT,
    score: 0,
    isGameOver: false,
    isPaused: false,
    speed: INITIAL_SPEED
  });

  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snake-high-score');
    return saved ? parseInt(saved, 10) : 0;
  });

  const gameLoopRef = useRef<NodeJS.Timeout>();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const isOppositeDirection = (current: Direction, next: Direction): boolean => {
    return (
      (current === Direction.UP && next === Direction.DOWN) ||
      (current === Direction.DOWN && next === Direction.UP) ||
      (current === Direction.LEFT && next === Direction.RIGHT) ||
      (current === Direction.RIGHT && next === Direction.LEFT)
    );
  };

  const moveSnake = useCallback(() => {
    setGameState(prevState => {
      if (prevState.isGameOver || prevState.isPaused) return prevState;

      const { snake, food, direction, nextDirection } = prevState;
      
      // Update direction if it's valid
      const newDirection = isOppositeDirection(direction, nextDirection) ? direction : nextDirection;
      
      const head = snake[0];
      let newHead: Position;

      switch (newDirection) {
        case Direction.UP:
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case Direction.DOWN:
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case Direction.LEFT:
          newHead = { x: head.x - 1, y: head.y };
          break;
        case Direction.RIGHT:
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= GRID_WIDTH || newHead.y < 0 || newHead.y >= GRID_HEIGHT) {
        return { ...prevState, isGameOver: true };
      }

      // Check self collision
      if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        return { ...prevState, isGameOver: true };
      }

      const newSnake = [newHead, ...snake];
      let newFood = food;
      let newScore = prevState.score;

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        newFood = getRandomPosition(newSnake);
        newScore += 1;
        
        // Trigger haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        direction: newDirection,
        score: newScore
      };
    });
  }, []);

  const startGame = useCallback(() => {
    const initialSnake = [...INITIAL_SNAKE];
    setGameState({
      snake: initialSnake,
      food: getRandomPosition(initialSnake),
      direction: Direction.RIGHT,
      nextDirection: Direction.RIGHT,
      score: 0,
      isGameOver: false,
      isPaused: false,
      speed: INITIAL_SPEED
    });
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      isPaused: !prevState.isPaused
    }));
  }, []);

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState(prevState => ({
      ...prevState,
      nextDirection: newDirection
    }));
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current) return;
    
    const touch = e.changedTouches[0];
    const direction = getDirectionFromSwipe(
      touchStartRef.current.x,
      touchStartRef.current.y,
      touch.clientX,
      touch.clientY
    );
    
    if (direction) {
      changeDirection(direction);
    }
    
    touchStartRef.current = null;
  }, [changeDirection]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        changeDirection(Direction.UP);
        break;
      case 'ArrowDown':
        e.preventDefault();
        changeDirection(Direction.DOWN);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        changeDirection(Direction.LEFT);
        break;
      case 'ArrowRight':
        e.preventDefault();
        changeDirection(Direction.RIGHT);
        break;
      case ' ':
        e.preventDefault();
        pauseGame();
        break;
    }
  }, [changeDirection, pauseGame]);

  // Game loop
  useEffect(() => {
    if (!gameState.isGameOver && !gameState.isPaused) {
      gameLoopRef.current = setInterval(moveSnake, gameState.speed);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [moveSnake, gameState.speed, gameState.isGameOver, gameState.isPaused]);

  // Update high score
  useEffect(() => {
    if (gameState.score > highScore) {
      setHighScore(gameState.score);
      localStorage.setItem('snake-high-score', gameState.score.toString());
    }
  }, [gameState.score, highScore]);

  // Event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleKeyPress, handleTouchStart, handleTouchEnd]);

  return {
    gameState,
    highScore,
    startGame,
    pauseGame,
    changeDirection
  };
};