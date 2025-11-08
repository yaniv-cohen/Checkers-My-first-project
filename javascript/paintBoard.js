const height = 8;
const width = 8;

//add the table and its content based on board
function paintBoard(data) {

    let table = document.createElement('table');
    table.setAttribute('id','game'); //redundant
    let gameBoardElement = document.getElementById('gameBoard');
    gameBoardElement.innerHTML='<h1 class ="checkers-h">Checkers</h1><h2 id="turn-h" class="black-turn">Black\'s turn</h2>';
    gameBoardElement.appendChild(table);


    function getCellPieceClass(cellValue) {
        let colorOfPiece= cellValue >0 ? 'white' : cellValue<0 ? 'black' : 'empty';
        let typeOfPiece = Math.abs(cellValue)===2 ? 'queen' : Math.abs(cellValue)===1 ? 'piece' : 'empty';
        return colorOfPiece+"-"+ typeOfPiece;
    }
    for (let row = 0; row < height; row++) {
        let rowElement = table.insertRow();

        for (let col = 0; col < width; col++) {
            let tdElement = document.createElement('td');
            if ((row + col) % 2 === 0) {
                tdElement.className = "dark-cell";

                // dark cell
            tdElement.addEventListener('click', function () { cellClick(data, row, col, !data.endGame) })
                    tdElement.classList.add(getCellPieceClass(data.board[row][col]) );
            }
            else {
                tdElement.className = 'light-cell';
            }
            rowElement.appendChild(tdElement);
        }
    }


}
