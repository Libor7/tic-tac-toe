/** LIBRARIES */
import { createSlice, configureStore } from "@reduxjs/toolkit";

/** MODELS */
import {
  GlobalVariablesState,
  GridState,
  IconState,
  ResultState,
} from "../models/State";

/** CUSTOM */
import { setNewGrid } from "../util/util";

const initialIconState: IconState = {
  allControlsDisplayed: false,
};

const initialGridState: GridState = {
  grid: setNewGrid(3, 3),
  lastMove: null,
  gridRows: 3,
  gridColumns: 3,
  maxGridRows: 3,
  maxGridColumns: 3,
};

const initialResultState: ResultState = {
  playAgainstComp: false,
  computerPlaysAs: "nought",
  noughtsPlayerPoints: 0,
  crossesPlayerPoints: 0,
  starts: "cross",
};

const initialGlobalVariablesState: GlobalVariablesState = {
  /** In px */
  largeMobileBreakpoint: 600,
  /** In px */
  tabletBreakpoint: 900,
  /** In px */
  desktopBreakpoint: 1200,
  /** Size in px */
  buttonSide: 64,
  /** Size in px */
  squareSide: 58,
  /** Size in px */
  controlPanelWidth: 0,
  /** Size in px */
  resultBarHeight: 0,
};

const iconSlice = createSlice({
  name: "icons",
  initialState: initialIconState,
  reducers: {
    showAllControls(state) {
      return {
        ...state,
        allControlsDisplayed: true,
      };
    },
    hideAllControls(state) {
      return {
        ...state,
        allControlsDisplayed: false,
      };
    },
  },
});

const gridSlice = createSlice({
  name: "grid",
  initialState: initialGridState,
  reducers: {
    incrementGridRows(state) {
      return {
        ...state,
        grid: setNewGrid(state.gridColumns, state.gridRows + 1),
        lastMove: null,
        gridRows: state.gridRows + 1,
      };
    },
    decrementGridRows(state) {
      return {
        ...state,
        grid: setNewGrid(state.gridColumns, state.gridRows - 1),
        lastMove: null,
        gridRows: state.gridRows - 1,
      };
    },
    incrementGridColumns(state) {
      return {
        ...state,
        grid: setNewGrid(state.gridColumns + 1, state.gridRows),
        lastMove: null,
        gridColumns: state.gridColumns + 1,
      };
    },
    decrementGridColumns(state) {
      return {
        ...state,
        grid: setNewGrid(state.gridColumns - 1, state.gridRows),
        lastMove: null,
        gridColumns: state.gridColumns - 1,
      };
    },
    setMaxGridRows(state, action) {
      return {
        ...state,
        maxGridRows: action.payload as number,
      };
    },
    setMaxGridColumns(state, action) {
      return {
        ...state,
        maxGridColumns: action.payload as number,
      };
    },
    setNewGame(state) {
      return {
        ...state,
        grid: setNewGrid(3, 3),
        lastMove: null,
        gridRows: 3,
        gridColumns: 3,
      };
    },
    setSquareValue() {
      // zmeniť hodnotu square - možno aj undoLastMove(state) - utils.ts možno
      // return {
      //   ...state,
      //   grid:
      // };
    },
    undoLastMove(state) {
      // zmeniť hodnotu v grid podla lastMove
      // return {
      //   ...state,
      //   grid:
      // };
    },
  },
});

const resultSlice = createSlice({
  name: "results",
  initialState: initialResultState,
  reducers: {
    toggleOpponent(state) {
      return {
        ...state,
        playAgainstComp: !state.playAgainstComp,
      };
    },
  },
});

const globalVariablesSlice = createSlice({
  name: "globalVars",
  initialState: initialGlobalVariablesState,
  reducers: {
    setControlPanelWidth(state, action) {
      return {
        ...state,
        controlPanelWidth: action.payload as number,
      };
    },
    setResultBarHeight(state, action) {
      return {
        ...state,
        resultBarHeight: action.payload as number,
      };
    },
  },
});

const store = configureStore({
  reducer: {
    icons: iconSlice.reducer,
    grid: gridSlice.reducer,
    result: resultSlice.reducer,
    globalVars: globalVariablesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const iconActions = iconSlice.actions;
export const gridActions = gridSlice.actions;
export const resultActions = resultSlice.actions;
export const globalVariablesActions = globalVariablesSlice.actions;

export default store;
