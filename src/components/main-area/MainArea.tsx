/** LIBRARIES */
import React from "react";

/** STYLES */
import classes from "./MainArea.module.css";

/** CUSTOM COMPONENTS */
import Board from "../board/Board";
import ResultBar from "../result-bar/ResultBar";

const MainArea = () => {
  // TODO btn posunutie resultBar z dola napravo - vedla seba zlava doprava: controlPanel, board, resultBar 

  return (
    <div className={`${classes["main-area-base"]}`}>
      <Board />
      <ResultBar />
    </div>
  );
};

export default MainArea;
