/** LIBRARIES */
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CSSTransition from "react-transition-group/CSSTransition";

/** STYLES */
import classes from "./ControlPanel.module.css";

/** MODELS */
import { Icon } from "../../models/Icon";

/** CUSTOM */
import {
  gridActions,
  iconActions,
  resultActions,
  RootState,
} from "../../store/index";

/** CUSTOM COMPONENTS */
import Buttons from "../buttons/Buttons";
import Modal from "../ui/modal/Modal";
import Notification from "../ui/notification/Notification";

const ControlPanel = () => {
  // const nodeRef = useRef(null);   // TODO animácia
  const dispatch = useDispatch();
  const {
    allControlsDisplayed,
    endOfGameFlag,
    gridColumns,
    gridRows,
    largeMobileBreakpoint,
    lastMove,
    maxGridColumns,
    maxGridRows,
    tabletBreakpoint,
  } = useSelector((state: RootState) => ({
    allControlsDisplayed: state.icons.allControlsDisplayed,
    endOfGameFlag: state.result.endOfGameFlag,
    gridColumns: state.grid.gridColumns,
    gridRows: state.grid.gridRows,
    largeMobileBreakpoint: state.globalVars.largeMobileBreakpoint,
    lastMove: state.grid.lastMove,
    maxGridColumns: state.grid.maxGridColumns,
    maxGridRows: state.grid.maxGridRows,
    tabletBreakpoint: state.globalVars.tabletBreakpoint,
  }));

  const largeMobileView = window.innerWidth >= largeMobileBreakpoint;
  const tabletView = window.innerWidth >= tabletBreakpoint;
  const modalBtnsInRow = largeMobileView ? 3 : 2;

  // TODO skúsiť presunúť do osobitného súboru iconList - dispatch: Dispatch<>
  const iconList: Icon[] = useMemo(
    () => [
      {
        label: "New game",
        name: "tag",
        control: true,
        initialControl: true,
        clickHandler: () => {
          dispatch(
            gridActions.setNewGame({ cols: gridColumns, rows: gridRows })
          );
          dispatch(iconActions.hideAllControls());
          dispatch(resultActions.setWhoMoves("cross"));
          dispatch(resultActions.setWaitingForEngineResponse(false));
        },
      },
      {
        label: "Take back move",
        name: "undo",
        control: true,
        initialControl: true,
        clickHandler: () => {
          if (lastMove !== null) {
            dispatch(gridActions.undoLastMove());
            dispatch(resultActions.toggleWhoMoves());
          }
        },
      },
      {
        label: "Remove column",
        name: "chevron_left",
        control: true,
        clickHandler: () => {
          if (gridColumns > 3) {
            dispatch(gridActions.decrementGridColumns());
            dispatch(resultActions.setWhoMoves("cross"));
          }
        },
      },
      {
        label: "Add column",
        name: "chevron_right",
        control: true,
        clickHandler: () => {
          if (gridColumns < maxGridColumns) {
            dispatch(gridActions.incrementGridColumns());
            dispatch(resultActions.setWhoMoves("cross"));
          }
        },
      },
      {
        label: "Add row",
        name: "expand_more",
        control: true,
        clickHandler: () => {
          if (gridRows < maxGridRows) {
            dispatch(gridActions.incrementGridRows());
            dispatch(resultActions.setWhoMoves("cross"));
          }
        },
      },
      {
        label: "Remove row",
        name: "expand_less",
        control: true,
        clickHandler: () => {
          if (gridRows > 3) {
            dispatch(gridActions.decrementGridRows());
            dispatch(resultActions.setWhoMoves("cross"));
          }
        },
      },
      {
        name: "more_vert",
        control: true,
        initialControl: true,
        clickHandler: () => {
          dispatch(iconActions.showAllControls());
        },
      },
    ],
    [dispatch, gridColumns, gridRows, lastMove, maxGridColumns, maxGridRows]
  );

  const hideControlsHandler = () => {
    dispatch(iconActions.hideAllControls());
  };

  const closeGameOverHandler = () => {
    dispatch(resultActions.setEndOfGame(false));
    dispatch(resultActions.setWaitingForEngineResponse(false));
  };

  return (
    <>
      {tabletView && <Buttons icons={iconList} initial={false} inRow={1} />}
      {!tabletView && <Buttons icons={iconList} initial={true} inRow={3} />}
      {/* <CSSTransition
        in={allControlsDisplayed}
        timeout={500}
        classNames="modal-fade-slide"
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
        onEnter={() => console.log("onEnter")}
        onEntering={() => console.log("onEntering")}
        onEntered={() => console.log("onEntered")}
        onExit={() => console.log("onExit")}
        onExiting={() => console.log("onExiting")}
        onExited={() => console.log("onExited")}
      >
        <Modal onModalClose={closeModalHandler}>
          <Buttons icons={iconList} initial={false} inRow={2} />
        </Modal>
      </CSSTransition> */}
      {allControlsDisplayed && (
        <Modal closeHandler={hideControlsHandler} showCloseBtn={true}>
          <Buttons icons={iconList} initial={false} inRow={modalBtnsInRow} />
        </Modal>
      )}
      {endOfGameFlag && (
        <Modal closeHandler={closeGameOverHandler} showCloseBtn={false}><Notification message="Game Over" /></Modal>
      )}
    </>
  );
};

export default ControlPanel;
