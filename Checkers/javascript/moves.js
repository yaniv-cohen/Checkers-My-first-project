//shows all possible moves and hops on the screen
function showPossibleMoves(row, col, combo, cellValue) {
    //the possible moves are stored in legalMoves eg. [[1,3],[1,5]]
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



    // //if white
    // if (direction > 0 && row < 7) {
    //     //look left
    //     if (col > 0) {
    //         let multiplyCells = data.board[row + direction][col - 1]
    //             * cellValue;
    //         lookLeft(multiplyCells, direction);
    //         if ((cellValue === 2 || cellValue === -2) && row > 0) {
    //             multiplyCells = data.board[row + (direction * -1)][col - 1]
    //                 * cellValue;
    //             lookLeft(multiplyCells, (direction * -1));
    //         }
    //     }

    //     //look right
    //     if (col < 7) {
    //         let multiplyCells = data.board[row + direction][col + 1]
    //             * cellValue;
    //         lookRight(multiplyCells, direction);

    //         if ((cellValue === 2 || cellValue === -2) && row > 0) {
    //             multiplyCells = data.board[row + (direction * -1)][col + 1]
    //                 * cellValue;
    //             lookRight(multiplyCells, direction * -1);
    //         }
    //     }
    // }

    //if white
    if (direction > 0) {
        //look left 
        if (col > 0) {
            if (row < 7) {
                //look up left
                let multiplyCells = data.board[row + direction][col - 1]
                    * cellValue;
                lookLeft(multiplyCells, direction);
            }
            //look down left if queen
            if (Math.abs(cellValue) === 2 && row > 0) {
                multiplyCells = data.board[row + (direction * -1)][col - 1]
                    * cellValue;
                lookLeft(multiplyCells, direction * -1);
            }

        }
        //look right
        if (col < 7) {
            if (row < 7) {
                //look up right
                let multiplyCells = data.board[row + direction][col + 1]
                    * cellValue;
                lookRight(multiplyCells, direction);
            }
            //look down right if queen
            if (Math.abs(cellValue) === 2 && row > 0) {
                multiplyCells = data.board[row + (direction * -1)][col + 1]
                    * cellValue;
                lookRight(multiplyCells, direction * -1);
            }
        }

    }

    //if black
    else if (direction < 0) {
        //look left 
        if (col > 0) {
            if (row > 0) {
                //look up left
                let multiplyCells = data.board[row + direction][col - 1]
                    * cellValue;
                lookLeft(multiplyCells, direction);
            }
            //look down left if queen
            if (Math.abs(cellValue) === 2 && row < 7) {
                multiplyCells = data.board[row + (direction * -1)][col - 1]
                    * cellValue;
                lookLeft(multiplyCells, direction * -1);
            }

        }
        //look right
        if (col < 7) {
            if (row > 0) {
                //look up right
                let multiplyCells = data.board[row + direction][col + 1]
                    * cellValue;
                lookRight(multiplyCells, direction);
            }
            //look down right if queen
            if (Math.abs(cellValue) === 2 && row < 7) {
                multiplyCells = data.board[row + (direction * -1)][col + 1]
                    * cellValue;
                lookRight(multiplyCells, direction * -1);
            }
        }

    }

    addAvailableOption(legalMoves);

    function lookRight(multiplyCells, direction) {
        //positive = friend =>don't eat

        if (multiplyCells > 0) {
            //do nothing
        }

        //0 is empty =>add it
        else if (multiplyCells === 0) {
            if (!combo) {
                legalMoves.push([row + direction, col + 1]);
            }
        }

        //enemy => don't add, check next left
        else {
            //if i won't exit the boundary
            if ((row < 6 && direction > 0) || (row > 1 && direction < 0) && (col < 6)) {
                multiplyCells = data.board[row + (2 * direction)][col + 2] * cellValue;
                if (data.board[row + (2 * direction)][col + 2] === 0) {
                    legalMoves.push([row + (2 * direction), col + 2]);
                }
            }
        }
        return multiplyCells;
    }

    function lookLeft(multiplyCells, direction) {
        //positive = friend =>don't eat
        if (multiplyCells > 0) {
            //do nothing
        }
        //0 is empty =>add it
        else if (multiplyCells === 0) {
            if (!combo) {
                legalMoves.push([row + direction, col - 1]);
            }
        }
        //enemy => don't add, check next left
        else {
            //if i won't exit the boundary
            if ((
                (direction < 0 && row > 1) || (direction > 0 && row < 6))
                && (col > 1)) {
                multiplyCells = data.board[row + (2 * direction)][col - 2] * cellValue;
                if (data.board[row + (2 * direction)][col - 2] === 0) {
                    legalMoves.push([row + (2 * direction), col - 2]);
                }
            }
        }
    }

    function addAvailableOption(legalMoves) {
        for (let i = 0; i < legalMoves.length; i++) {
            let targetElement = document.getElementsByTagName('table')[0].rows[legalMoves[i][0]].cells[legalMoves[i][1]];
            let targetDataCell = data.board[legalMoves[i][0]][legalMoves[i][1]];
            //if different color
            if (targetDataCell === 0) {
                targetElement.classList.add('option');
            }
        }


    }
    console.log("return legalMoves: " + legalMoves);
    return (legalMoves.length > 0);
}
