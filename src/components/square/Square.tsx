/** LIBRARIES */
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

/** STYLES */
import classes from "./Square.module.css";

/** MODELS */
import { SquareCoordinates, SquareStatus } from "../../models/Square";

/** CUSTOM COMPONENTS */
import Mark from "../mark/Mark";

/** CUSTOM */
import { RootState, gridActions, resultActions } from "../../store";
import { getSquareValue, setSquareClasses } from "../../util/util";
import {
  getEngineResponse,
} from "../../services/engineService";

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
    computerPlaysAs,
    grid,
    moves,
    playAgainstComp,
    rows,
    squareSide,
    waitingForEngineResponse,
  } = useSelector((state: RootState) => ({
    columns: state.grid.gridColumns,
    computerPlaysAs: state.result.computerPlaysAs,
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

  /** Playing Human vs. Engine */
  const myMark =
    computerPlaysAs === "nought" ? SquareStatus.CROSS : SquareStatus.CIRCLE;
  const engineMark =
    computerPlaysAs === "nought" ? SquareStatus.CIRCLE : SquareStatus.CROSS;

  const clickedSquareHandler = () => {
    if (getSquareValue(xAxis, yAxis, grid) === SquareStatus.EMPTY) {
      if (playAgainstComp) {
        if (waitingForEngineResponse) return;
        dispatch(
          gridActions.setSquareValue({ row: yAxis, col: xAxis, value: myMark })
        );
        dispatch(resultActions.toggleWaitingForEngineResponse());

        getEngineResponse(columns, rows, grid)
          .then((coordinates: SquareCoordinates) => {
            dispatch(
              gridActions.setSquareValue({
                row: coordinates.yAxis,
                col: coordinates.xAxis,
                value: engineMark,
              })
            );
            dispatch(resultActions.toggleWaitingForEngineResponse());
          })
          .catch((response: string) => console.log(response)); // TODO - zobraziť response "Game over" asi v strede result bar, alebo v modal
      } else {
        dispatch(
          gridActions.setSquareValue({ row: yAxis, col: xAxis, value: mark })
        );
        dispatch(resultActions.toggleWhoMoves());
      }
        // TODO 
        // Ak všetky polia sú prázdne, náhodne vyberie pole.
        // ak nie sú všetky prázdne, nájde polia, ktoré majú jeho znak a ktoré majú súperov znak - skontroluje všetky polia okolo týchto znakov -
        // prázdne vloží do množín - množina pre svoje a pre súperove - tieto sú uprednostnené pre náhodný výber pola ak táto množina obsahuje prvky, 
        // ak neobsahuje, vyberá náhodne podla prvého postupu (uprednostniť získanie bodu pred blokovaním súpera - prípadne nájsť tie, ktoré sú v oboch 
        // množinách a uprednostniť také)
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
