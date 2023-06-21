export interface PreviousMove {
  square: SquareCoordinates;
  previousVal: SquareStatus;
}

export interface SquareCoordinates {
  xAxis: number;
  yAxis: number;
}

export enum SquareStatus {
  EMPTY = 0,
  CIRCLE,
  CROSS,
  MARKED,
}

export enum Direction {
  UP = "Up",
  UPRIGHT = "UpRight",
  RIGHT = "Right",
  DOWNRIGHT = "DownRight",
  DOWN = "Down",
  DOWNLEFT = "DownLeft",
  LEFT = "Left",
  UPLEFT = "UpLeft",
}

export interface NeighbouringSquare {
  [key: string]: SquareCoordinates
}

export interface MarkedSquare {
  markedSquare: SquareCoordinates;
  squares: NeighbouringSquare[];
}
