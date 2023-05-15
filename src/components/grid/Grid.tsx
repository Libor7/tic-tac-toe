/** LIBRARIES */
import React, { FC } from "react";
import { useSelector } from "react-redux";

/** STYLES */
import classes from "./Grid.module.css";

/** CUSTOM */
import { RootState } from "../../store";

/** CUSTOM COMPONENTS */
import GridRow from "../grid-row/GridRow";

interface GridProps {}

const Grid: FC<GridProps> = (props) => {
  const { columns, rows } = useSelector((state: RootState) => ({
    columns: state.grid.gridColumns,
    rows: state.grid.gridRows,
  }));

  return (
    <div className={`${classes['grid-base']}`}>
      {Array.from(Array(rows).keys()).map((row) => (
        <GridRow key={row} rowIndex={row} cols={columns} />
      ))}
    </div>
  );
};

export default Grid;
