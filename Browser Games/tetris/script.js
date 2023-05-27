const mapWeight = 300;
const  mapHeight = 600;
const numberOfRows = 20;
const numberofCols = 10;
const cellSize = mapWeight / numberofCols;
const borderSize = 0.2;

class Block {
    constructor(cells, x, y) {
        this.cells = cells;
        this.position = { x, y };
        this.isAlive = true;
    }
}

const render = (game, block, time) => {

};

const generateField = (rows, cols) => {
    const field = Array.from({length: rows},
        () => Array.from({length: cols}, () => 0))
};

window.onload = () => {
    const canvas = document.getElementById('map');
    const ctx = canvas.getContext('2d');
    const game = {
        ctx,
        field: generateField(numberOfRows + 4, numberofCols),
    }

    render(game)
};