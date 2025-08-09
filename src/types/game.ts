export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  isGameOver: boolean;
  isPaused: boolean;
  speed: number;
  level: number;
  foodEatenThisLevel: number;
  blockers: Position[];
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export interface GameSettings {
  gridWidth: number;
  gridHeight: number;
  initialSpeed: number;
  enableSound: boolean;
  enableHaptics: boolean;
}

export const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];

export const GRID_WIDTH = 20;
export const GRID_HEIGHT = 30;
export const INITIAL_SPEED = 200; // milliseconds between moves
export const FOOD_PER_LEVEL = 10;
export const MAX_LEVELS = 8;
export const SPEED_DECREASE_PER_LEVEL = 20; // Makes game faster each level

// Generate blockers for each level
export const generateBlockersForLevel = (level: number): Position[] => {
  const blockers: Position[] = [];
  const numBlockers = Math.min(level * 2, 16); // Increase blockers each level, max 16
  
  // Ensure we don't place blockers on initial snake position or too close
  const avoidPositions = [
    ...INITIAL_SNAKE,
    // Add some buffer around initial snake
    { x: 7, y: 10 }, { x: 11, y: 10 }, { x: 10, y: 9 }, { x: 10, y: 11 }
  ];
  
  while (blockers.length < numBlockers) {
    const position = {
      x: Math.floor(Math.random() * GRID_WIDTH),
      y: Math.floor(Math.random() * GRID_HEIGHT)
    };
    
    // Check if position conflicts with avoided positions or existing blockers
    const conflicts = avoidPositions.some(avoid => 
      avoid.x === position.x && avoid.y === position.y
    ) || blockers.some(blocker => 
      blocker.x === position.x && blocker.y === position.y
    );
    
    if (!conflicts) {
      blockers.push(position);
    }
  }
  
  return blockers;
};