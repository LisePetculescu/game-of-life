// https://petlatkea.notion.site/Game-of-Life-1031d7fec097804e847dfaa27fae8ae8

import * as view from "./view.js";
import * as model from "./model.js";

export { init, clearGame, addRandom };

const gridSize = { rows: 20, cols: 50 };

init();

function init() {
  console.log("controller kører");
  model.init(gridSize);
  view.init(gridSize, model.grid);

  setInterval(() => {
    model.calculateNextGen();
    view.updateCells(gridSize, model.grid);
  }, 500);
}

function addRandom() {
  model.randomAliveCells();
  view.updateCells(gridSize, model.grid);
}

function clearGame() {
  model.killAllCells();
}
