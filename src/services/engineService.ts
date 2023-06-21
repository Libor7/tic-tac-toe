import {
  Direction,
  SquareCoordinates,
  SquareStatus,
} from "../models/Square";
import { getSquareValue } from "../util/util";

/** Changeable time period for Engine thinking simulation */
export const millisecondOptions = [500, 750, 1000, 1250, 1500, 1750];

/** Mapping of directions to their opposite */
export const oppositeDirection = {
  Up: "Down",
  UpRight: "DownLeft",
  Right: "Left",
  DownRight: "UpLeft",
  Down: "Up",
  DownLeft: "UpRight",
  Left: "Right",
  UpLeft: "DownRight",
};

/**
 * Generates random integer between 0 and maxNum (if maxNum is 3, it returns any number from numbers 0, 1, 2)
 * @param maxNum
 * @returns number
 */
export const generateRandomNumberInRange = (maxNum: number) => {
  return Math.floor(Math.random() * maxNum);
};

/**
 * Flattens the input array (from [[0, 0, 0], [0, 0, 0], [0, 0, 0]] creates [0, 0, 0, 0, 0, 0, 0, 0, 0])
 * @param grid
 * @returns SquareStatus[]
 */
export const getFlattenArray = (grid: SquareStatus[][]) => {
  return grid.flat();
};

/**
 * Finds all squares with specific mark
 * @param mark
 * @param grid
 * @returns SquareCoordinates[]
 */
export const getSquaresWithMark = (
  mark: SquareStatus,
  grid: SquareStatus[][]
) => {
  const markedSquares: SquareCoordinates[] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === mark) markedSquares.push({ xAxis: j, yAxis: i });
    }
  }
  return markedSquares;
};

/**
 * Gets coordinates of randomly chosen empty square
 * @param grid
 * @returns SquareCoordinates
 */
export const getRandomSquareCoordinates = (
  grid: SquareStatus[][]
): SquareCoordinates => {
  let xAxis: number, yAxis: number;
  const gridRows = grid.length;
  const gridCols = grid[0].length;

  do {
    xAxis = generateRandomNumberInRange(gridCols);
    yAxis = generateRandomNumberInRange(gridRows);
  } while (getSquareValue(xAxis, yAxis, grid) !== SquareStatus.EMPTY);

  return { xAxis: xAxis, yAxis: yAxis };
};

/**
 * Returns true, if all grid squares have value SquareStatus.EMPTY
 * @param flattenGrid
 * @returns boolean
 */
export const isGridEmpty = (flattenGrid: SquareStatus[]) => {
  return flattenGrid.every((item) => item === SquareStatus.EMPTY);
};

/**
 * Returns true, if all grid squares are filled with values and there is no square with SquareStatus.EMPTY as a value
 * @param flattenGrid
 * @returns
 */
export const isGridFilled = (flattenGrid: SquareStatus[]) => {
  return !flattenGrid.some(
    (square: SquareStatus) => square === SquareStatus.EMPTY
  );
};

/**
 * Checks if current grid contains a square with specific coordinates
 * @param xAxis
 * @param yAxis
 * @param grid
 * @returns boolean
 */
const squareExists = (xAxis: number, yAxis: number, grid: SquareStatus[][]) => {
  return (
    xAxis >= 0 && xAxis < grid[0].length && yAxis >= 0 && yAxis < grid.length
  );
};

/** Methods for navigation in the grid. The input is a square we are currently on. It returns a square to which we move. Repetition decides how many times we want to move in that direction */
const moveUp = (
  currentSquare: SquareCoordinates,
  repetition: number
): SquareCoordinates => {
  return {
    xAxis: currentSquare.xAxis,
    yAxis: currentSquare.yAxis - repetition * 1,
  };
};

const moveUpRight = (
  currentSquare: SquareCoordinates,
  repetition: number
): SquareCoordinates => {
  return {
    xAxis: currentSquare.xAxis + repetition * 1,
    yAxis: currentSquare.yAxis - repetition * 1,
  };
};

const moveRight = (
  currentSquare: SquareCoordinates,
  repetition: number
): SquareCoordinates => {
  return {
    xAxis: currentSquare.xAxis + repetition * 1,
    yAxis: currentSquare.yAxis,
  };
};

const moveDownRight = (
  currentSquare: SquareCoordinates,
  repetition: number
): SquareCoordinates => {
  return {
    xAxis: currentSquare.xAxis + repetition * 1,
    yAxis: currentSquare.yAxis + repetition * 1,
  };
};

const moveDown = (
  currentSquare: SquareCoordinates,
  repetition: number
): SquareCoordinates => {
  return {
    xAxis: currentSquare.xAxis,
    yAxis: currentSquare.yAxis + repetition * 1,
  };
};

const moveDownLeft = (
  currentSquare: SquareCoordinates,
  repetition: number
): SquareCoordinates => {
  return {
    xAxis: currentSquare.xAxis - repetition * 1,
    yAxis: currentSquare.yAxis + repetition * 1,
  };
};

