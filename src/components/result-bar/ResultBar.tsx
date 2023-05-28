/** LIBRARIES */
import React, { useCallback } from "react";
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
    computerPlaysAs,
    crossesPlayerPoints,
    noughtsPlayerPoints,
    playAgainstComp,
  } = useSelector((state: RootState) => ({
    computerPlaysAs: state.result.computerPlaysAs,
    crossesPlayerPoints: state.result.crossesPlayerPoints,
    gridColumns: state.grid.gridColumns,
    gridRows: state.grid.gridRows,
    noughtsPlayerPoints: state.result.noughtsPlayerPoints,
    playAgainstComp: state.result.playAgainstComp,
  }));

  const opponentHandler = useCallback(() => {
    dispatch(resultActions.toggleOpponent());
    dispatch(gridActions.setNewGame({ cols: gridColumns, rows: gridRows }));
    dispatch(resultActions.setWhoMoves('cross'));
  }, [dispatch, gridColumns, gridRows]);

  const ownMarkHandler = useCallback(() => {
    dispatch(resultActions.toggleOwnMark());
  }, [dispatch]);

  return (
    <div className={`${classes["result-bar-base"]}`}>
      <div>
        <div>Player X: {crossesPlayerPoints}</div>
        <div>Player O: {noughtsPlayerPoints}</div>
      </div>
      <div className={`${classes["result-bar-checkbox-wrapper"]}`}>
        <div>
          <span>Against {playAgainstComp ? "Engine" : "Human"}</span>
          <input type="checkbox" onChange={opponentHandler} />
        </div>
        <div>
          <span>
            Playing as {computerPlaysAs === "nought" ? "cross" : "nought"}
          </span>
          <input type="checkbox" onChange={ownMarkHandler} />
        </div>
      </div>
    </div>
  );
};

export default ResultBar;
