/** LIBRARIES */
import React, { FC } from "react";
import { useSelector } from "react-redux";

/** STYLES */
import classes from "./Buttons.module.css";

/** MODELS */
import { Icon as IconModel } from "../../models/Icon";

/** CUSTOM */
import { RootState } from "../../store";
import { getFlattenArray, isGridEmpty } from "../../services/engineService";

/** CUSTOM COMPONENTS */
import Button from "../ui/button/Button";
import Icon from "../ui/icon/Icon";
import ButtonLabel from "../ui/button-label/ButtonLabel";

interface ButtonsProps {
  icons: IconModel[];
  initial?: boolean;
  inRow: number;
}

const Buttons: FC<ButtonsProps> = (props) => {
  const { icons, initial, inRow } = props;
  const {
    buttonSide,
    desktopBreakpoint,
    grid,
    gridColumns,
    gridRows,
    lastMove,
    maxGridColumns,
    maxGridRows,
    playAgainstComp
  } = useSelector((state: RootState) => ({
    buttonSide: state.globalVars.buttonSide,
    desktopBreakpoint: state.globalVars.desktopBreakpoint,
    grid: state.grid.grid,
    gridColumns: state.grid.gridColumns,
    gridRows: state.grid.gridRows,
    lastMove: state.grid.lastMove,
    maxGridColumns: state.grid.maxGridColumns,
    maxGridRows: state.grid.maxGridRows,
    playAgainstComp: state.result.playAgainstComp,
  }));

  const desktopView = window.innerWidth >= desktopBreakpoint;
  const buttonsWidth = desktopView ? "unset" : inRow * buttonSide + "px";
  const allSquaresEmpty = isGridEmpty(getFlattenArray(grid));

  return (
    <div
      className={`${classes["buttons-base"]}`}
      style={{ width: buttonsWidth }}
    >
      {icons
        .filter((icon: IconModel) =>
          initial ? icon.initialControl : icon.name !== "more_vert"
        )
        .map((icon: IconModel) => (
          <Button
            key={icon.name}
            onClick={icon.clickHandler!}
            disabled={
              ((!lastMove || playAgainstComp) && icon.name === "undo") ||
              (gridColumns === 3 && icon.name === "chevron_left") ||
              (gridColumns === maxGridColumns && icon.name === "chevron_right") ||
              (gridRows === 3 && icon.name === "expand_less") ||
              (gridRows === maxGridRows && icon.name === "expand_more") ||
              (allSquaresEmpty && icon.name === "tag")
            }
          >
            <Icon name={icon.name} />
            {desktopView && <ButtonLabel labelText={icon.label ?? ""} />}
          </Button>
        ))}
    </div>
  );
};

export default Buttons;
