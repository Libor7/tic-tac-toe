/** LIBRARIES */
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

/** STYLES */
import classes from "./ResultBar.module.css";

/** CUSTOM */
import { resultActions, RootState } from "../../store/index";

const ResultBar = () => {
  const dispatch = useDispatch();
  const { crossesPlayerPoints, noughtsPlayerPoints, playAgainstComp } =
    useSelector((state: RootState) => ({
      crossesPlayerPoints: state.result.crossesPlayerPoints,
      noughtsPlayerPoints: state.result.noughtsPlayerPoints,
      playAgainstComp: state.result.playAgainstComp,
    }));

  const checkboxHandler = useCallback(() => {
    dispatch(resultActions.toggleOpponent());
  }, [dispatch]);

  return (
    <div className={`${classes["result-bar-base"]}`}>
      <div>
        <div>Player X: {crossesPlayerPoints}</div>
        <div>Player O: {noughtsPlayerPoints}</div>
      </div>
      <div>
        <span>Against {playAgainstComp ? "Engine" : "Human"}</span>
        <input type="checkbox" onChange={checkboxHandler} />
      </div>
    </div>
  );
};

export default ResultBar;
