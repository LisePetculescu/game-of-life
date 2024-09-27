import * as controller from "./controller.js";

export { init, updateCells };

function init(gridSize, grid) {
  console.log("view kører");
  document.querySelector("#clearGame").addEventListener("click", controller.clearGame);
  document.querySelector("#addRandomAliveCells").addEventListener("click", controller.addRandom);

  createBoard(gridSize);
  updateCells(gridSize, grid);

}

function createBoard(gridSize) {
  // create html --> 400 cells
  document.querySelector("#displayBoard").innerHTML = "";

  for (let row = 0; row < gridSize.rows; row++) {
    for (let col = 0; col < gridSize.cols; col++) {
      document.querySelector("#displayBoard").insertAdjacentHTML("beforeend", `<div class="cell" data-row="${row}" data-col="${col}"></div>`);
    }
  }
}

function updateCells(gridSize, grid) {
  // change color on cell depending on their status
  // datasets
  

  for (let row = 0; row < gridSize.rows; row++) {
    for (let col = 0; col < gridSize.cols; col++) {
      if (grid[row][col] == 1) {
        document.querySelector(`[data-row="${row}"][data-col="${col}"]`).classList.add("alive");
      } else if (grid[row][col] == 0) {
        document.querySelector(`[data-row="${row}"][data-col="${col}"]`).classList.remove("alive");
      }
    }
  }
}
