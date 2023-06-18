import { Mark } from "./Icon";
import { PreviousMove, SquareCoordinates, SquareStatus } from "./Square";

export interface IconState {
  allControlsDisplayed: boolean;
}

export interface GridState {
  grid: SquareStatus[][];
  clickedSquare: SquareCoordinates | null;
  lastMove: PreviousMove | null;
  gridRows: number;
  gridColumns: number;
  maxGridRows: number;
  maxGridColumns: number;
}

export interface ResultState {
  endOfGameFlag: boolean;
  playAgainstComp: boolean;
  engineStarts: boolean;
  noughtsPlayerPoints: number;
  crossesPlayerPoints: number;
  moves: "cross" | "nought";
  marks: Mark[];
  waitingForEngineResponse: boolean;
}

export interface GlobalVariablesState {
  largeMobileBreakpoint: number;
  tabletBreakpoint: number;
  desktopBreakpoint: number;
  buttonSide: number;
  squareSide: number;
}
