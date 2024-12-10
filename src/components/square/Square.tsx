/** LIBRARIES */
import { FC } from "react";
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
  const {
    columns,
    grid,
    moves,
    playAgainstComp,
    rows,
    squareSide,
    waitingForEngineResponse,
  } = useSelector((state: RootState) => ({
    columns: state.grid.gridColumns,
    grid: state.grid.grid,
    moves: state.result.moves,
    playAgainstComp: state.result.playAgainstComp,
    rows: state.grid.gridRows,
    squareSide: state.globalVars.squareSide,
    waitingForEngineResponse: state.result.waitingForEngineResponse,
  }));
  const squareClasses = setSquareClasses({ xAxis, yAxis, columns, rows })
    .map((cls: string) => `${classes[cls]}`)
    .join(" ");
  const mark = moves === "cross" ? SquareStatus.CROSS : SquareStatus.CIRCLE;

  const clickedSquareHandler = () => {
    if (getSquareValue(xAxis, yAxis, grid) === SquareStatus.EMPTY) {
      if (!playAgainstComp) {
        dispatch(
          gridActions.setSquareValue({ row: yAxis, col: xAxis, value: mark })
        );
        dispatch(resultActions.toggleWhoMoves());
      } else {
        if (waitingForEngineResponse) return;
        dispatch(gridActions.setClickedSquare({ x: xAxis, y: yAxis }));
      }
      // polia s jeho a súperovym znak - skontroluje všetky polia okolo, prázdne vloží - množina pre svoje a pre súperove - uprednostnené pre náhodný výber pola ak táto množina 
      // obsahuje prvky, ak neobsahuje, vyberá náhodne podla prvého postupu (uprednostniť získanie bodu pred blokovaním súpera - prípadne nájsť tie, ktoré sú v oboch množinách 
      // ak niektoré z polí okolo znaku má rovnaký znak, do tretej množiny, uprednostnenej pred predoslými 
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
