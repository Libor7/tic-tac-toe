/** LIBRARIES */
import { createSlice, configureStore } from "@reduxjs/toolkit";

/** CUSTOM */
import { setNewGrid } from "../util/util";

const initialIconState = {
  allControlsDisplayed: false,
};

const initialGridState = {
  grid: setNewGrid(3, 3),
  lastMove: null,
  gridRows: 3,
  gridColumns: 3,
  maxGridRows: 3,
  maxGridColumns: 3,
};

const initialResultState = {
  playAgainstComp: false,
  computerPlaysAs: "nought",
  noughtsPlayerPoints: 0,
  crossesPlayerPoints: 0,
  starts: "cross",
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
      setNewGrid(state.gridColumns, ++state.gridRows);
    },
    decrementGridRows(state) {
      setNewGrid(state.gridColumns, --state.gridRows);
    },
    incrementGridColumns(state) {
      setNewGrid(++state.gridColumns, state.gridRows);
    },
    decrementGridColumns(state) {
      setNewGrid(--state.gridColumns, state.gridRows);
    },
    setMaxGridRows(state, action) {
      return {
        ...state,
        maxGridRows: action.payload,
      };
    },
    setMaxGridColumns(state, action) {
      return {
        ...state,
        maxGridColumns: action.payload,
      };
    },
    setNewGame(state) {
      setNewGrid(state.gridColumns, state.gridRows);
    },
    set() {
      // zmeniť hodnotu jedného square - možno aj undoLastMove(state) - utils.ts možno 
    },
    undoLastMove(state) {
      // zmeniť hodnotu v grid podla lastMove 
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
    adjustResultBarHeight(state, action) {
      return {
        ...state,
        resultBarHeight: action.payload,
      };
    },
  },
});

const store = configureStore({
  reducer: {
    icons: iconSlice.reducer,
    grid: gridSlice.reducer,
    result: resultSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const iconActions = iconSlice.actions;
export const gridActions = gridSlice.actions;
export const resultActions = resultSlice.actions;

export default store;
