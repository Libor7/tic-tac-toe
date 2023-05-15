/** LIBRARIES */
import React, { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

/** STYLES */
import classes from "./Board.module.css";

/** CUSTOM */
import { getCSSvar, pxToNumber } from "../../util/util";
import { RootState } from "../../store";

/** CUSTOM COMPONENTS */
import Grid from "../grid/Grid";

const Board = () => {
  // let boardHeight: number;
  const { resultBarHeight } = useSelector((state: RootState) => ({
    resultBarHeight: state.result.resultBarHeight,
  }));
  const [boardHeight, setBoardHeight] = useState<string>();
  const buttonSize = useMemo(() => pxToNumber(getCSSvar("--button-side")), []);
  // console.log('test: ', window.innerWidth, window.innerHeight, buttonSize, resultBarHeight);
  // const boardHeight = window.innerHeight - buttonSize - resultBarHeight;

  useEffect(() => {
    if (resultBarHeight > 0) {
      console.log('useEffect: ', window.innerWidth, window.innerHeight, buttonSize, resultBarHeight);
      setBoardHeight((window.innerHeight - buttonSize - resultBarHeight) + 'px');
    }
  }, [buttonSize, resultBarHeight]);

  return (
    <div className={`${classes["board-base"]}`} style={{ height: boardHeight }}>
      <Grid />
    </div>
  );
};

export default Board;
