const height = 8;
const width = 8;

//last selected piece coordinates, emaxple: [2,5]
let selected=[];

//add the table and its content based on data.board
function paintBoard() {

    let table = document.createElement('table');
    table.setAttribute('id','game'); //redundant
    let gameBoardElement = document.getElementById('gameBoard');
    gameBoardElement.innerHTML='<h1 class ="checkers-h">Checkers</h1><h2 id="turn-h" class="black-turn">Black\'s turn</h2>';
    gameBoardElement.appendChild(table);

    for (let row = 0; row < height; row++) {
        let rowElement = table.insertRow();

        for (let col = 0; col < height; col++) {
            let tdElement = document.createElement('td');
            //if dark piece
            if ((row + col) % 2 === 0) {
                tdElement.className = "dark-cell";
                if(data.board[row][col]===1)
                {
                    tdElement.classList.add('white-piece');
                }
                else if(data.board[row][col]===-1)
                {
                    tdElement.classList.add('black-piece');

                }
                else if(data.board[row][col]===2)
                {
                    tdElement.classList.add('white-queen');

                }
                else if(data.board[row][col]===-2)
                {
                    tdElement.classList.add('black-queen');

                }
                tdElement.addEventListener('click', function () { cellClick(row, col, !data.endGame) })
            }
            else {
                tdElement.className = 'light-cell';
            }
            tdElement.classList.add();
            rowElement.appendChild(tdElement);
        }
    }


}
