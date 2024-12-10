/** LIBRARIES */
import { useSelector } from "react-redux";

/** STYLES */
import classes from "./Grid.module.css";

/** CUSTOM */
import { RootState } from "../../store";

/** CUSTOM COMPONENTS */
import GridRow from "../grid-row/GridRow";


const Grid = () => {
  const {
    columns,
    grid,
    rows,
  } = useSelector((state: RootState) => ({
    clickedSquare: state.grid.clickedSquare,
    columns: state.grid.gridColumns,
    engineStarts: state.result.engineStarts,
    grid: state.grid.grid,
    lastMove: state.grid.lastMove,
    playAgainstComp: state.result.playAgainstComp,
    rows: state.grid.gridRows,
  }));

  return (
    <div className={`${classes["grid-base"]}`}>
      {Array.from(Array(rows).keys()).map((row, index) => (
        <GridRow
          key={row}
          rowIndex={row}
          cols={columns}
          rowValues={grid[index]}
        />
      ))}
    </div>
  );
};

export default Grid;
