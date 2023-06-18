/** LIBRARIES */
import React, { FC } from "react";
import ReactDOM from "react-dom";

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
  closeHandler: () => void;
}

const Modal: FC<ModalProps> = (props) => {
  const { children, closeHandler } = props;

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={() => {}} />, backdropElement)}
      {ReactDOM.createPortal(
        <ModalOverlay onModalClose={closeHandler}>
          {children}
        </ModalOverlay>,
        overlayElement
      )}
    </>
  );
};

export default Modal;
