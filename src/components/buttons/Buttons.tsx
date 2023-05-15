/** LIBRARIES */
import React, { FC, useMemo } from "react";

/** STYLES */
import classes from "./Buttons.module.css";

/** MODELS */
import { Icon as IconModel } from "../../models/Icon";

/** CUSTOM */
import { getCSSvar, pxToNumber } from "../../util/util";

/** CUSTOM COMPONENTS */
import Button from "../ui/button/Button";
import Icon from "../ui/icon/Icon";

interface ButtonsProps {
  icons: IconModel[];
  initial?: boolean;
  inRow: number;
}

const Buttons: FC<ButtonsProps> = (props) => {
  const { icons, initial, inRow } = props;

  const buttonSize = useMemo(() => pxToNumber(getCSSvar("--button-side")), []);
  const buttonsWidth = inRow * buttonSize + "px";

  return (
    <div style={{ width: buttonsWidth }}>
      {icons
        .filter((icon: IconModel) =>
          initial
            ? icon.initialControl
            : icon.control && icon.name !== "more_vert"
        )
        .map((icon: IconModel) => (
          <Button key={icon.name} onClick={icon.clickHandler!}>
            <Icon name={icon.name} />
          </Button>
        ))}
    </div>
  );
};

export default Buttons;
