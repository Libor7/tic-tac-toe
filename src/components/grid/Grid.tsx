/** LIBRARIES */
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/** STYLES */
import classes from "./Grid.module.css";

/** MODELS */
import { SquareStatus } from "../../models/Square";

/** CUSTOM */
import { RootState, gridActions, resultActions } from "../../store";
import { getSquareValue } from "../../util/util";
import {
  generateRandomNumberInRange,
  getFlattenArray,
  getRandomSquareCoordinates,
  isGridEmpty,
  isGridFilled,
  millisecondOptions,
} from "../../services/engineService";

/** CUSTOM COMPONENTS */
import GridRow from "../grid-row/GridRow";

const milliseconds =
  millisecondOptions[generateRandomNumberInRange(millisecondOptions.length)];

const Grid = () => {
  const dispatch = useDispatch();
  const {
    clickedSquare,
    columns,
    engineStarts,
    grid,
    lastMove,
    playAgainstComp,
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

  /** Human vs. Engine game */
  const myMark = engineStarts ? SquareStatus.CIRCLE : SquareStatus.CROSS;
  const engineMark = engineStarts ? SquareStatus.CROSS : SquareStatus.CIRCLE;

  const makeAMove = useCallback(
    (yAxis: number, xAxis: number, mark: SquareStatus) => {
      dispatch(
        gridActions.setSquareValue({ row: yAxis, col: xAxis, value: mark })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (playAgainstComp) {
      if (engineStarts) {
        // TODO - klik new game v menu, nespustí znovu prvý ťah engine, hoci grid je prázdny 
        // dispatch(resultActions.setWaitingForEngineResponse(true));

        if (isGridEmpty(getFlattenArray(grid))) {
          const { xAxis, yAxis } = getRandomSquareCoordinates(grid);
          setTimeout(() => {
            makeAMove(yAxis, xAxis, engineMark);
            // dispatch(resultActions.setWaitingForEngineResponse(false));
          }, milliseconds);
        } else {
          if (clickedSquare) {
            // dispatch(resultActions.setWaitingForEngineResponse(true));
            makeAMove(clickedSquare.yAxis, clickedSquare.xAxis, myMark);
          }
        }
      } else {
        if (clickedSquare) {
          dispatch(resultActions.setWaitingForEngineResponse(true));
          makeAMove(clickedSquare.yAxis, clickedSquare.xAxis, myMark);
        }
      }
    }
  // Array is missing grid as a dependency, because it crashes app due to infinite loop danger 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    clickedSquare,
    dispatch,
    engineMark,
    engineStarts,
    makeAMove,
    myMark,
    playAgainstComp,
  ]);

  useEffect(() => {
    if (playAgainstComp && lastMove) {
      if (
        getSquareValue(lastMove.square.xAxis, lastMove.square.yAxis, grid) ===
        myMark
      ) {
        if (!isGridFilled(getFlattenArray(grid))) {
          const { xAxis, yAxis } = getRandomSquareCoordinates(grid);    // TODO - nevyberať random square ale vyberať z užšieho výberu lepších možností 
          setTimeout(() => {
            makeAMove(yAxis, xAxis, engineMark);
            dispatch(resultActions.setWaitingForEngineResponse(false));
          }, milliseconds);
        } else {
          dispatch(resultActions.setEndOfGame(true));
        }
      } else {
        if (isGridFilled(getFlattenArray(grid)))
          dispatch(resultActions.setEndOfGame(true));
      }
    }
  }, [
    dispatch,
    engineMark,
    grid,
    lastMove,
    makeAMove,
    myMark,
    playAgainstComp,
  ]);

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
