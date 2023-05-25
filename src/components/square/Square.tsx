/** LIBRARIES */
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

/** STYLES */
import classes from "./Square.module.css";

/** MODELS */
import { SquareStatus } from "../../models/Square";

/** CUSTOM COMPONENTS */
import Mark from "../mark/Mark";

/** CUSTOM */
import { RootState, gridActions, resultActions } from "../../store";
import { getSquareValue, setSquareClasses } from "../../util/util";

interface SquareProps {
  xAxis: number;
  yAxis: number;
  markIndex: SquareStatus;
}

const Square: FC<SquareProps> = (props) => {
  const { xAxis, yAxis, markIndex } = props;
  const dispatch = useDispatch();
  const { columns, grid, moves, rows, squareSide } = useSelector((state: RootState) => ({
    columns: state.grid.gridColumns,
    grid: state.grid.grid,
    moves: state.result.moves,
    rows: state.grid.gridRows,
    squareSide: state.globalVars.squareSide,
  }));
  const squareClasses = setSquareClasses({xAxis, yAxis, columns, rows}).map((cls: string) => `${classes[cls]}`).join(" ");
  const mark = moves === 'cross' ? SquareStatus.CROSS : SquareStatus.CIRCLE;

  const clickedSquareHandler = () => {
    if (getSquareValue(xAxis, yAxis, grid) === SquareStatus.EMPTY) {
      dispatch(gridActions.setSquareValue({row: yAxis, col: xAxis, value: mark}));
      dispatch(resultActions.toggleWhoMoves());
    }
  };

  return (
    <div
      className={squareClasses}
      style={{ width: squareSide, height: squareSide }}
      onClick={clickedSquareHandler}
    >
      <Mark markIndex={markIndex} />
    </div>
  );
};

export default Square;
