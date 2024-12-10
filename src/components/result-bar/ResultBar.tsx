/** LIBRARIES */
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

/** STYLES */
import classes from "./ResultBar.module.css";

/** CUSTOM */
import { gridActions, resultActions, RootState } from "../../store/index";

const ResultBar = () => {
  const dispatch = useDispatch();
  const {
    gridColumns,
    gridRows,
    engineStarts,
    crossesPlayerPoints,
    noughtsPlayerPoints,
    playAgainstComp,
  } = useSelector((state: RootState) => ({
    engineStarts: state.result.engineStarts,
    crossesPlayerPoints: state.result.crossesPlayerPoints,
    gridColumns: state.grid.gridColumns,
    gridRows: state.grid.gridRows,
    noughtsPlayerPoints: state.result.noughtsPlayerPoints,
    playAgainstComp: state.result.playAgainstComp,
  }));

  const opponentHandler = useCallback(() => {
    dispatch(resultActions.toggleOpponent());
    dispatch(gridActions.clearClickedSquare());
    dispatch(gridActions.setNewGame({ cols: gridColumns, rows: gridRows }));
    dispatch(resultActions.setWhoMoves("cross"));
  }, [dispatch, gridColumns, gridRows]);

  const whoBeginsHandler = useCallback(() => {
    dispatch(resultActions.toggleWhoBegins());
    dispatch(gridActions.setNewGame({ cols: gridColumns, rows: gridRows }));
    dispatch(gridActions.clearClickedSquare());
    dispatch(resultActions.setWhoMoves("cross"));
  }, [dispatch, gridColumns, gridRows]);

  return (
    <div className={`${classes["result-bar-base"]}`}>
      <div>
        <div>Player X: {crossesPlayerPoints}</div>
        <div>Player O: {noughtsPlayerPoints}</div>
      </div>
      <div className={`${classes["result-bar-checkbox-wrapper"]}`}>
        <div>
          <span>Against {playAgainstComp ? "Engine" : "Human"}</span>
          <input id ="opponentId" type="checkbox" onChange={opponentHandler} />
        </div>
        {playAgainstComp && (
          <div>
            <span>You play as {engineStarts ? "nought" : "cross"}</span>
            <input id ="markId" type="checkbox" onChange={whoBeginsHandler} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultBar;
