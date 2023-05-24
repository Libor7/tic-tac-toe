/** LIBRARIES */
import React from "react";

/** CUSTOM COMPONENTS */
import Board from "../board/Board";
import ResultBar from "../result-bar/ResultBar";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const MainArea = () => {
  const { controlPanelWidth, tabletBreakpoint, buttonSide } = useSelector(
    (state: RootState) => ({
      buttonSide: state.globalVars.buttonSide,
      controlPanelWidth: state.globalVars.controlPanelWidth,
      tabletBreakpoint: state.globalVars.tabletBreakpoint,
    })
  );

  const containerWidth =
    window.innerWidth >= tabletBreakpoint
      ? window.innerWidth - controlPanelWidth
      : window.innerWidth;

  const containerHeight =
    window.innerWidth >= tabletBreakpoint
      ? window.innerHeight
      : window.innerHeight - buttonSide;

  return (
    <div
      style={{ width: `${containerWidth}px`, height: `${containerHeight}px` }}
    >
      <Board parentHeight={containerHeight} parentWidth={containerWidth} />
      <ResultBar />
    </div>
  );
};

export default MainArea;
