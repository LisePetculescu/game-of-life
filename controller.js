import * as view from "./view.js";
import * as model from "./model.js";

export { init, clearGame, addRandom };

const gridSize = { rows: 20, cols: 50 };

init();

function init() {
  console.log("controller kører");
  model.init(gridSize);
  view.init(gridSize, model.grid);

  // model.calculateNextGen();

  setInterval(() => {
    model.calculateNextGen();
    view.updateCells(gridSize, model.grid);
  }, 500);
  // window.model = model;
}

function addRandom() {
  model.randomAliveCells();
  view.updateCells(gridSize, model.grid);
}

function clearGame() {
  model.killAllCells();
}
