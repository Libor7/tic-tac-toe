/** LIBRARIES */
import React, { FC } from "react";
import { useSelector } from "react-redux";

/** STYLES */
import classes from "./Square.module.css";

/** CUSTOM */
import { RootState } from "../../store";
import { setSquareClasses } from "../../util/util";

interface SquareProps {
  xAxis: number;
  yAxis: number;
}

const Square: FC<SquareProps> = (props) => {
  const { xAxis, yAxis } = props;
  const { columns, rows } = useSelector((state: RootState) => ({
    columns: state.grid.gridColumns,
    rows: state.grid.gridRows,
  }));
  const squareClasses = setSquareClasses({xAxis, yAxis, columns, rows}).map((cls: string) => `${classes[cls]}`).join(" ");

  const clickedSquareHandler = () => {};

  return (
    <div
      className={squareClasses}
      data-col={xAxis}
      data-row={yAxis}
      onClick={clickedSquareHandler}
    ></div>
  );
};

export default Square;