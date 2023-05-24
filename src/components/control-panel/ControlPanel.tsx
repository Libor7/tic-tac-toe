/** LIBRARIES */
import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CSSTransition from "react-transition-group/CSSTransition";

/** STYLES */
import classes from "./ControlPanel.module.css";

/** MODELS */
import { Icon } from "../../models/Icon";

/** CUSTOM */
import {
  globalVariablesActions,
  gridActions,
  iconActions,
  RootState,
} from "../../store/index";

/** CUSTOM COMPONENTS */
import Buttons from "../buttons/Buttons";
import Modal from "../ui/modal/Modal";

const ControlPanel = () => {
  // const nodeRef = useRef(null);   // TODO animácia
  const wrappedDiv = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const {
    allControlsDisplayed,
    buttonSide,
    controlPanelWidth,
    gridColumns,
    gridRows,
    maxGridColumns,
    maxGridRows,
    largeMobileBreakpoint,
    resultBarHeight,
    squareSide,
    tabletBreakpoint,
  } = useSelector((state: RootState) => ({
    allControlsDisplayed: state.icons.allControlsDisplayed,
    buttonSide: state.globalVars.buttonSide,
    controlPanelWidth: state.globalVars.controlPanelWidth,
    gridColumns: state.grid.gridColumns,
    gridRows: state.grid.gridRows,
    maxGridColumns: state.grid.maxGridColumns,
    maxGridRows: state.grid.maxGridRows,
    largeMobileBreakpoint: state.globalVars.largeMobileBreakpoint,
    resultBarHeight: state.globalVars.resultBarHeight,
    squareSide: state.globalVars.squareSide,
    tabletBreakpoint: state.globalVars.tabletBreakpoint,
  }));

  const largeMobileView = window.innerWidth >= largeMobileBreakpoint;
  const tabletView = window.innerWidth >= tabletBreakpoint;
  const gridPadding = tabletView ? 48 : 16;
  const modalBtnsInRow = largeMobileView ? 3 : 2;

  // TODO skúsiť presunúť do osobitného súboru iconList - dispatch: Dispatch<> 
  const iconList: Icon[] = useMemo(
    () => [
      {
        label: "New game",
        name: "tag",
        control: true,
        initialControl: true,
        clickHandler: () => dispatch(gridActions.setNewGame()),
      },
      {
        label: "Take back move",
        name: "undo",
        control: true,
        initialControl: true,
        clickHandler: () => console.log("Last move"),
      },
      {
        label: "Remove column",
        name: "chevron_left",
        control: true,
        clickHandler: () => {
          if (gridColumns > 3) dispatch(gridActions.decrementGridColumns());
        },
      },
      {
        label: "Add column",
        name: "chevron_right",
        control: true,
        clickHandler: () => {
          if (gridColumns < maxGridColumns)
            dispatch(gridActions.incrementGridColumns());
        },
      },
      {
        label: "Add row",
        name: "expand_more",
        control: true,
        clickHandler: () => {
          if (gridRows < maxGridRows) dispatch(gridActions.incrementGridRows());
        },
      },
      {
        label: "Remove row",
        name: "expand_less",
        control: true,
        clickHandler: () => {
          if (gridRows > 3) dispatch(gridActions.decrementGridRows());
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
      {
        name: "close",
        control: false,
      },
      {
        name: "radio_button_unchecked",
        control: false,
      },
    ],
    [dispatch, gridColumns, gridRows, maxGridColumns, maxGridRows]
  );

  const closeModalHandler = useCallback(() => {
    dispatch(iconActions.hideAllControls());
  }, [dispatch]);

  const onViewportResize = useCallback(() => {
    const width = tabletView
      ? window.innerWidth - controlPanelWidth - gridPadding
      : window.innerWidth - gridPadding;
    const height = tabletView
      ? window.innerHeight - resultBarHeight - gridPadding
      : window.innerHeight - buttonSide - resultBarHeight - gridPadding;
    const maxGridCols = Math.trunc(width / squareSide);
    const maxGridRws = Math.trunc(height / squareSide);
    dispatch(gridActions.setMaxGridColumns(maxGridCols));
    dispatch(gridActions.setMaxGridRows(maxGridRws));
    dispatch(gridActions.setNewGame());
    closeModalHandler();
  }, [
    buttonSide,
    closeModalHandler,
    controlPanelWidth,
    tabletView,
    dispatch,
    gridPadding,
    resultBarHeight,
    squareSide,
  ]);

  window.addEventListener("resize", onViewportResize);

  useEffect(() => {
    onViewportResize();
    dispatch(
      globalVariablesActions.setControlPanelWidth(
        wrappedDiv.current?.offsetWidth
      )
    );

    return () => {
      window.removeEventListener("resize", onViewportResize);
    };
  }, [dispatch, onViewportResize]);

  return (
    <div ref={wrappedDiv}>
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
        <Modal onModalClose={closeModalHandler}>
          <Buttons icons={iconList} initial={false} inRow={modalBtnsInRow} />
        </Modal>
      )}
    </div>
  );
};

export default ControlPanel;
