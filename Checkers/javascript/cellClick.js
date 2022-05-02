function cellClick(row, col, goOn) {
    if(goOn)
    {
        
    let cell = document.getElementById('game').rows[row].cells[col];

    //if i have no piece selected
    if (selected.length == 0) {
        //if clicked on my piece
        if ((data.currentPlayer === "white" && data.board[row][col] > 0) ||
            (data.currentPlayer === "black" && data.board[row][col] < 0)) {
            //select this piece
            data.deleteOptions();
            data.select(row, col, cell);
            data.canIEat();
            getAllMoves(row, col);
            // data.movePool.push(showPossibleMoves(row, col, false, cellValue));
        }
        //if clicked on nothing
        //do nothing
    }
    //if i have something selected
    else {

        //if i clicked on one of my pieces=> show possible moves for this piece
        if ((data.currentPlayer === "white" && data.board[row][col] > 0) ||
            (data.currentPlayer === "black" && data.board[row][col] < 0)) {
            data.deselct();
            data.deleteOptions();

            data.select(row, col, cell);
            data.canEat = false;
            console.log('can eat :::' + data.canEat);
            for (let i = 0; i < 8; i++) {
                for (let k = 0; k < 8; k++) {
                    if ((data.currentPlayer === "white" && data.board[i][k] > 0) ||
                        (data.currentPlayer === "black" && data.board[i][k] < 0)) {
                        data.canIEat();
                        getAllMoves(row, col, false);
                    }
                }
            }
            data.canIEat();
            getAllMoves(row, col);
        }
        //if i clicked on an empty cell
        else if (data.board[row][col] === 0) {
            data.canEat = false;
            for (let i = 0; i < 8; i++) {
                for (let k = 0; k < 8; k++) {
                    if ((data.currentPlayer === "white" && data.board[i][k] > 0) ||
                        (data.currentPlayer === "black" && data.board[i][k] < 0))
                        {data.canIEat();
                    console.log(getAllMoves(row, col, false));
                        }
                }
            }
            data.canIEat();
            getAllMoves(row, col);
            console.log("eat " + data.canEat);
            //if it is a valid move
            if (cell.classList.contains('option')) {
                //copy the selected cell value and classes 
                data.board[row][col] = data.board[selected[0]][selected[1]];
                document.getElementById('game').rows[row].cells[col].className = document.getElementById('game').rows[selected[0]].cells[selected[1]].className;
                //empty dead cell
                data.board[selected[0]][selected[1]] = 0;
                document.getElementById('game').rows[selected[0]].cells[selected[1]].className = 'dark-cell';


                //did I reach the end for black?
                if (data.board[row][col] === -1 && row === 0) {

                    data.board[row][col] = -2;
                    document.getElementById('game').rows[row].cells[col].className = 'dark-cell black-queen';
                }
                //did I reach the end for white?
                else if (data.board[row][col] === 1 && row === 7) {

                    data.board[row][col] = 2;
                    document.getElementById('game').rows[row].cells[col].className = 'dark-cell white-queen';
                }

                //if it was a hop
                console.log("data.canEat: " + data.canEat);
                if (data.canEat) {
                    //console.log(select);
                    //console.log()
                    onEat()
                    data.combo = true;
                    data.canEat = false;
                    getAllMoves(row, col, false);
                    if (data.canEat) {
                        getAllMoves(row, col);
                    }

                    else if (!data.canEat) {
                        console.log('end of combo , because nothing to eat');
                        changePlayer();
                        data.combo=false;
                        data.deselct()
                        cellClick(0, 1, data);
                    }
                    data.countPieces();
                }

                //if I moved and didn't eat => end turn
                else {
                    data.deselct(row, col, cell);
                    data.deleteOptions();
                    data.combo = false;
                    changePlayer();
                    data.combo=false;




                    if (this.black_unit_count <= 0) {
                        winner('white');
                    }
                    else if (this.white_unit_count <= 0) {
                        winner('black');
                    }
                }
                //can the current player make a move?
                //if he can't than the 
                if (!canMakeMove(data.currentPlayer)) {
                    changePlayer();
                    winner(data.currentPlayer, 'no-moves');
                }

            }

        }


        //if it is not a valid move
        else {
            data.deselct(row, col, cell);
            data.deleteOptions();
        }
        //  data.getMoves(row,col,direction);
    }
    function onEat() {
        let targetRow = (selected[0] > row) ? row + 1 : row - 1;
        let targetCol = (selected[1] > col) ? col + 1 : col - 1;
        data.board[targetRow][targetCol] = 0;
        document.getElementById('game').rows[targetRow].cells[targetCol].className = 'dark-cell';
        // click on the new cell
        //update selected to the new cell

        data.deselct();
        data.deleteOptions();
        data.select(row, col, document.getElementById('game').rows[row].cells[col]);
        //I ate do a combo
        data.combo = true;
    }

    function changePlayer() {
        if (data.currentPlayer == 'white') {
            data.currentPlayer = "black";
        }
        else {
            data.currentPlayer = 'white';
        }
    }

    function canMakeMove(player) {
        console.log("called canMakeMove " + player);
        if (player == 'black') {
            for (let i = 0; i < data.board.length; i++) {
                for (let k = 0; k < data.board[i].length; k++) {
                    //if the cell is black
                    //if i have a possible move
                    if (data.board[i][k] < 0 && getAllMoves(i, k, false).length>0) {
                    
                        return true;
                    }
                }
            }
        }
        else if (player == 'white') {
            for (let i = 0; i < data.board.length; i++) {
                for (let k = 0; k < data.board[i].length; k++) {

                    //if the cell is white
                    //if i have a possible move
                    if (data.board[i][k] > 0 && getAllMoves(i, k, false).length>0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}


}
