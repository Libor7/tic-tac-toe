import { Mark } from "./Icon";
import { PreviousMove, SquareStatus } from "./Square";

export interface IconState {
  allControlsDisplayed: boolean;
}

export interface GridState {
  grid: SquareStatus[][];
  lastMove: PreviousMove | null;
  gridRows: number;
  gridColumns: number;
  maxGridRows: number;
  maxGridColumns: number;
}

export interface ResultState {
  playAgainstComp: boolean;
  computerPlaysAs: "cross" | "nought";
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
