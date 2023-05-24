/** LIBRARIES */
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

/** STYLES */
import classes from "./Board.module.css";

/** CUSTOM */
import { RootState } from "../../store";

/** CUSTOM COMPONENTS */
import Grid from "../grid/Grid";

interface BoardProps {
  parentWidth: number;
  parentHeight: number;
}

const Board: FC<BoardProps> = (props) => {
  const { parentWidth, parentHeight } = props;
  // btn na posunutie resultBar z dola napravo - vedla seba zlava doprava: controlPanel, board, resultBar - či správne pridáva max columns a max rows
  // 768 - modal zmenšiť

  const { buttonSide, resultBarHeight, tabletBreakpoint } = useSelector(
    (state: RootState) => ({
      buttonSide: state.globalVars.buttonSide,
      resultBarHeight: state.globalVars.resultBarHeight,
      tabletBreakpoint: state.globalVars.tabletBreakpoint,
    })
  );
  const [boardHeight, setBoardHeight] = useState<number>();

  useEffect(() => {
    if (resultBarHeight > 0) {
      const height =
        window.innerWidth >= tabletBreakpoint
          ? window.innerHeight - resultBarHeight
          : window.innerHeight - buttonSide - resultBarHeight;
      setBoardHeight(height);
    }
  }, [
    buttonSide,
    parentHeight,
    parentWidth,
    resultBarHeight,
    tabletBreakpoint,
  ]);

  return (
    <div
      className={`${classes["board-base"]}`}
      style={{ height: `${boardHeight}px` }}
    >
      <Grid />
    </div>
  );
};

export default Board;
