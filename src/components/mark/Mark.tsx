/** LIBRARIES */
import React, { FC, useMemo } from "react";
import { useSelector } from "react-redux";

/** STYLES */
import classes from "./Mark.module.css";

/** MODELS */
import { SquareStatus } from "../../models/Square";

/** CUSTOM COMPONENTS */
import Icon from "../ui/icon/Icon";

/** CUSTOM */
import { RootState } from "../../store";

interface MarkProps {
  markIndex: SquareStatus;
}

const Mark: FC<MarkProps> = (props) => {
  const { markIndex } = props;
  const { marks } = useSelector((state: RootState) => ({
    marks: state.result.marks,
  }));
  const [cross, circle] = marks;

  const markType = useMemo(() => {
    switch (markIndex) {
        case SquareStatus.EMPTY:
          return null;
        case SquareStatus.CIRCLE:
          return circle.name;
        case SquareStatus.CROSS:
          return cross.name;
      }
  }, [circle.name, cross.name, markIndex]);

  return (
    <div className={`${classes["mark-base"]}`}>
      {markType && <Icon name={markType} font={markType === cross.name ? "large" : "medium"} />}
    </div>
  );
};

export default Mark;
