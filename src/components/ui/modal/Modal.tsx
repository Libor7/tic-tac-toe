import React, { FC } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import Backdrop from "../backdrop/Backdrop";
import ModalOverlay from "./ModalOverlay";

const backdropElement = document.getElementById("backdrop-root")!;
const overlayElement = document.getElementById("overlay-root")!;

interface ModalProps {
  onModalClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = (props) => {
  const { onModalClose, children } = props;

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={() => {}} />, backdropElement)}
      {ReactDOM.createPortal(
        <ModalOverlay onModalClose={onModalClose}>{children}</ModalOverlay>,
        overlayElement
      )}
    </>
  );
};

export default Modal;
