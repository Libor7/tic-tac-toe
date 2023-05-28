import { SquareCoordinates, SquareStatus } from "../models/Square";
import { getSquareValue } from "../util/util";

export const millisecondOptions = [1250, 1500, 1750, 2000, 2250, 2500];

/**
 * After me making a move, the engine finds best possible response options and randomly chooses one of them
 * @param myMark
 * @param engineMark
 */
export const getEngineResponse = (
  columns: number,
  rows: number,
  grid: SquareStatus[][]
): Promise<SquareCoordinates> => {
  return new Promise((resolve, reject) => {
    const hasEmptySquare = getFlattenArray(grid).some(
      (item: SquareStatus) => item === SquareStatus.EMPTY
    );

    if (!hasEmptySquare) {
      reject("Game over");
    } else {
      // TODO - nájsť vhodné pole - zatial ktorékolvek prázdne
      const milliseconds =
      millisecondOptions[
        generateRandomNumberInRange(millisecondOptions.length)
      ];

      setTimeout(() => {
        resolve(getRandomSquareCoordinates(columns, rows, grid));
      }, milliseconds);
    }
  });
};

/**
 * Generates random integer between 0 and maxNum, including maxNum (if maxNum is equal 3, it generates any number from numbers 0, 1, 2)
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
  // TODO
  // po vybratí array, ktoré uprednostníme z tohto array náhodne vyberieme prvok = koordináty pre square (interface SquareCoordinates), na ktoré vložíme mark 
};

/**
 * Gets coordinates of randomly chosen empty square
 * @param grid
 */
export const getRandomSquareCoordinates = (
  gridCols: number,
  gridRows: number,
  grid: SquareStatus[][]
): SquareCoordinates => {
  let xAxis: number, yAxis: number;

  do {
    xAxis = generateRandomNumberInRange(gridCols);
    yAxis = generateRandomNumberInRange(gridRows);
  } while (getSquareValue(xAxis, yAxis, grid) !== SquareStatus.EMPTY);

  return { xAxis: xAxis, yAxis: yAxis };
};

export const isGridEmpty = (flattenGrid: SquareStatus[]) => {
  return flattenGrid.every((item) => item === SquareStatus.EMPTY);
};
