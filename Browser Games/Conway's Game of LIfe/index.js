
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
        table.appendChild(tr);
        for (var x = 0; x < size; x++) {
            var td = document.createElement('td'); // creates a new <td> (table cell) element for each iteration of the inner loop. The variable td holds a reference to this newly created cell.
            tdElements.push(td); // This adds the created <td> element to the tdElements array, which keeps track of all the cell elements in the current row.
            tr.appendChild(td) // This appends the created <td> element to the current <tr> (row) element, effectively adding the cell to the row.
        }
    }
}