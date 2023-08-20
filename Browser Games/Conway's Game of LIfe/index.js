
var size = 50;
var htmlElements;
var cells;
var EMPTY = 0;
var ALIVE = 1;

function createField() {
    htmlElements = [];
    cells = [];
    var table = document.getElementById('field');
    for (var y = 0; y < size; y++) {
        var tr = document.createElement('tr'); // Creates new table row for each iteration
        var tdElements = [];
        cells.push(new Array(size).fill(EMPTY)) // Initilizes each cell with the empty value
        htmlElements.push(tdElements)
        table.appendChild(tr);
        for (var x = 0; x < size; x++) {
            var td = document.createElement('td'); // creates a new <td> (table cell) element for each iteration of the inner loop. The variable td holds a reference to this newly created cell.
            tdElements.push(td); // This adds the created <td> element to the tdElements array, which keeps track of all the cell elements in the current row.
            tr.appendChild(td) // This appends the created <td> element to the current <tr> (row) element, effectively adding the cell to the row.
        }
    }
}

function draw() {
    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            htmlElements[y][x].setAttribute('class', 'cell ' + (cells[y][x] == 1 ? 'filled' : 'empty'))
        }
    }
}

function countNeighbors(x, y) {
    var count = 0;
    for (dy = -1; dy <= 1; dy++) {
        for (dx = -1; dx <= 1; dx++) {
            var nx = (x + dx + size) % size, ny = (y + dy + size) % size;
            count = count + cells[ny][nx]
        }
    }
    return count - cells[y][x];
}
function newGeneration() {
    var newCells = [];
    for (var i = 0; i < size; i++) {
        newCells.push(new Array(size).fill(EMPTY));
    }
    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
            var neighbors = countNeighbors(x, y);
            if (cells[y][x] == EMPTY && neighbors == 3) {
                newCells[y][x] = ALIVE;
            }
            if (cells[y][x] == ALIVE && (neighbors == 2 || neighbors == 3)) {
                newCells[y][x] = ALIVE;
            }
        }
    }
    cells = newCells;
    draw();
}
function init() {
    createField();
    for (var i = 0; i < Math.floor(size * size * 0.3); i++) {
        var x, y;
        do {
            x = Math.floor(Math.random() * size), y = Math.floor(Math.random() * size);
            if (cells[y][x] == EMPTY) {
                cells[y][x] = ALIVE;
                break;
            }
        }   while(true); 
    } 
    draw();
    setInterval(newGeneration, 100); 
}
init()
 