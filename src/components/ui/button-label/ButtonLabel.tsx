/** LIBRARIES */
import React, { FC } from "react";

/** STYLES */
import classes from "./ButtonLabel.module.css";

interface ButtonLabelProps {
  labelText: string;
}

const ButtonLabel: FC<ButtonLabelProps> = (props) => {
  const { labelText } = props;

  return <span className={`${classes['button-label-base']}`}>{labelText}</span>;
};

export default ButtonLabel;
