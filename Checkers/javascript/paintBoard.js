const height = 8;
const width = 8;
let selected=[];

function paintBoard(settings) {

    let table = document.createElement('table');
    table.setAttribute('id','game');
    let gameBoardElement = document.getElementById('gameBoard');
    gameBoardElement.appendChild(table);
    //TODO: add a table correspponding to the grid
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
                tdElement.addEventListener('click', function () { cellClick(row, col,data) })
            }
            else {
                tdElement.className = 'light-cell';
            }
            tdElement.classList.add();
            rowElement.appendChild(tdElement);
        }
    }


}


function makeBoardData() {
    
    // data.updateBoard();
}

class BoardData {
    constructor(startingPlayer) {
        //board keeps track of the units: 1 is white normal, 2 is white queen, -1 black normal, -2 black queen
        this.board = [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [-1, 0, -1, 0, -1, 0, 0, 0],
            [0, 0, 0, -1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [-1, 0, -1, 0, -1, 0, -1, 0],
            [0, -1, 0, -1, 0, -1, 0, -1]
        ]
        this.currentPlayer=startingPlayer;
    }

     select(row, col, cell) {
        cell.classList.add('selected');
        selected = [row, col];
    }
    


   getCell(row, col) {
        return (document.getElementById('gameBoard').firstChild.rows[row].cells[col]);
    }

    deselct() {
        selected=[];
        if(document.getElementsByClassName('selected').length>0)
        {
        
        document.getElementsByClassName('selected')[0].classList.remove('selected');
    }
    
    }
    deleteOptions()
    {
        while(document.getElementsByClassName('option').length>0)
        {
        document.getElementsByClassName('option')[0].classList.remove('option');
    }
    
    }
    // updateBoard() {
    //     for (let row = 0; row < height; row++) {
    //         for (let col = 0; col < width; col++) {
    //             let cell = table.rows[row].cells[col];
    //             while (cell.classList.length > 1) {
    //                 cell.classList.remove(cell.classList[1]);
    //             }
    //         }
    //     }

    // }
}
let data = new BoardData("white");