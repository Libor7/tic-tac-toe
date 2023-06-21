/** LIBRARIES */
import React, { FC } from "react";
import ReactDOM from "react-dom";

/** STYLES */
import classes from "./Modal.module.css";

/** CUSTOM COMPONENTS */
import Backdrop from "../backdrop/Backdrop";
import ModalOverlay from "./ModalOverlay";

const backdropElement = document.getElementById("backdrop-root")!;
const overlayElement = document.getElementById("overlay-root")!;

interface ModalProps {
  children: React.ReactNode;
  closeHandler: () => void;
  showCloseBtn: boolean;
}

const Modal: FC<ModalProps> = (props) => {
  const { children, closeHandler, showCloseBtn } = props;

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={closeHandler} />, backdropElement)}
      {ReactDOM.createPortal(
        <ModalOverlay onModalClose={closeHandler} displayClose={showCloseBtn}>
          {children}
        </ModalOverlay>,
        overlayElement
      )}
    </>
  );
};

export default Modal;
