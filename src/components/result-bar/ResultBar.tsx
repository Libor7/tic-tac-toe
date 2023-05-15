/** LIBRARIES */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

/** STYLES */
import classes from "./ResultBar.module.css";

/** CUSTOM */
import { resultActions, RootState } from "../../store/index";

const ResultBar = () => {
  const dispatch = useDispatch();
  const containerDivRef = useRef<HTMLDivElement>(null);
  const { crossesPlayerPoints, noughtsPlayerPoints, playAgainstComp } =
    useSelector((state: RootState) => ({
      crossesPlayerPoints: state.result.crossesPlayerPoints,
      noughtsPlayerPoints: state.result.noughtsPlayerPoints,
      playAgainstComp: state.result.playAgainstComp,
    }));

  useEffect(() => {
    dispatch(resultActions.adjustResultBarHeight(containerDivRef.current?.clientHeight!));
  }, [dispatch]);

  const checkboxHandler = () => {
    dispatch(resultActions.toggleOpponent());
  };

  // TODO JSX 
  return (
    <div ref={containerDivRef}>
      <span>Player X: {crossesPlayerPoints}</span>
      <span>Player O: {noughtsPlayerPoints}</span>
      <br />
      You play against {playAgainstComp ? "engine" : "human"}, switch to {playAgainstComp ? "human" : "engine"}: <input type="checkbox" onChange={checkboxHandler} />
    </div>
  );
};

export default ResultBar;
