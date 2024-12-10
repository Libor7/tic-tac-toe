/** STYLES */
import classes from "./MainArea.module.css";

/** CUSTOM COMPONENTS */
import Board from "../board/Board";
import ResultBar from "../result-bar/ResultBar";

const MainArea = () => {
  return (
    <div className={`${classes["main-area-base"]}`}>
      <Board />
      <ResultBar />
    </div>
  );
};

export default MainArea;
