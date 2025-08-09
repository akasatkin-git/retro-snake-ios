import React from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play } from 'lucide-react';

interface GameHUDProps {
  score: number;
  highScore: number;
  isPaused: boolean;
  onPause: () => void;
  level: number;
  foodEatenThisLevel: number;
}

export const GameHUD: React.FC<GameHUDProps> = ({ score, highScore, isPaused, onPause, level, foodEatenThisLevel }) => {
  const FOOD_PER_LEVEL = 10;
  
  return (
    <div className="flex justify-between items-center w-full px-4 py-3 bg-card border-b border-border">
      <div className="score-display text-xs">
        <div>SCORE: {score.toString().padStart(4, '0')}</div>
        <div>BEST: {highScore.toString().padStart(4, '0')}</div>
      </div>
      
      <div className="text-center">
        <div className="score-display text-sm mb-1">
          LEVEL {level}
        </div>
        <div className="text-xs opacity-70">
          {foodEatenThisLevel}/{FOOD_PER_LEVEL}
        </div>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onPause}
        className="retro-button p-2"
      >
        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
      </Button>
    </div>
  );
};