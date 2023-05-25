import React, { FC } from "react";
import classes from "./Button.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

type buttonType = "button" | "submit" | "reset" | undefined;

interface ButtonProps {
  type?: buttonType;
  disabled: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const Button: FC<ButtonProps> = (props) => {
  const { type, disabled, children, onClick } = props;
  const { buttonSide } = useSelector((state: RootState) => ({
    buttonSide: state.globalVars.buttonSide,
  }));
  const classNames = `${classes["button-base"]} ${disabled && classes["button-disabled"]}`;

  return (
    <button
      type={type || "button"}
      className={classNames}
      style={{ minWidth: buttonSide, height: buttonSide }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
