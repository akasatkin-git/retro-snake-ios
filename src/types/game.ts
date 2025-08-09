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