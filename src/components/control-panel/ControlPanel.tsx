/** LIBRARIES */
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import CSSTransition from "react-transition-group/CSSTransition";

/** STYLES */
import classes from "./ControlPanel.module.css";

/** MODELS */
import { Icon } from "../../models/Icon";

/** CUSTOM */
import { gridActions, iconActions, RootState } from "../../store/index";
import { getCSSvar, pxToNumber } from "../../util/util";

/** CUSTOM COMPONENTS */
import Buttons from "../buttons/Buttons";
import Modal from "../ui/modal/Modal";

const ControlPanel = () => {
  const nodeRef = useRef(null);
  const dispatch = useDispatch();
  const { allControlsDisplayed, gridRows, gridColumns, maxGridRows, maxGridColumns, resultBarHeight } = useSelector(
    (state: RootState) => ({
      allControlsDisplayed: state.icons.allControlsDisplayed,
      gridRows: state.grid.gridRows,
      gridColumns: state.grid.gridColumns,
      maxGridRows: state.grid.maxGridRows,
      maxGridColumns: state.grid.maxGridColumns,
      resultBarHeight: state.result.resultBarHeight,
    })
  );

  const squareSize = useMemo(() => pxToNumber(getCSSvar("--square-side")), []);
  const buttonSize = useMemo(() => pxToNumber(getCSSvar("--button-side")), []);

  const iconList: Icon[] = useMemo(() => ([
    {
      name: "tag",
      control: true,
      initialControl: true,
      clickHandler: () => dispatch(gridActions.setNewGame()),
    },
    {
      name: "undo",
      control: true,
      initialControl: true,
      clickHandler: () => console.log("Last move"),
    },
    {
      name: "chevron_left",
      control: true,
      clickHandler: () => {
        if (gridColumns > 3) dispatch(gridActions.decrementGridColumns());
      },
    },
    {
      name: "chevron_right",
      control: true,
      clickHandler: () => {
        if (gridColumns < maxGridColumns) dispatch(gridActions.incrementGridColumns());
      },
    },
    {
      name: "expand_more",
      control: true,
      clickHandler: () => {
        if (gridRows < maxGridRows) dispatch(gridActions.incrementGridRows());
      },
    },
    {
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
  ]), [dispatch, gridColumns, gridRows, maxGridColumns, maxGridRows]);

  const closeModalHandler = useCallback(() => {
    dispatch(iconActions.hideAllControls());
  }, [dispatch]);

  const onViewportResize = useCallback(() => {console.log(window.innerWidth, resultBarHeight);
    const maxGridColumns = Math.trunc(window.innerWidth / squareSize);
    const maxGridRows = Math.trunc((window.innerHeight - buttonSize - resultBarHeight) / squareSize);

    dispatch(gridActions.setMaxGridColumns(maxGridColumns));
    dispatch(gridActions.setMaxGridRows(maxGridRows));
  }, [buttonSize, dispatch, resultBarHeight, squareSize]);

  window.addEventListener("resize", onViewportResize);

  useEffect(() => {
    onViewportResize();
    return () => {
      window.removeEventListener("resize", onViewportResize);
    };
  }, [onViewportResize]);

  return (
    <>
      <Buttons icons={iconList} initial={true} inRow={3} />
      <CSSTransition
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
      </CSSTransition>
      {/* {allControlsDisplayed && (
        <Modal onModalClose={closeModalHandler}>
          <Buttons icons={iconList} initial={false} inRow={2} />
        </Modal>
      )} */}
    </>
  );
};

export default ControlPanel;