const moveLeft = (
  currentSquare: SquareCoordinates,
  repetition: number
): SquareCoordinates => {
  return {
    xAxis: currentSquare.xAxis - repetition * 1,
    yAxis: currentSquare.yAxis,
  };
};

const moveUpLeft = (
  currentSquare: SquareCoordinates,
  repetition: number
): SquareCoordinates => {
  return {
    xAxis: currentSquare.xAxis - repetition * 1,
    yAxis: currentSquare.yAxis - repetition * 1,
  };
};

/**
 * Find the same square coordinates in two arrays
 * @param engineMarkNeighbourSquares
 * @param humanMarkNeighbourSquares
 * @returns SquareCoordinates[]
 */
export const getDuplicateSquares = (
  engineMarkNeighbourSquares: SquareCoordinates[],
  humanMarkNeighbourSquares: SquareCoordinates[]
) => {
  const duplicates: SquareCoordinates[] = [];

  for (let i = 0; i < engineMarkNeighbourSquares.length; i++) {
    const duplicate = humanMarkNeighbourSquares.find(
      (square: SquareCoordinates) =>
        square.xAxis === engineMarkNeighbourSquares[i].xAxis &&
        square.yAxis === engineMarkNeighbourSquares[i].yAxis
    );
    if (duplicate) duplicates.push(duplicate);
  }

  return duplicates;
};

export const getNeighbourSquares = (
  square: SquareCoordinates,
  mark: SquareStatus,
  grid: SquareStatus[][]
) => {
  const emptyNeighbourSquares: SquareCoordinates[] = [];
  const sameMarkNeighbourSquares: SquareCoordinates[] = [];
  const threeInRowSquares: SquareCoordinates[] = [];

  for (let direction of Object.values(Direction)) {
    const moveFn = `move${direction}(square, 1)`;
    const coordinates: SquareCoordinates = eval(moveFn);
    const { xAxis, yAxis } = coordinates;

    if (squareExists(xAxis, yAxis, grid)) {
      const squareMark: SquareStatus = getSquareValue(xAxis, yAxis, grid);

      switch (squareMark) {
        case SquareStatus.EMPTY:
          emptyNeighbourSquares.push(coordinates);
          break;
        case mark: {
          sameMarkNeighbourSquares.push(coordinates);
          const oppositeMoveFn = `move${oppositeDirection[direction]}(square, 1)`;
          const oppositeSquareCoordinates: SquareCoordinates =
            eval(oppositeMoveFn);
          const { xAxis: x, yAxis: y } = oppositeSquareCoordinates;

          if (squareExists(x, y, grid)) {
            const oppositeSquareMark: SquareStatus = getSquareValue(x, y, grid);
            if (oppositeSquareMark === SquareStatus.EMPTY) threeInRowSquares.push();
          }
          break;
        }
      }
    }
  }
  
  return {
    emptySquares: emptyNeighbourSquares,
    sameMarkSquares: sameMarkNeighbourSquares,
    threeInRow: threeInRowSquares
  };
};

export const getAllNeighbourSquares = (markedSquares: SquareCoordinates[], mark: SquareStatus, grid: SquareStatus[][]) => {
  const emptySquaresSummary: SquareCoordinates[] = [];
  const sameMarkSquaresSummary: SquareCoordinates[] = [];
  const threeInRowSummary: SquareCoordinates[] = [];

  for (let i = 0; i < markedSquares.length; i++) {
    const { emptySquares, sameMarkSquares, threeInRow} = getNeighbourSquares(markedSquares[i], mark, grid);

    for (let j = 0; j < emptySquares.length; j++) {
      const foundSquare = emptySquaresSummary.find((square: SquareCoordinates) => square.xAxis === emptySquares[j].xAxis && square.yAxis === emptySquares[j].yAxis);

      if (!foundSquare) emptySquaresSummary.push(emptySquares[j]);
    }

    for (let k = 0; k < sameMarkSquares.length; k++) {
      const foundSquare = sameMarkSquaresSummary.find((square: SquareCoordinates) => square.xAxis === sameMarkSquares[k].xAxis && square.yAxis === sameMarkSquares[k].yAxis);

      if (!foundSquare) sameMarkSquaresSummary.push(sameMarkSquares[k]);
    }

    for (let l = 0; l < threeInRow.length; l++) {
      const foundSquare = threeInRowSummary.find((square: SquareCoordinates) => square.xAxis === threeInRow[l].xAxis && square.yAxis === threeInRow[l].yAxis);

      if (!foundSquare) threeInRowSummary.push(threeInRow[l]);
    }
  }

  console.log(emptySquaresSummary, sameMarkSquaresSummary, threeInRowSummary);

  return {
    emptySquaresSummary,
    sameMarkSquaresSummary,
    threeInRowSummary
  };
};

