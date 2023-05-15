import React from "react";
import "./App.css";
import ControlPanel from "./components/control-panel/ControlPanel";
import Board from "./components/board/Board";
import ResultBar from "./components/result-bar/ResultBar";

const App = () => {
  return (
    <>
      <ControlPanel />
      <Board />
      <ResultBar />
    </>
  );
};

export default App;
