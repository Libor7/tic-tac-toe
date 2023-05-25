import React, { FC } from "react";
import classes from "./Icon.module.css";

interface IconProps {
  name: string;
  font?: "large" | "medium";
}

const Icon: FC<IconProps> = (props) => {
  const { name, font } = props;
  const iconClasses = `material-icons ${classes["icon-base"]} ${
    font && font === "large" ? classes["large"] : classes["medium"]
  }`;

  return <i className={iconClasses}>{name}</i>;
};

export default Icon;
