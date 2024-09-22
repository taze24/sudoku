const table = document.getElementById("table")

// Make the generate game logic
// document.getElementById('inputElementId').readOnly = true;

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

let generatingGame = false; // A flag to indicate if we're generating the initial game

// Logic of the game remains mostly the same with minor changes:
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('input', function inputChecking() {
        // Remove non-numeric characters
        this.value = this.value.replace(/[^0-9]/g, '');

        // Limit to a single digit
        if (this.value.length > 1) {
            this.value = this.value.slice(0, 1);
        }

        const cell = this.closest('td');
        const row = cell.parentElement;
        const i = row.rowIndex;
        const j = Array.from(row.children).indexOf(cell);

        let column = [];
        for (let k = 0; k < 9; k++) {
            column.push(table.children[k].children[j].firstChild)
        }

        const inputsInRow = Array.from(row.querySelectorAll('input'));
        const inputsInLine = [...inputsInRow, ...column];

        let squareRow = Math.floor(i / 3);
        let squareCol = Math.floor(j / 3);
        let rowsIndex = 3 * squareRow;
        let colsIndex = 3 * squareCol;

        let squareCells = [];
        for (n = rowsIndex; n < rowsIndex + 3; n++) {
            for (m = colsIndex; m < colsIndex + 3; m++) {
                squareCells.push(table.children[n].children[m].firstChild);
            }
        }

        // Check for conflicts in the square
        let hasConflict = false;
        squareCells.forEach(cell => {
            if (cell !== this && cell.value === this.value && this.value !== "") {
                if (!generatingGame) {
                    alert("ERROR: There is already number " + this.value + " in this square.");
                }
                this.value = "";
                hasConflict = true;
            }
        });

        // Check for conflicts in the row or column
        if (!hasConflict) {
            inputsInLine.forEach(inputInLine => {
                if (inputInLine !== this && inputInLine.value === this.value && this.value !== "") {
                    if (!generatingGame) {
                        alert("ERROR: Invalid move. Number " + this.value + " is already in line.");
                    }
                    this.value = "";
                    hasConflict = true;
                }
            });
        }
    });
});

// Create game function to generate random numbers
function createGame() {
    generatingGame = true; // Set flag to indicate we're generating the game
    let filledCells = 0;

    while (filledCells < 20) {
        let randomRow = Math.floor(Math.random() * 9);
        let randomCol = Math.floor(Math.random() * 9);

        let randomCell = table.rows[randomRow].cells[randomCol].querySelector('input');

        if (randomCell.value !== "") {
            continue;
        }

        let randomNumber = Math.floor(Math.random() * 9) + 1;

        randomCell.value = randomNumber;

        const event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        randomCell.dispatchEvent(event);

        if (randomCell.value === "") {
            continue;
        }

        filledCells++;
    }
    generatingGame = false; // Unset the flag after game generation
}

