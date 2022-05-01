function fillMovePool(player) {
    let pool = [];
    for (let i = 0; i < data.board.length; i++) {
        for (let k = 0; k < data.board.length; k++) {
            if (data.board[i][k] > 0) {
                pool.push(newShowPossibleMoves(i, k, false, data.board[i][k], false));
            }
        }
    }
    console.log(data.movePool);
    return
}
function newShowPossibleMoves(row, col, combo, callpaint = true) {
    let cellValue = data.board[row][col];
    let legalMoves = [];
    //if white
    if (cellValue > 0) {
        let direction = 1;
        //if normal piece
        if (cellValue == 1) {
            //look left 
            if (col > 0) {
                if (!combo) {
                    //if not in combo
                    if (row < 7) {
                        //look up left

                        let multiplyCells = data.board[row + 1][col - 1] * cellValue;
                        if (multiplyCells == 0 && !combo) {
                            legalMoves.push([[row, col], [row + 1, col - 1]]);
                        }
                        //enemy
                        else if (multiplyCells < 0) {
                            //if in boundary
                            if (row < 6 && col > 1) {
                                if (data.board[row + 2][col - 2] === 0) {
                                    legalMoves.push([[row + 2, col - 2], [row, col]]);
                                    data.canEat = true;
                                }
                            }
                        }

                        // lookLeft(multiplyCells, direction);
                    }
                }
                //if in combo
                else {
                    //if forward?
                    let multiplyCells = data.board[row + 1][col - 1] * cellValue;
                    if (multiplyCells == 0 && !combo) {
                        if (multiplyCells < 0) {
                            //if in boundary
                            if (row < 6 && col > 1) {
                                if (data.board[row + 2][col - 2] === 0) {
                                    legalMoves.push([[row + 2, col - 2], [row, col]]);
                                    data.canEat = true;
                                }
                            }
                        }
                        //can i eat back left?
                        if (row < 6 && col < 6) {
                            multiplyCells = data.board[row - 1][col - 1] * cellValue;
                            if (multiplyCells < 0) {
                                if (data.board[row - 2][col - 2] === 0) {
                                    legalMoves.push([[row - 2, col - 2], [row, col]]);
                                }
                            }
                        }
                    }

                }

            }
            //look right
            if (col < 7) {
                if (!combo) {
                    //if not in combo
                    if (row < 7) {
                        //look up left

                        let multiplyCells = data.board[row + 1][col + 1] * cellValue;
                        if (multiplyCells == 0 && !combo) {
                            legalMoves.push([[row, col], [row + 1, col + 1]]);
                        }
                        //enemy
                        else if (multiplyCells < 0) {
                            //if in boundary
                            if (row < 6 && col > 1) {
                                if (data.board[row + 2][col + 2] === 0) {
                                    legalMoves.push([[row + 2, col + 2], [row, col]]);
                                    data.canEat = true;
                                }
                            }
                        }

                        // lookLeft(multiplyCells, direction);
                    }
                }
                else {
                    //if forward?
                    let multiplyCells = data.board[row + 1][col + 1] * cellValue;
                    if (multiplyCells == 0 && !combo) {
                        if (multiplyCells < 0) {
                            //if in boundary
                            if (row < 6 && col > 1) {
                                if (data.board[row + 2][col + 2] === 0) {
                                    legalMoves.push([[row + 2, col + 2], [row, col]]);
                                    data.canEat = true;
                                }
                            }
                        }
                        //can i eat back right?
                        if (row < 6 && col < 6) {
                            multiplyCells = data.board[row - 1][col + 1] * cellValue;
                            if (multiplyCells < 0) {
                                if (data.board[row - 2][col + 2] === 0) {
                                    legalMoves.push([[row - 2, col + 2], [row, col]]);
                                }
                            }
                        }
                    }

                }
                
            }
        }
        else if (cellValue == 2) {

        }
    }
    //if black
    else if (cellValue < 0) {
        let direction = -1;

        if (cellValue == -1) {

        }
        else if (cellValue == -2) {

        }



    }


}