import { PreviousMove } from "./Square";

export interface IconState {
  allControlsDisplayed: boolean;
}

export interface GridState {
  grid: number[][];
  lastMove: PreviousMove | null;
  gridRows: number;
  gridColumns: number;
  maxGridRows: number;
  maxGridColumns: number;
}

export interface ResultState {
  playAgainstComp: boolean;
  computerPlaysAs: string;
  noughtsPlayerPoints: number;
  crossesPlayerPoints: number;
  starts: string;
}

export interface GlobalVariablesState {
  largeMobileBreakpoint: number;
  tabletBreakpoint: number;
  desktopBreakpoint: number;
  buttonSide: number;
  squareSide: number;
  controlPanelWidth: number;
  resultBarHeight: number;
}
