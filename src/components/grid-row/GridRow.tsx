/** LIBRARIES */
import React, { FC } from "react";

/** STYLES */
import classes from "./GridRow.module.css";

/** CUSTOM COMPONENTS */
import Square from "../square/Square";

interface GridRowProps {
  rowIndex: number;
  cols: number;
}

const GridRow: FC<GridRowProps> = (props) => {
  const { rowIndex, cols } = props;

  return (
    <div className={`${classes['grid-row-base']}`}>
      {Array.from(Array(cols).keys()).map((col) => (
        <Square key={col} xAxis={col} yAxis={rowIndex} />
      ))}
    </div>
  );
};

export default GridRow;
