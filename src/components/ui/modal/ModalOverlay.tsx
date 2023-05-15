/** LIBRARIES */
import React, { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CSSTransition from "react-transition-group/CSSTransition";

/** STYLES */
import classes from "./ModalOverlay.module.css";
import Button from "../button/Button";
import Icon from "../icon/Icon";

/** CUSTOM */
import { gridActions, iconActions, RootState } from "../../../store/index";

interface ModalOverlayProps {
  onModalClose: () => void;
  children: React.ReactNode;
}

const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  const { onModalClose, children } = props;
  // const [isClosing, setIsClosing] = useState<boolean>(false);
  const allControlsDisplayed = useSelector(
    (state: RootState) => state.icons.allControlsDisplayed
  );

  const close = useCallback(() => {
    // setIsClosing(true);
    onModalClose();
  }, [onModalClose]);

  return (
    // <CSSTransition in={allControlsDisplayed} timeout={300} classNames="modal-overlay" mountOnEnter unmountOnExit></CSSTransition>
    <div className={classes["modal-overlay"]}>
      <div
        style={{
          borderBottom: "1px solid var(--primary-color)",
          textAlign: "right",
          // backgroundColor: "var(--primary-color)",
          // color: "var(--secondary-color)"
        }}
      >
        <Button onClick={close}>
          <Icon name="close" />
        </Button>
      </div>
      {/* <div className={classes['modal-content']}> */}
      {children}
      {/* </div> */}
    </div>
  );
};

export default ModalOverlay;
