import { SquareStatus } from "../models/Square";

export const setSquareClasses = (squareObj: {
  xAxis: number;
  yAxis: number;
  columns: number;
  rows: number;
}) => {
  const squareClasses: string[] = ["square-base"];

  if (squareObj.xAxis === 0) {
    squareClasses.push("left-square");
  }

  if (squareObj.yAxis === 0) {
    squareClasses.push("top-square");
  }

  if (squareObj.xAxis === squareObj.columns - 1) {
    squareClasses.push("right-square");
  }

  if (squareObj.yAxis === squareObj.rows - 1) {
    squareClasses.push("bottom-square");
  }

  return squareClasses;
};

export const setNewGrid = (columns: number, rows: number): SquareStatus[][] => {
  return new Array(rows).fill(new Array(columns).fill(SquareStatus.EMPTY));
};

export const getSquareValue = (x: number, y: number, grid: SquareStatus[][]) => {
  return grid[y][x];
};

export const setSquare = (colNum: number, rowNum: number, mark: SquareStatus, grid: SquareStatus[][]) => {
  const newGrid: SquareStatus[][] = [];

  for (let i = 0; i < grid.length; i++) {
    if (i === rowNum) {
      const newRow = grid[i].map((item, index) => index === colNum ? mark : item);
      newGrid.push([...newRow]);
    } else {
      newGrid.push([...grid[i]]);
    }
  }
  
  return newGrid;
};
