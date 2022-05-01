//shows all possible moves and hops on the screen
function showPossibleMoves(row, col, cell, cellValue) {
    //the possible moves
    let legalMoves = [];
    let direction;
    if (data.currentPlayer == "white") {
        direction = 1;
    }
    else {
        direction = -1;
    }
    //get the moves in the boundaries, not taking
    //  into account if the move is legal
    // example output: [[1,3],[1,5]]

    //if white
    if (direction > 0 && row < 7) {
        //look left
        if (col > 0) {
            let multiplyCells = data.board[row + direction][col - 1]
                * cellValue;
            //positive = friend =>don't eat
            if (multiplyCells > 0) {
                //do nothing
            }
            //0 is empty =>add it
            else if (multiplyCells === 0) {
                legalMoves.push([row + direction, col - 1])
            }
            //enemy => don't add, check next left
            else {
                //if i won't exit the boundary
                if (row < 6 && (col > 1)) {
                    let multiplyCells = data.board[row + (2 * direction)][col - 2] * cellValue;
                    if (data.board[row + (2 * direction)][col - 2] === 0) {
                        legalMoves.push([row + (2 * direction), col - 2]);
                    }
                }
            }
        }
        //handle queen?
        // if ((direction > 1 && row < 7) || (direction < 0 && row > 0)) {

        // }
        //look right
        if (col < 7) {
            let multiplyCells = data.board[row + direction][col + 1]
                * cellValue;
            //positive = friend =>don't eat
            if (multiplyCells > 0) {
                //do nothing
            }
            //0 is empty =>add it
            else if (multiplyCells === 0) {
                legalMoves.push([row + direction, col + 1])
            }
            //enemy => don't add, check next left
            else {
                //if i won't exit the boundary
                if (row < 6 && (col < 6)) {
                    let multiplyCells = data.board[row + (2 * direction)][col + 2] * cellValue;
                    if (data.board[row + (2 * direction)][col + 2] === 0) {
                        legalMoves.push([row + (2 * direction), col + 2]);
                    }
                }
            }
        }
        if ((direction > 1 && row < 7) || (direction < 0 && row > 0)) {

        }
    }


    //if black
    if (direction < 0 && row > 0) {
        //look left
        console.log('move black');
        if (col > 0) {
            let multiplyCells = data.board[row + direction][col - 1]
                * cellValue;
            //positive = friend =>don't eat
            if (multiplyCells > 0) {
                //do nothing
            }
            //0 is empty =>add it
            else if (multiplyCells === 0) {
                legalMoves.push([row + direction, col - 1])
            }
            //enemy => don't add, check next left
            else {
                //if i won't exit the boundary
                if (row > 1 && (col > 1)) {
                    multiplyCells = data.board[row + (2 * direction)][col - 2] * cellValue;
                    if (data.board[row + (2 * direction)][col - 2] === 0) {
                        legalMoves.push([row + (2 * direction), col - 2]);
                    }
                }
            }
        }
        if ((direction > 1 && row < 7) || (direction < 0 && row > 0)) {

        }
        //look right
        if (col < 7) {
            let multiplyCells = data.board[row + direction][col + 1]
                * cellValue;
            //positive = friend =>don't eat
            if (multiplyCells > 0) {
                //do nothing
            }
            //0 is empty =>add it
            else if (multiplyCells === 0) {
                legalMoves.push([row + direction, col + 1])
            }
            //enemy => don't add, check next left
            else {
                //if i won't exit the boundary

                if (row > 0 && (col < 6)) {
                    multiplyCells = data.board[row + (2 * direction)][col + 2] * cellValue;
                    if (data.board[row + (2 * direction)][col + 2] === 0) {
                        legalMoves.push([row + (2 * direction), col + 2]);
                    }
                }
            }
        }
        if ((direction > 1 && row < 7) || (direction < 0 && row > 0)) {

        }
    }
    for (let i = 0; i < legalMoves.length; i++) {
        let targetCell = document.getElementsByTagName('table')[0].rows[legalMoves[i][0]].cells[legalMoves[i][1]]
        let targetBoardCell =
            data.board[legalMoves[i][0]]
            [legalMoves[i][1]];
        //if different color
        if (targetBoardCell == 0) {
            targetCell.classList.add('option');
        }

    }

    

    function getMoves(row, col, direction) {
        let moves = [];
        //black
        if (row > 0 && direction == 1) {
            if (col > 0) {
                moves.push([row + 1, col - 1]);
            }
            if (col < 7) {
                moves.push([row + 1, col + 1]);
                // moves.push([row + 1, col + 1]);
            }
        }
        //white
        else if (row < 7 && direction == -1) {
            if (col > 0) {
                moves.push([row - 1, col - 1]);
            }
            if (col < 7) {
                moves.push([row - 1, col + 1]);
            }
        }
        return moves;
    }
    // if(this.board[][] )
}
