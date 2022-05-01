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
            if (!data.combo) {
                data.select(row, col, cell)
                showPossibleMoves(row, col, false, cellValue);
            }
            else {
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


                //if it was a hop
                if (Math.abs(row - selected[0]) > 1) {

                    //remove eatten piece
                    data.board[(row + selected[0]) / 2][(col + selected[1]) / 2] = 0;
                    document.getElementById('game').rows[(row + selected[0]) / 2].cells[(col + selected[1]) / 2].className = 'dark-cell';

                    // click on the new cell
                    //update selected to the new cell
                    data.deselct();
                    data.deleteOptions();
                    data.select(row, col, cell)
                    //I ate do a combo
                    data.combo=true;
                    showPossibleMoves(row, col, true, data.board[row][col]);
                    console.log("showPossibleMoves: ");
                }
                else {
                    data.deselct(row, col, cell);
                    data.deleteOptions();
                    data.combo=false;
                    changePlayer();
                }
                //if I didn't eat - do a combo

                //if ate or not => clear all clicks

                // data.deleteOptions();
                // data.deselct();

                // console.log('set player to ' + data.currentPlayer);
            }


            //if it is not a valid move
            else {
                data.deselct(row, col, cell);
                data.deleteOptions();
            }
            //  data.getMoves(row,col,direction);
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
}
