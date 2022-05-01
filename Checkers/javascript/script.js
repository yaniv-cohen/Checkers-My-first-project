function cellClick(row, col, data) {
    let cell = document.getElementById('game').rows[row].cells[col];
    let cellValue = data.board[row][col];
    //if nothing selected
    console.log('selected: ' + selected);
    if (selected.length == 0) {
        //if clicked on nothing
        //do nothing

        //if it is my piece
        if ((data.currentPlayer === "white" && data.board[row][col] > 0) ||
            (data.currentPlayer === "black" && data.board[row][col] < 0)) {
            //select this piece

            data.deleteOptions();
            data.select(row, col, cell);
            showPossibleMoves(row, col, cell, cellValue);
        }
    }
    //if i have something selected
    else {
        //if i clicked on one of my pieces
        if ((data.currentPlayer === "white" && data.board[row][col] > 0) ||
            (data.currentPlayer === "black" && data.board[row][col] < 0)) {
            data.deselct(row, col, cell);
            data.deleteOptions();
            data.select(row, col, cell)
            showPossibleMoves(row, col, cell, cellValue);
        }
        //if i clicked on an empty cell
        else if (data.board[row][col] === 0) {
            //if it is a valid move
            if (cell.classList.contains('option')) {
                console.log('clicked on valid');

                //copy the selected cell value and classes 
                data.board[row][col] = data.board[selected[0]][selected[1]];
                document.getElementById('game').rows[row].cells[col].className = document.getElementById('game').rows[selected[0]].cells[selected[1]].className;
                //empty dead cell
                data.board[selected[0]][selected[1]] = 0;
                document.getElementById('game').rows[selected[0]].cells[selected[1]].className = 'dark-cell';


                //hopped 2 => remove enemy piece in the middle of the hop
                if (Math.abs(row - selected[0]) > 1) {

                    //remove eatten piece
                data.board[(row + selected[0])/2][(col +selected[1])/2] = 0;
                document.getElementById('game').rows[(row + selected[0])/2].cells[(col +selected[1])/2].className = 'dark-cell';
    

                        //if I ate do a combo
                    let cell = document.getElementById('game').rows[row].cells[col];
                    let cellValue = data.board[row][col];
                    //
                    data.deleteOptions();
                    cell = data.select(row, col, cell);
                    showPossibleMoves(row, col, cell, cellValue);
                    showPossibleMoves('row')
                    combo(row, col, data.board[row][col]);

                }
                //if I didn't eat - do a combo
                else {

                    //if there are more eats
                    changePlayer();
                }
                //if ate or not => clrar all clicks
                data.deleteOptions();
                data.deselct();
                console.log('set player to ' + data.currentPlayer);
            }
            data.deselct(row, col, cell);
            data.deleteOptions();

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



//
function combo(row, col, cellValue) {
    let legalMoves = [];
    let direction;
    if (data.currentPlayer == "white") {
        direction = 1;
    }
    else {
        direction = -1;
    }
    //look left
    let multiplyCells =
        data.board[row + direction][col - 1]
        * cellValue;
    //positive = friend =>don't eat
    //0 = empty => don't add

    //negative = enemy => don't add, check next left
    if (multiplyCells < 0) {
        //if i won't exit the boundary
        if (row < 6 && (col > 1)) {
            let multiplyCells = data.board[row + (2 * direction)][col - 2] * cellValue;
            if (data.board[row + (2 * direction)][col - 2] === 0) {
                legalMoves.push([row + (2 * direction), col - 2]);
            }
        }


    }
    //look right
    multiplyCells = data.board[row + direction][col + 1]
        * cellValue;
    //positive = friend =>don't eat
    //0 = empty => don't add

    //negative = enemy => don't add, check next left
    if (multiplyCells < 0) {
        //if i won't exit the boundary
        if (row < 6 && (col > 1)) {
            let multiplyCells = data.board[row + (2 * direction)][col + 2] * cellValue;
            if (data.board[row + (2 * direction)][col + 2] === 0) {
                legalMoves.push([row + (2 * direction), col + 2]);
            }
        }


    }

    return (legalMoves);
}

