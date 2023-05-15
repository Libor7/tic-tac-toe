import React, { FC } from "react";
import classes from "./Icon.module.css";

interface IconProps {
    name: string;
}

const Icon: FC<IconProps> = (props) => {
    const { name } = props;
    const iconClasses = `material-icons ${classes['icon-base']}`;

    return (
        <i className={iconClasses}>{ name }</i>
    );
};

export default Icon;