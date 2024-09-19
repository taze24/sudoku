const table = document.getElementById("table")

for (let i = 0; i < 9; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 9; j++) {
        let col = document.createElement("td");
        let input = document.createElement("input");
        col.appendChild(input);
        row.appendChild(col)
    }
    table.appendChild(row)
}

for (let i = 2; i < table.rows[0].cells.length; i += 3) {
    for (let row of table.rows) {
        row.cells[i].style.borderRight = '3px solid black';
    }
}

// Apply the style to every third row
for (let i = 2; i < table.rows.length; i += 3) {
    for (let cell of table.rows[i].cells) {
        cell.style.borderBottom = '3px solid black';
    }
}

//  ======= LOGIC OF GAME BEGINS HERE =======

const inputs = document.querySelectorAll('input'); // Select all input elements

inputs.forEach(input => {
    input.addEventListener('input', function () {
        // Remove non-numeric characters
        this.value = this.value.replace(/[^0-9]/g, '');

        // Limit to a single digit
        if (this.value.length > 1) {
            this.value = this.value.slice(0, 1);
        }

        // Get the table cell (td) that contains the input
        const cell = this.closest('td');
        // Get the row (tr) that contains the cell
        const row = cell.parentElement;
        // Get the row index (i)
        const i = row.rowIndex;
        // Get the column index (j)
        const j = Array.from(row.children).indexOf(cell);

        let column = [];
        for (let k = 0; k < 9; k++) {
            //k = rows, j = columns and the first child is the input element.
            column.push(table.children[k].children[j].firstChild)
        }

        // array of inputs in the row (horizontal inputs)
        const inputsInRow = Array.from(row.querySelectorAll('input'));
        // Merging the inputsInRow with inputsInCol to make a cross and check them at one time
        const inputsInLine = [...inputsInRow, ...column];

        // Getting the position of the square(i,j) 
        let squareRow = Math.floor(i / 3);
        let squareCol = Math.floor(j / 3);
        // Getting all the rows in the square
        // e.g SQUARE = 0 -> rowsIndexes[0,1,2] etc.
        let rowsIndex = 3 * squareRow;
        let colsIndex = 3 * squareCol;

        // Making an array of inputs that belong in the square as the input
        let squareCells = [];
        for (n = rowsIndex; n < rowsIndex + 3; n++) {
            for (m = colsIndex; m < colsIndex + 3; m++) {
                squareCells.push(table.children[n].children[m].firstChild)
            }
        }

        // Checking if input is already in the same square 
        squareCells.forEach(cell => {
            if (cell !== this && cell.value === this.value && this.value !== "") {
                alert("ERROR: There is already number " + this.value + " in this square.");
                this.value = "";
                return;
            }
        })
        // Checking if input is already entered in horizontal or vertical line
        inputsInLine.forEach(inputInLine => {
            if (inputInLine !== this && inputInLine.value === this.value && this.value !== "") {
                alert("ERROR: Invalid move. Number " + this.value + " is already in line.")
                this.value = "";
                return;
            }
        })

    });
});