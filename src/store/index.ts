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
import { getSquareValue, setNewGrid, setSquare } from "../util/util";

const initialIconState: IconState = {
  allControlsDisplayed: false,
};

const initialGridState: GridState = {           // TODO Splitting Our Code poznamky , kto má viac bodov vysvietiť na zeleno, prehrávajúci na červeno 
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
  moves: "cross",
  marks: [
    {
      label: "cross",
      name: "close",
    },
    {
      label: "nought",
      name: "radio_button_unchecked",
    },
  ],
  waitingForEngineResponse: false,
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
    setNewGame(state, action) {
      return {
        ...state,
        grid: setNewGrid(action.payload.cols, action.payload.rows),
        lastMove: null,
        gridColumns: action.payload.cols,
        gridRows: action.payload.rows,
      };
    },
    setSquareValue(state, action) {
      return {
        ...state,
        grid: setSquare(
          action.payload.col,
          action.payload.row,
          action.payload.value,
          [...state.grid]
        ),
        lastMove: {
          square: {
            xAxis: action.payload.col,
            yAxis: action.payload.row,
          },
          previousVal: getSquareValue(
            action.payload.col,
            action.payload.row,
            state.grid
          ),
        },
      };
    },
    undoLastMove(state) {
      return {
        ...state,
        grid: setSquare(
          state.lastMove?.square.xAxis!,
          state.lastMove?.square.yAxis!,
          state.lastMove?.previousVal!,
          [...state.grid]
        ),
        lastMove: null,
      };
    },
  },
});

const resultSlice = createSlice({
  name: "results",
  initialState: initialResultState,
  reducers: {
    setWhoMoves(state, action) {
      return {
        ...state,
        moves: action.payload,
      };
    },
    toggleOpponent(state) {
      return {
        ...state,
        playAgainstComp: !state.playAgainstComp,
      };
    },
    toggleOwnMark(state) {
      return {
        ...state,
        computerPlaysAs: state.computerPlaysAs === 'nought' ? 'cross' : 'nought',
      };
    },
    toggleWhoMoves(state) {
      return {
        ...state,
        moves: state.moves === 'cross' ? 'nought' : 'cross',
      };
    },
    toggleWaitingForEngineResponse(state) {
      return {
        ...state,
        waitingForEngineResponse: !state.waitingForEngineResponse,
      };
    }
  },
});

const globalVariablesSlice = createSlice({
  name: "globalVars",
  initialState: initialGlobalVariablesState,
  reducers: {},
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
