import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Home } from 'lucide-react';

interface GameOverScreenProps {
  score: number;
  highScore: number;
  isNewHighScore: boolean;
  onRestart: () => void;
  onHome: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  score, 
  highScore, 
  isNewHighScore, 
  onRestart, 
  onHome 
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className="game-over-overlay p-8 rounded-lg text-center max-w-sm mx-4">
        <h2 className="glow-text text-2xl font-bold mb-4 text-destructive animate-flicker">
          GAME OVER
        </h2>
        
        <div className="mb-6 space-y-2">
          <div className="score-display text-lg">
            FINAL SCORE: {score.toString().padStart(4, '0')}
          </div>
          
          {isNewHighScore && (
            <div className="text-yellow-400 font-bold animate-pulse">
              🎉 NEW HIGH SCORE! 🎉
            </div>
          )}
          
          <div className="score-display text-sm opacity-75">
            BEST: {highScore.toString().padStart(4, '0')}
          </div>
        </div>
        
        <div className="flex gap-3 justify-center">
          <Button 
            onClick={onRestart}
            className="retro-button flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            PLAY AGAIN
          </Button>
          
          <Button 
            onClick={onHome}
            className="retro-button flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            HOME
          </Button>
        </div>
      </div>
    </div>
  );
};