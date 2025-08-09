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
    <div className="min-h-screen flex flex-col bg-background relative">
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
      
      {/* Touch control instructions */}
      <div className="text-center p-4 text-xs opacity-50">
        Swipe to control • Space to pause • Arrow keys supported
      </div>
    </div>
  );
};