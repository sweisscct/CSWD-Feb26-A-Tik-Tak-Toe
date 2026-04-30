/*
Getting and displaying names
Placing symbols on the grid
Changing turns
Checking for game end
Display end game message
Increment Score
Reset Game
Start clock
*/

// name-input on click -> getAndDisplayName
// for each cell -> on click -> placeSymbol
// placeSymbol -> get currentPlayer, (if blank) update cell, , check for endGame, change turn
// checkGameEnd -> check rows, cols, diagonals for win or all full 
//      -> endGameMessage, updateScore, pauseClock
// endGameMessage -> alert
// updateScore -> getWinner -> get and increment score
// restart-button -> on click -> (for each cell -> cell.innerText=""), game-time=0, startClock

// Have fun!!

// Single source of truth
const maxPlayers = 2;
const numRows = 3;
const numCols = 3;

let x_wins;
const previousX = localStorage.getItem("X");
if (previousX) x_wins = previousX;
else x_wins = 0;
document.getElementById("x_wins").innerText = x_wins;

let o_wins;
const previousO = localStorage.getItem("O");
if (previousO) o_wins = previousO;
else o_wins = 0;
document.getElementById("o_wins").innerText = o_wins;

let player_wins = {}


const playerSymbols = ["X", "O"];
// playerSymbols.forEach(symbol => {
//     player_wins[symbol] = 0;
// });
// player_wins = {
//     "X": 0,
//     "O": 0
// }

let num_draws = 0;


let gameData = localStorage.getItem("Game data");
let currentPlayer;
let gridData;
if (gameData) {
    gameData = JSON.parse(gameData);
    currentPlayer = gameData["currentPlayer"];
    gridData = gameData["gridData"];
}
else {
    currentPlayer = 0;
    gridData = [
            "", "", "",
            "", "", "",
            "", "", "",
        ];
    // Grid stroage
    let gameData = {
        // "currentPlayer": currentPlayer,
        currentPlayer,
        gridData,
    }
}






console.log("Start!");

const cells = document.getElementsByTagName("td");
for (let cellNum = 0; cellNum < cells.length; cellNum++) {
    cells[cellNum].innerText = gridData[cellNum];
    cells[cellNum].addEventListener("click", (event) => {
        const clickedCell = event.target;
        console.log("clicked");
        if (!clickedCell.innerText) {
            clickedCell.innerText = playerSymbols[currentPlayer];
            gameData.gridData[cellNum] = playerSymbols[currentPlayer];
            console.log(`Grid data: ${gameData.gridData}`);
            checkEndGame();
            currentPlayer++ 
            currentPlayer = currentPlayer % maxPlayers;
            gameData["currentPlayer"] = currentPlayer;
            localStorage.setItem("Game data", JSON.stringify(gameData));            
        } 
    });
}

// console.log(`Cell num: ${cellNum}`);

const timer = document.getElementById("timer");
let startTime = new Date();
function setTimer() {
    timer.innerText = Math.round((new Date() - startTime)/1000);
}
const timerInterval = setInterval(setTimer, 1000);


function checkEndGame() {
    let isNotEmpty = true;
    // Check each row for 3 of the same symbols
    for (row = 0; row<numRows; row++) {
        //1st row: 0, 1, 2
        //2nd row: 3, 4, 5
        //3rd row: 6, 7, 8
        /*
        xox
        -oo
        xxx
        */
        let isAllTheSame = false;
        const currentRow = row*numCols;
        if (!cells[currentRow].innerText) {
            isNotEmpty = false;
            break; //skip to next row
        }
        const firstColValue = cells[currentRow].innerText; //x
        isAllTheSame = true;
        for (col=1; col<numCols; col++) {
            if (!cells[currentRow+col].innerText) isNotEmpty = false;
            isAllTheSame = isAllTheSame && firstColValue === cells[currentRow+col].innerText;
        }
        if (isAllTheSame) {
            alert(firstColValue + " has won!!");
            if (firstColValue === "X") {
                x_wins++;
                localStorage.setItem("X", x_wins);
            }
            else {
                o_wins++;
                localStorage.setItem("O", o_wins);
            }
            clearInterval(timerInterval);
        }
    } 


    for (col = 0; col<numCols; col++) {
        //1st row: 0, 1, 2
        //2nd row: 3, 4, 5
        //3rd row: 6, 7, 8
        /*
        xox
        -oo
        xxx
        */
        let isAllTheSame = false;
        const currentCol = col;
        if (!cells[currentCol].innerText) {
            break; //skip to next row
        }
        const firstRowValue = cells[currentCol].innerText; //x
        isAllTheSame = true;
        for (row=1; row<numRows; row++) {
            console.log(`Col: ${col} Row: ${row}`);
            isAllTheSame = isAllTheSame && firstRowValue === cells[currentCol+row*numCols].innerText;
        }
        if (isAllTheSame) {
            alert(firstRowValue + " has won!!");
            if (firstRowValue === "X") {
                x_wins++;
                localStorage.setItem("X", x_wins);
            }
            else {
                o_wins++;
                localStorage.setItem("O", o_wins);
            }
        }
    }     
    // if (isNotEmpty) alert("Game is a draw");

    // Main diagonal
        // let isAllTheSame = false;
        // for (col = 0; col<numCols; col++) {
        //     for (row=0; row<numRows; row++) {
        //         if (!cells[row + (numCols*col)].innerText) break;
        //         isAllTheSame = true;

        //     }
        // }




        // const currentCol = col;

        // if (!cells[currentCol].innerText) {
        //     break; //skip to next row
        // }
        // const firstRowValue = cells[currentCol].innerText; //x
        // isAllTheSame = true;
        // for (row=1; row<numRows; row++) {
        //     console.log(`Col: ${col} Row: ${row}`);
        //     isAllTheSame = isAllTheSame && firstRowValue === cells[currentCol+row*numCols].innerText;
        // }
        // if (isAllTheSame) alert(firstRowValue + " has won!!");
}




// timerInterval = setInterval(() => {

// }, 1000);


