/** LIBRARIES */
import React, { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import CSSTransition from "react-transition-group/CSSTransition";

/** STYLES */
import classes from "./ModalOverlay.module.css";
import Button from "../button/Button";
import Icon from "../icon/Icon";

/** CUSTOM */
import { RootState } from "../../../store/index";

interface ModalOverlayProps {
  displayClose: boolean;
  onModalClose: () => void;
  children: React.ReactNode;
}

const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  const { displayClose, onModalClose, children } = props;
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
      {displayClose && (
        <div
          style={{
            borderBottom: "1px solid var(--primary-color)",
            textAlign: "right",
            // backgroundColor: "var(--primary-color)",
            // color: "var(--secondary-color)"
          }}
        >
          <Button onClick={close} disabled={false}>
            <Icon name="close" />
          </Button>
        </div>
      )}
      {/* <div className={classes['modal-content']}> */}
      {children}
      {/* </div> */}
    </div>
  );
};

export default ModalOverlay;
