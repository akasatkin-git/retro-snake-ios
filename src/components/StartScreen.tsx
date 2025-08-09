import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Trophy, Settings } from 'lucide-react';

interface StartScreenProps {
  highScore: number;
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ highScore, onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="text-center max-w-md mx-auto">
        {/* Logo/Title */}
        <div className="mb-8">
          <h1 className="glow-text text-5xl font-bold mb-4 animate-glow">
            SNAKE
          </h1>
          <div className="text-lg opacity-75 font-mono">
            RETRO EDITION
          </div>
        </div>

        {/* High Score Display */}
        {highScore > 0 && (
          <div className="mb-8 p-4 border border-border rounded bg-card">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-sm opacity-75">HIGH SCORE</span>
            </div>
            <div className="score-display text-2xl">
              {highScore.toString().padStart(4, '0')}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mb-8 text-sm opacity-75 space-y-2">
          <div>🐍 Eat food to grow longer</div>
          <div>📱 Swipe to change direction</div>
          <div>⚡ Don't hit walls or yourself</div>
        </div>

        {/* Start Button */}
        <Button 
          onClick={onStart}
          className="retro-button w-full py-4 text-lg mb-4"
        >
          <Play className="w-5 h-5 mr-2" />
          START GAME
        </Button>

        {/* Footer */}
        <div className="text-xs opacity-50 mt-8">
          Classic Snake • Built with ❤️
        </div>
      </div>
    </div>
  );
};