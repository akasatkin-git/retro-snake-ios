import React, { useState } from 'react';
import { useGame } from '@/hooks/useGame';
import { StartScreen } from '@/components/StartScreen';
import { GameGrid } from '@/components/GameGrid';
import { GameHUD } from '@/components/GameHUD';
import { GameOverScreen } from '@/components/GameOverScreen';
import { PauseScreen } from '@/components/PauseScreen';

type GameScreen = 'start' | 'playing' | 'paused' | 'gameOver';

export const SnakeGame: React.FC = () => {
  const { gameState, highScore, startGame, pauseGame } = useGame();
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('start');

  const handleStart = () => {
    startGame();
    setCurrentScreen('playing');
  };

  const handlePause = () => {
    pauseGame();
    setCurrentScreen(gameState.isPaused ? 'playing' : 'paused');
  };

  const handleRestart = () => {
    startGame();
    setCurrentScreen('playing');
  };

  const handleHome = () => {
    setCurrentScreen('start');
  };

  // Auto-switch to game over screen
  React.useEffect(() => {
    if (gameState.isGameOver && currentScreen === 'playing') {
      setCurrentScreen('gameOver');
    }
  }, [gameState.isGameOver, currentScreen]);

  // Auto-switch to paused screen
  React.useEffect(() => {
    if (gameState.isPaused && currentScreen === 'playing') {
      setCurrentScreen('paused');
    } else if (!gameState.isPaused && currentScreen === 'paused') {
      setCurrentScreen('playing');
    }
  }, [gameState.isPaused, currentScreen]);

  if (currentScreen === 'start') {
    return <StartScreen highScore={highScore} onStart={handleStart} />;
  }

  const isNewHighScore = gameState.score > highScore;

  return (
    <div 
      className="h-full w-full flex flex-col bg-background relative overflow-hidden"
      style={{ 
        height: '100dvh',
        touchAction: 'pan-x pan-y',
        overscrollBehavior: 'none'
      }}
      onTouchMove={(e) => {
        // Only prevent default if not clicking on buttons or UI elements
        const target = e.target as Element;
        if (!target.closest('button') && !target.closest('[role="button"]')) {
          e.preventDefault();
        }
      }}
    >
      <GameHUD 
        score={gameState.score}
        highScore={highScore}
        isPaused={gameState.isPaused}
        onPause={handlePause}
        level={gameState.level}
        foodEatenThisLevel={gameState.foodEatenThisLevel}
      />
      
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <GameGrid snake={gameState.snake} food={gameState.food} blockers={gameState.blockers} />
        
        {currentScreen === 'gameOver' && (
          <GameOverScreen
            score={gameState.score}
            highScore={Math.max(highScore, gameState.score)}
            isNewHighScore={isNewHighScore}
            onRestart={handleRestart}
            onHome={handleHome}
          />
        )}
        
        {currentScreen === 'paused' && (
          <PauseScreen
            onResume={handlePause}
            onRestart={handleRestart}
            onHome={handleHome}
          />
        )}
      </div>
    </div>
  );
};