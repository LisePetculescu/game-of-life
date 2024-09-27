import * as view from "./view.js"
import * as model from "./model.js"

export {init, clearGame}

const gridSize = {rows: 20, cols: 20}

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




function clearGame() {

    model.killAllCells();
}