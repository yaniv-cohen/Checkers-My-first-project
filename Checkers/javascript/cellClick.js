function cellClick(row, col, data) {
    let cell = document.getElementById('game').rows[row].cells[col];
    let cellValue = data.board[row][col];
    //if i have no piece selected
    if (selected.length == 0) {
        //if it is my piece
        if ((data.currentPlayer === "white" && data.board[row][col] > 0) ||
            (data.currentPlayer === "black" && data.board[row][col] < 0)) {
            //select this piece
            data.deleteOptions();
            data.select(row, col, cell);
            showPossibleMoves(row, col, false, cellValue);
        }
        //if clicked on nothing
        //do nothing
    }
    //if i have something selected
    else {
        //if i clicked on one of my pieces, and it I am not in a combo => show possible moves for this piece
        if ((data.currentPlayer === "white" && data.board[row][col] > 0) ||
            (data.currentPlayer === "black" && data.board[row][col] < 0)) {
            data.deselct();
            data.deleteOptions();
            //if I am not in a combo move
            if (!data.combo) {
                data.select(row, col, cell);
                showPossibleMoves(row, col, false, cellValue);
            }
            //if clicked on a diffrent unit during a combo - end turn
            else {
                console.log("changePlayer(): ");
                changePlayer();
            }
        }
        //if i clicked on an empty cell
        else if (data.board[row][col] === 0) {
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
                if (Math.abs(row - selected[0]) > 1) {
                    onEat();
                    data.countPieces();
                }

                //if I moved and didn't eat => end turn
                else {
                    data.deselct(row, col, cell);
                    data.deleteOptions();
                    data.combo = false;
                    changePlayer();
                    //can the current player make a move?
                    //if he can't than the 
                    if (!canMakeMove(data.currentPlayer)) {
                        changePlayer();
                        winner(data.currentPlayer);
                    }



                    if (this.black_unit_count <= 0) {
                        winner('white');
                    }
                    else if (this.white_unit_count <= 0) {
                        winner('black');
                    }
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
        data.board[(row + selected[0]) / 2][(col + selected[1]) / 2] = 0;
        document.getElementById('game').rows[(row + selected[0]) / 2].cells[(col + selected[1]) / 2].className = 'dark-cell';

        // click on the new cell
        //update selected to the new cell
        data.deselct();
        data.deleteOptions();
        data.select(row, col, cell);
        //I ate do a combo
        data.combo = true;
        let continueCombo = showPossibleMoves(row, col, true, data.board[row][col]);
        if (!continueCombo) {
            data.deselct(row, col, cell);
            data.deleteOptions();
            data.combo = false;
            changePlayer();
        }
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
                    if (data.board[i][k] < 0 && showPossibleMoves(i, k, false, data.board[i][k], false) ) {
                        console.log("showPossibleMoves(i, k, false, data.board[i][k], false): " + showPossibleMoves(i, k, false, data.board[i][k], false));
                        return true;
                    }
                }
            }
        }
        else if (player == 'white') {
            for (let i = 0; i < data.board.length; i++) {
                for (let k = 0; k < data.board[i].length; k++) {

                    //if the cell is black
                    //if i have a possible move
                    if (data.board[i][k] > 0 && showPossibleMoves(i, k, false, data.board[i][k], false)) {
                        console.log("showPossibleMoves(i, k, false, data.board[i][k], false): " + showPossibleMoves(i, k, false, data.board[i][k], false));
                        
                        return true;
                    }
                }
            }
        }
    }
}



