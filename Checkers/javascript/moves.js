//shows all possible moves and hops on the screen
function showPossibleMoves(row, col, combo, cellValue, callPaint=true) {
    //the possible moves are stored in legalMoves eg. [[1,3],[1,5]]
    let legalMoves = [];
    let direction;
    if (data.currentPlayer == "white") {
        direction = 1;
    }
    else {
        direction = -1;
    }
    
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
            // if queen or combo => look down left
            if ((Math.abs(cellValue) === 2 ||combo) && row > 0) {
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
            //if queen or combo => look down right
            if ((Math.abs(cellValue) === 2 ||combo) && row > 0) {
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
            //if queen or combo => look down left
            if ((Math.abs(cellValue) === 2 ||combo) && row < 7) {
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
            //if queen or combo => look down right
            if ((Math.abs(cellValue) === 2 ||combo) && row < 7) {
                multiplyCells = data.board[row + (direction * -1)][col + 1]
                    * cellValue;
                lookRight(multiplyCells, direction * -1);
            }
        }

    }
if(callPaint)
    {
        addAvailableOption(legalMoves);
    }

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


    console.log("return legalMoves: " + legalMoves.length);
    return (legalMoves.length);
}
function addAvailableOption(legalMoves) {
    //if I can make a jump => remove all non-jump moves
    let jump =false;
    for (let i = 0; i < legalMoves.length; i++) {
        if(Math.abs(legalMoves[i][0] -selected[0])>1 )
        {
            jump=true;
            console.log('can jump');
        }
    }
    if(jump)
    { 
        let i=0;
        while(i < legalMoves.length) {
            if(Math.abs(legalMoves[i][0] -selected[0]) <=1 )
            {
                legalMoves.splice(i,1);
            }
            else
            {
                i++;
            }
        }
    }
    
    for (let i = 0; i < legalMoves.length; i++) {
        let targetElement = document.getElementsByTagName('table')[0].rows[legalMoves[i][0]].cells[legalMoves[i][1]];
        let targetDataCell = data.board[legalMoves[i][0]][legalMoves[i][1]];
        //if different color
        if (targetDataCell === 0) {
            targetElement.classList.add('option');
        }
    }


}