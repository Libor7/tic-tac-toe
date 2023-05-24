import React, { FC } from "react";
import classes from "./Button.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

type buttonType = "button" | "submit" | "reset" | undefined;

interface ButtonProps {
  type?: buttonType;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const Button: FC<ButtonProps> = (props) => {
  const { type, disabled, children, onClick } = props;
  const { buttonSide } = useSelector((state: RootState) => ({
    buttonSide: state.globalVars.buttonSide,
  }));

  return (
    <button
      type={type || "button"}
      className={`${classes["button-base"]}`}
      style={{ minWidth: buttonSide, height: buttonSide }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
