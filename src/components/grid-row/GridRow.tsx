/** LIBRARIES */
import React, { FC } from "react";

/** STYLES */
import classes from "./GridRow.module.css";

/** MODELS */
import { SquareStatus } from "../../models/Square";

/** CUSTOM COMPONENTS */
import Square from "../square/Square";

interface GridRowProps {
  rowIndex: number;
  cols: number;
  rowValues: SquareStatus[];
}

const GridRow: FC<GridRowProps> = (props) => {
  const { rowIndex, cols, rowValues } = props;

  return (
    <div className={`${classes['grid-row-base']}`}>
      {Array.from(Array(cols).keys()).map((col, index) => (
        <Square key={col} xAxis={col} yAxis={rowIndex} markIndex={rowValues[index]} />
      ))}
    </div>
  );
};

export default GridRow;
