import {
  Direction,
  MarkedSquare,
  NeighbouringSquare,
  SquareCoordinates,
  SquareStatus,
} from "../models/Square";
import { getSquareValue } from "../util/util";

/** Changeable time period for Engine thinking simulation */
export const millisecondOptions = [500, 750, 1000, 1250, 1500, 1750];

/**
 * After me making a move, the engine finds best possible response options and randomly chooses one of them
 * @param grid
 * @param engineMark
 * @returns Promise<SquareCoordinates>
 */
export const getEngineResponse = (
  grid: SquareStatus[][],
  engineMark: SquareStatus
): Promise<SquareCoordinates> => {
  return new Promise((resolve, reject) => {
    getMoveOptions(grid, engineMark);
  });
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

export const getItemOfIndex = () => {
  // po vybratí uprednostneného array z neho náhodne vyberie prvok = koordináty pre square (interface SquareCoordinates) pre mark 
};

const getMoveOptions = (
  grid: SquareStatus[][],
  engineMark: SquareStatus
) => {
  const myMark = engineMark === SquareStatus.CIRCLE ? SquareStatus.CROSS : SquareStatus.CIRCLE;
  const markedSquaresByMe = getSquaresWithMark(myMark, grid);
  const markedSquaresByEngine = getSquaresWithMark(engineMark, grid);

  // console.log(markedSquaresByMe, markedSquaresByEngine); // TODO - remove
  const AllNeighbouringSquares = getAllNeighbouringSquares(
    markedSquaresByMe,
    myMark,
    grid
  );
  console.log(AllNeighbouringSquares);
};

/**
 * Finds all squares with specific mark
 * @param mark
 * @param grid
 * @returns SquareCoordinates[]
 */
const getSquaresWithMark = (mark: SquareStatus, grid: SquareStatus[][]) => {
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

const getAllNeighbouringSquares = (
  markedSquares: SquareCoordinates[],
  mark: SquareStatus,
  grid: SquareStatus[][]
) => {
  const directionValues = Object.values(Direction);
  const allMarkedSquares: MarkedSquare[] = [];

  for (let i = 0; i < markedSquares.length; i++) {
    const neighbouringSquares: NeighbouringSquare[] = [];

    for (let dir of directionValues) {
      const neighbouringSquare = getNeighbouringSquare(
        grid,
        { xAxis: markedSquares[i].xAxis, yAxis: markedSquares[i].yAxis },
        mark,
        dir
      );
      if (neighbouringSquare) neighbouringSquares.push(neighbouringSquare);
    }

    allMarkedSquares.push({
      markedSquare: markedSquares[i],
      squares: neighbouringSquares,
    });
  }

  return allMarkedSquares;
};

const getNeighbouringSquare = (
  grid: SquareStatus[][],
  markedSquare: SquareCoordinates,
  markOfSquare: SquareStatus,
  direction: string
) => {
  const { xAxis, yAxis } = markedSquare;

  switch (direction) {
    case Direction.UP:
      return getSquare(xAxis, yAxis - 1, markOfSquare, grid);
    case Direction.UPRIGHT:
      return getSquare(xAxis + 1, yAxis - 1, markOfSquare, grid);
    case Direction.RIGHT:
      return getSquare(xAxis + 1, yAxis, markOfSquare, grid);
    case Direction.DOWNRIGHT:
      return getSquare(xAxis + 1, yAxis + 1, markOfSquare, grid);
    case Direction.DOWN:
      return getSquare(xAxis, yAxis + 1, markOfSquare, grid);
    case Direction.DOWNLEFT:
      return getSquare(xAxis - 1, yAxis + 1, markOfSquare, grid);
    case Direction.LEFT:
      return getSquare(xAxis - 1, yAxis, markOfSquare, grid);
    case Direction.UPLEFT:
      return getSquare(xAxis - 1, yAxis - 1, markOfSquare, grid);
  }
};

const getSquare = (
  x: number,
  y: number,
  mark: SquareStatus,
  grid: SquareStatus[][]
): NeighbouringSquare | null => {
  if (squareExists(x, y, grid)) {
    const squareValue = getSquareValue(x, y, grid);

    switch (squareValue) {
      case SquareStatus.EMPTY:
        // Add into array of empty squares
        return {
          empty: {
            xAxis: x,
            yAxis: y,
          },
        };
      case mark:
        // same mark as checked mark (circle alebo cross ) - zistiť či nie je kombinacia troch rovnakých znakov v radoch,
        // stlpcoch a diagonalach (varianty 1 dopredu a 1 dozadu, 2 dopredu, 2 dozadu) - lepšie: pri každom nájdenom overiť,
        // či má pred sebou a za sebou rovnaký znak, vo všetkých smeroch, 4 overenia z 8 (zvyšné sú to isté iba v opačnom smere) - podla toho pridať body
        // máme duplicitné polia - asi uprednostniť - ak najde rovnake pole a ma rozny znak, uprednostnit nie null a prepisat / opravit
        return {
          checkedMark: {
            xAxis: x,
            yAxis: y,
          },
        };
      default:
        // superiaci mark, buď circle alebo cross - overiť rovnako ako pri druhom case
        return {
          otherMark: {
            xAxis: x,
            yAxis: y,
          },
        };
    }
  } else {
    return null;
  }
};
