/** LIBRARIES */
import React, { FC } from "react";
import { useSelector } from "react-redux";

/** STYLES */
import classes from "./Buttons.module.css";

/** MODELS */
import { Icon as IconModel } from "../../models/Icon";

/** CUSTOM */
import { RootState } from "../../store";

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
  const { buttonSide, desktopBreakpoint, lastMove } = useSelector((state: RootState) => ({
    buttonSide: state.globalVars.buttonSide,
    desktopBreakpoint: state.globalVars.desktopBreakpoint,
    lastMove: state.grid.lastMove
  }));

  const desktopView = window.innerWidth >= desktopBreakpoint;
  const buttonsWidth = desktopView ? 'unset' : inRow * buttonSide + 'px';

  return (
    <div className={`${classes["buttons-base"]}`} style={{ width: buttonsWidth }}>
      {icons
        .filter((icon: IconModel) =>
          initial
            ? icon.initialControl
            : icon.name !== "more_vert"
        )
        .map((icon: IconModel) => (
          <Button key={icon.name} onClick={icon.clickHandler!} disabled={!lastMove && icon.name === 'undo'}>
            <Icon name={icon.name} />
            {desktopView && <ButtonLabel labelText={icon.label ?? ""} />}
          </Button>
        ))}
    </div>
  );
};

export default Buttons;
