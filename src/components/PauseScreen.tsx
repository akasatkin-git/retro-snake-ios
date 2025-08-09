import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Home, RotateCcw } from 'lucide-react';

interface PauseScreenProps {
  onResume: () => void;
  onRestart: () => void;
  onHome: () => void;
}

export const PauseScreen: React.FC<PauseScreenProps> = ({ onResume, onRestart, onHome }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className="game-over-overlay p-8 rounded-lg text-center max-w-sm mx-4">
        <h2 className="glow-text text-2xl font-bold mb-6">
          PAUSED
        </h2>
        
        <div className="space-y-3">
          <Button 
            onClick={onResume}
            className="retro-button w-full flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            RESUME
          </Button>
          
          <Button 
            onClick={onRestart}
            variant="outline"
            className="retro-button w-full flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            RESTART
          </Button>
          
          <Button 
            onClick={onHome}
            variant="outline"
            className="retro-button w-full flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            HOME
          </Button>
        </div>
        
        <div className="text-xs opacity-50 mt-6">
          Swipe or use arrow keys to control
        </div>
      </div>
    </div>
  );
};