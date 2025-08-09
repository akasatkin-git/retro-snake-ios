import React from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play } from 'lucide-react';

interface GameHUDProps {
  score: number;
  highScore: number;
  isPaused: boolean;
  onPause: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({ score, highScore, isPaused, onPause }) => {
  return (
    <div className="flex justify-between items-center w-full px-4 py-3 bg-card border-b border-border">
      <div className="score-display text-sm">
        SCORE: {score.toString().padStart(4, '0')}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onPause}
        className="retro-button p-2"
      >
        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
      </Button>
      
      <div className="score-display text-sm">
        BEST: {highScore.toString().padStart(4, '0')}
      </div>
    </div>
  );
};