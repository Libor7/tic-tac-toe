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
