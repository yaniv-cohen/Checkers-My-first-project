//return all possible moves for selected unit
function getAllMoves(row, col, paint = true) {
    let legalMoves = [];
    let direction;
    if (data.currentPlayer == "white") {
        direction = 1;
    }
    else {
        direction = -1;
    }
    //white normal piece
    if (Math.abs(data.board[row][col]) == 1) {
        getLegalJumps(row, col);

        if(legalMoves.length>0)
        {
            data.canEat=true;
            // console.log("data.canEat: " + data.canEat);
        }
        else if (legalMoves.length == 0 && !data.combo && !data.canEat) {
            getLegalOneMove(row, col);
        }
        
        if(data.combo)
        {
            getLegalQueenJumps(row,col);
        }
        
    }
    //queen
    else if (Math.abs(data.board[row][col]) == 2) {
        getLegalQueenJumps(row, col);
        if (legalMoves.length > 0) {
            data.canEat = true;
        }
        if (!data.combo) {
            getLegalQueenFirstMoveJump(row, col);
            if (legalMoves.length > 0) {
                data.canEat = true;
            }
            //if i can not eat myself, and neither can any of my other units
            if (legalMoves.length == 0 && !data.canEat) {
                getLegalQueenFirstMoves(row, col);
            }

        }

    }
    if (paint) {
        addAvailableOption();
    }
    return legalMoves;
    function getLegalQueenFirstMoveJump(row, col) {
        //eat down right + +
        for (let i = 0; row + 1 + i < 7 && col + 1 + i < 7; i++) {
            if (row < 6 && col < 6 && direction * data.board[row + 1 + i][col + 1 + i] < 0) {
                if (data.board[row + 2 + i][col + 2 + i] === 0) {
                    legalMoves.push([row + 2 + i, col + 2 + i]);
                }
                break;
            }
        }
        //eat down left + -
        for (let i = 0; row + 1 + i < 7 && col - 1 - i > 0; i++) {
            
            if (row < 6 && col > 1 && direction * data.board[row + 1 + i][col - 1 - i] < 0) {
                if (data.board[row + 2 + i][col - 2 - i] === 0) {
                    legalMoves.push([row + 2 + i, col - 2 - i]);
                }

                break;
            }
        }
        //eat up left - -
        for (let i = 0; row - 1 - i > 0 && col - 1 - i > 0; i++) {
            
            if (row > 0 && col > 0 && direction * data.board[row - 1 - i][col - 1 - i] < 0) {
                if (data.board[row - 2 - i][col - 2 - i] === 0) {
                    legalMoves.push([row - 2 - i, col - 2 - i]);
                }

                break;
            }
        }
        //eat up right - -
        for (let i = 0; row - 1 - i > 0 &&  col + 1 + i < 7 ; i++) {
           
            console.log(col + 1 + i  );
            if (row > 0 && col <7 && direction * data.board[row - 1 - i][col + 1 + i] < 0) {
                console.log('i '+i);
                if (data.board[row - 2 - i][col + 2 + i] === 0) {
                    legalMoves.push([row - 2 - i, col + 2 + i]);
                }

                break;
            }
        }



    }
    function getLegalQueenFirstMoves() {
        //move down right + +
        for (let i = 0; row + 1 + i <= 7 && col + 1 + i <= 7; i++) {
            if (row < 7 && col < 7) {
                if (data.board[row + 1 + i][col + 1 + i] === 0) {
                    legalMoves.push([row + 1 + i, col + 1 + i]);
                }
                else {

                    break;
                }
            }
        }

        //move down left + -
        for (let i = 0; row + 1 + i <= 7 && col - 1 - i >= 0; i++) {
            if (row <= 7 && col >=0) {

                if (data.board[row + 1 + i][col - 1 - i] === 0) {
                    legalMoves.push([row + 1 + i, col - 1 - i]);
                }
                else {

                    break;
                }
            }

        }

        //move up left - +
        for (let i = 0; row - 1 - i >= 0 && col - 1 - i >= 0; i++) {
            
            if (row > 0 && col > 0) {
                if (data.board[row - 1 - i][col - 1 - i] === 0) {
                    legalMoves.push([row - 1 - i, col - 1 - i]);
                }
                else {
                    break;
                }
            }

        }
        //move up right - +
        for (let i = 0; row - 1 - i >= 0 && col + 1 + i <= 7; i++) {
            if (row > 0 && col < 7) {
                if (data.board[row - 1 - i][col + 1 + i] === 0) {
                    legalMoves.push([row - 1 - i, col + 1 + i]);
                }
                else {
                    
                    break;
                }

            }

        }



    }
    function getLegalQueenJumps(row, col) {
        //eat down left + -
        if (row < 6 && col > 1 && direction * data.board[row + 1][col - 1] < 0) {
            if (data.board[row + 2][col - 2] === 0) {
                legalMoves.push([row + 2, col - 2]);
            }
        }
        //eat down right + +
        if (row < 6 && col < 6 && direction * data.board[row + 1][col + 1] < 0) {
            if (data.board[row + 2][col + 2] === 0) {
                console.log("eat down right: " );
                legalMoves.push([row + 2, col + 2]);
            }
        }
        // look up left
        if (row > 1 && col > 1 && direction * data.board[row - 1][col - 1] < 0) {
            if (direction * data.board[row - 1][col - 1] < 0 && data.board[row - 2][col - 2] === 0) {
                legalMoves.push([row - 2, col - 2]);
            }
        }
        //  look up right
        if (row > 1 && col < 6 && direction * data.board[row - 1][col + 1] < 0) {
            if (direction * data.board[row - 1][col + 1] < 0 && data.board[row - 2][col + 2] === 0) {
                legalMoves.push([row - 2, col + 2]);
            }
        }
    }



    function getLegalJumps(row, col) {
        // console.log("get legal jumps ");

        //if white
        //eat down left
        if (data.board[row][col] > 0) {
            if (row < 6 && col > 1 && direction * data.board[row + 1][col - 1] < 0) {
                if (data.board[row + 2][col - 2] === 0) {
                    legalMoves.push([row + 2, col - 2]);
                }
            }
            //eat down right
            if (row < 6 && col < 6 && direction * data.board[row + 1][col + 1] < 0) {
                if (data.board[row + 2 * direction][col + 2] === 0) {
                    legalMoves.push([row + 2, col + 2]);
                }
            }

        }
        else if (direction < 0) {
            // combo => look up left
            if (row > 1 && col > 1) {
                if (direction * data.board[row - 1][col - 1] < 0 && data.board[row - 2][col - 2] === 0) {
                    legalMoves.push([row - 2, col - 2]);
                }
            }
            // combo => look up right
            if (row > 1 && col < 6) {
                if (direction * data.board[row - 1][col + 1] < 0 && data.board[row - 2][col + 2] === 0) {
                    legalMoves.push([row - 2, col + 2]);
                }
            }



        }
    }
    function getLegalOneMove(row, col) {
        //if white
        if (direction > 0) {
            if (row < 7) {

                //look down left
                if (col > 0) {
                    if (data.board[row + direction][col - 1] === 0) {
                        legalMoves.push([row + direction, col - 1]);
                    }
                }

                //look down right
                if (col < 7) {
                    if (data.board[row + direction][col + 1] === 0) {
                        legalMoves.push([row + direction, col + 1]);
                    }
                }
            }
        }
        //if black
        else if (direction < 0) {
            if (row > 0) {
                //look left 
                if (col > 0) {
                    if (data.board[row + direction][col - 1] === 0) {
                        legalMoves.push([row + direction, col - 1]);
                    }
                }

                //look right
                if (col < 7) {
                    if (data.board[row + direction][col + 1] === 0) {
                        legalMoves.push([row + direction, col + 1]);
                    }
                }
            }
        }
    }

    function addAvailableOption() {
        for (let i = 0; i < legalMoves.length; i++) {
            console.log("legalMoves: " + legalMoves);
            let targetElement = document.getElementsByTagName('table')[0].rows[legalMoves[i][0]].cells[legalMoves[i][1]];
            let targetDataCell = data.board[legalMoves[i][0]][legalMoves[i][1]];
            //if different color
            if (targetDataCell === 0) {
                targetElement.classList.add('option');
            }
        }
    }

}




