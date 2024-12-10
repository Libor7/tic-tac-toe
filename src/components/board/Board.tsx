/** LIBRARIES */
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

/** STYLES */
import classes from "./Board.module.css";

/** CUSTOM */
import { RootState, gridActions, iconActions, resultActions } from "../../store";

/** CUSTOM COMPONENTS */
import Grid from "../grid/Grid";

const Board = () => {
  const boardWrapper = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { squareSide, tabletBreakpoint } = useSelector((state: RootState) => ({
    squareSide: state.globalVars.squareSide,
    tabletBreakpoint: state.globalVars.tabletBreakpoint,
  }));

  const tabletView = window.innerWidth >= tabletBreakpoint;
  const gridPadding = tabletView ? 48 : 16;

  const onViewportResize = useCallback(() => {
    if (boardWrapper.current) {
      const width = boardWrapper.current?.offsetWidth - gridPadding;
      const height = boardWrapper.current?.offsetHeight - gridPadding;
      const maxGridCols = Math.trunc(width / squareSide);
      const maxGridRws = Math.trunc(height / squareSide);
      dispatch(gridActions.setMaxGridColumns(maxGridCols));
      dispatch(gridActions.setMaxGridRows(maxGridRws));
      dispatch(gridActions.setNewGame({ cols: 3, rows: 3 }));
      dispatch(iconActions.hideAllControls());
      dispatch(resultActions.setWhoMoves('cross'));
    }
  }, [dispatch, gridPadding, squareSide]);

  window.addEventListener("resize", onViewportResize);

  useEffect(() => {
    onViewportResize();

    return () => {
      window.removeEventListener("resize", onViewportResize);
    };
  }, [dispatch, onViewportResize]);

  return (
    <div className={`${classes["board-base"]}`} ref={boardWrapper}>
      <Grid />
    </div>
  );
};

export default Board;
