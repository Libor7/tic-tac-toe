/** LIBRARIES */
import React, { FC } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";

/** STYLES */
import classes from "./Modal.module.css";

/** CUSTOM COMPONENTS */
import Backdrop from "../backdrop/Backdrop";
import ModalOverlay from "./ModalOverlay";

/** CUSTOM */
import { iconActions } from "../../../store";

const backdropElement = document.getElementById("backdrop-root")!;
const overlayElement = document.getElementById("overlay-root")!;

interface ModalProps {
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = (props) => {
  const { children } = props;
  const dispatch = useDispatch();

  const modalCloseHandler = () => {
    dispatch(iconActions.hideAllControls());
  };

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={() => {}} />, backdropElement)}
      {ReactDOM.createPortal(
        <ModalOverlay onModalClose={modalCloseHandler}>
          {children}
        </ModalOverlay>,
        overlayElement
      )}
    </>
  );
};

export default Modal;
