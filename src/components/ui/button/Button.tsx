import React, { FC } from "react";
import classes from "./Button.module.css";

type buttonType = 'button' | 'submit' | 'reset' | undefined;

interface ButtonProps {
  type?: buttonType;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const Button: FC<ButtonProps> = (props) => {
  const { type, disabled, children, onClick } = props;

  return (
    <button type={type || 'button'} className={`${classes['button-base']}`} disabled={disabled} onClick={onClick}>
        {children}
    </button>
  );
};

export default Button;
