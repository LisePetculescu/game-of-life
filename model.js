export { init, grid, calculateNextGen, killAllCells, randomAliveCells };

let grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

let rows = 0;
let cols = 0;

function init(gridSize) {
  console.log("model kører");

  rows = gridSize.rows;
  cols = gridSize.cols;

  createGenGrid(gridSize.rows, gridSize.cols);
  randomAliveCells(true);
  console.table(grid);
}

function countNeighbours(cell) {
  let count = 0;

  for (let row = -1; row <= 1; row++) {
    for (let col = -1; col <= 1; col++) {
      if (!(row == 0 && col == 0)) {
        const currentRow = cell.row - row;
        const currentCol = cell.col - col;

        if (isValidCell({ row: currentRow, col: currentCol })) {
          if (grid[currentRow][currentCol] == 1) {
            count++;
          }
        }
      }
    }
  }
  return count;
}

function isValidCell(cell) {
  if (cell.row < 0 || cell.row >= rows || cell.col < 0 || cell.col >= cols) {
    return false;
  }
  return true;
}

function deadOrAlive(oldValue, numberOfNeighbours) {
  // check if current cell needs to change status
  /*
  - < 2 naboer - cellen dør af ensomhed || > 3 naboer - cellen død af overbefolkning
  - 2 naboer - cellen lever videre, hvis den altså var levende
  - 3 naboer - en ny celle bliver født, eller lever videre, hvis der var en
  */
  if (numberOfNeighbours < 2 || numberOfNeighbours > 3) {
    return 0;
  } else if (numberOfNeighbours == 2) {
    return oldValue;
  } else if (numberOfNeighbours == 3) {
    return 1;
  }
}

function calculateNextGen() {
  // make new model/grid
  let newGrid = [];
  let newRow = [];

  for (let gridRow = 0; gridRow < rows; gridRow++) {
    for (let gridCol = 0; gridCol < cols; gridCol++) {
      const currentValue = grid[gridRow][gridCol];
      const cell = { row: gridRow, col: gridCol };
      // count neighbours in old gen
      const amountOfNeighbours = countNeighbours(cell);
      // decide if deadOrALive in new gen
      const newCellValue = deadOrAlive(currentValue, amountOfNeighbours);
      // replace old Gen with new Gen
      newRow.push(newCellValue);
    }
    newGrid.push(newRow);
    newRow = [];
  }
  grid = newGrid;
}

function createGenGrid(rows, cols) {
  let newGrid = [];
  let newRow = [];

  for (let gridRow = 0; gridRow < rows; gridRow++) {
    for (let gridCols = 0; gridCols < cols; gridCols++) {
      newRow.push(0);
    }

    newGrid.push(newRow);
    newRow = [];
  }
  grid = newGrid;
}

function randomAliveCells(newGame) {
  const randomFactor = 0.2;
  // 20% chance for cell to be 1 == alive

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let value = Math.random();
      if (value < randomFactor) {
        grid[row][col] = 1;
      } else if (newGame) {
        grid[row][col] = 0;
      }
    }
  }
}

// function addRandomAliveCells() {
//   const randomFactor = 0.2;
//   // 20% chance for cell to be 1 == alive

//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       let value = Math.random();
//       if (value < randomFactor) {
//         grid[row][col] = 1;
//       }
//     }
//   }
// }

function killAllCells() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      grid[row][col] = 0;
    }
  }
}
