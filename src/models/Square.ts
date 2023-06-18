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
  UP = "up",
  UPRIGHT = "up-right",
  RIGHT = "right",
  DOWNRIGHT = "down-right",
  DOWN = "down",
  DOWNLEFT = "down-left",
  LEFT = "left",
  UPLEFT = "up-left",
}

export interface NeighbouringSquare {
  [key: string]: SquareCoordinates
}

export interface MarkedSquare {
  markedSquare: SquareCoordinates;
  squares: NeighbouringSquare[];
}

// export interface FoundSquares {
//   empty: SquareCoordinates[];
//   myMarks: SquareCoordinates[];
//   engineMarks: SquareCoordinates[];
// }