function showPossibleMoves(row, col, combo, cellValue, callPaint = true) {
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
            legalMoves.push(getNormalMovesLeft());
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
            if ((Math.abs(cellValue) === 2 || combo) && row > 0) {
                console.log('added' + row + (direction * -1) + ' ' + [col + 1]);
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
            if (row < 7) {
                //look first left
                let multiplyCells = data.board[row + direction][col - 1] * cellValue;
                lookLeft(multiplyCells, direction);
            }

            // if queen or combo => look down left
            if ((Math.abs(cellValue) === 2 || combo) && row > 0) {
                multiplyCells = data.board[row + (direction * -1)][col + (1 - 2 * (side === 'left'))]
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
            if ((Math.abs(cellValue) === 2 || combo) && row < 7) {
                multiplyCells = data.board[row + (direction * -1)][col + 1]
                    * cellValue;
                lookRight(multiplyCells, direction * -1);
            }
        }

    }
    // if (callPaint) {
    //     addAvailableOption(legalMoves);
    // }

    function lookRight(multiplyCells, direction) {
        //positive = friend =>don't eat

        if (multiplyCells > 0) {
            //do nothing
        }

        //0 is empty =>add it
        else if (multiplyCells === 0) {
            if (!combo) {
                legalMoves.push([[row + direction, col + 1], [row, col]]);
            }
        }

        //enemy => don't add, check next left
        else {
            //if i won't exit the boundary
            if ((row < 6 && direction > 0) || (row > 1 && direction < 0) && (col < 6)) {
                multiplyCells = data.board[row + (2 * direction)][col + 2] * cellValue;
                if (data.board[row + (2 * direction)][col + 2] === 0) {
                    legalMoves.push([[row + (2 * direction), col + 2], [row, col]]);
                }
            }
        }
        return multiplyCells;
    }
    function getNormalMovesLeft() {

    }
    function lookLeft(multiplyCells, direction) {
        //positive = friend =>don't eat
        if (multiplyCells > 0) {
            //do nothing
        }
        //0 is empty =>add it
        else if (multiplyCells === 0) {
            if (!combo) {

                legalMoves.push([[row + direction, col - 1], [row, col], [row, col]]);

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

                    legalMoves.push([[row + (2 * direction), col - 2], [row, col]]);
                }
            }
        }
    }
    return (legalMoves.length);
}
