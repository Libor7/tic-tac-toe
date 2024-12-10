import { FC } from "react";
import classes from "./Backdrop.module.css";

interface BackdropProps {
    onClick: () => void; 
}

const Backdrop: FC<BackdropProps> = (props) => {
    const { onClick } = props;
    return (
        <div className={classes['backdrop-base']} onClick={onClick} />
    );
  };
  
  export default Backdrop;
