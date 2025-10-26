//return all possible moves for selected unit
//if the piece can eat, set data.canEat to 'true'
//by default, paint the possible moves unless paint is false
function getAllMoves(row, col, paintPossibleMoves = true) {
  let legalMoves = []; //stores possible moves
  let direction; //does this piece go up or down
  if (data.currentPlayer == "white") {
    direction = 1;
  } else {
    direction = -1;
  }
  //if the unit is a normal piece
  if (Math.abs(data.board[row][col]) == 1) {
    //can I eat forward? if yes store answer as data.canEat
    getLegalJumps(row, col);
    if (legalMoves.length > 0) {
      data.canEat = true;
    }
    //if I can't eat with any of my units
    else if (!data.combo && !data.canEat) {
      //can I move forward
      getLegalOneMove(row, col);
    }
    //if I just ate with ths piece, and the settings allow it
    if (data.combo && !data.settings[0]) {
      //look for a unit to eat in all directions
      getLegalQueenJumps(row, col);
      if (legalMoves.length > 0) {
        data.canEat = true;
      }
    }
  }
  //if the unit is a Queen
  else if (Math.abs(data.board[row][col]) == 2) {
    //normal settings
    if (!data.settings[1]) {
      //can I eat in 4 directions at a distance  of 1 cell
      getLegalQueenJumps(row, col);
      if (legalMoves.length > 0) {
        data.canEat = true;
      }
      //if I didn't just eat with this Queen
      if (!data.combo) {
        //can I jump-eat?
        getLegalQueenFirstMoveJump(row, col);
        if (legalMoves.length > 0) {
          data.canEat = true;
        }
        //if i can not eat or jump-eat, and neither can any of my other units
        //show movement to any distance
        if (legalMoves.length == 0 && !data.canEat) {
          getLegalQueenFirstMoves(row, col);
        }
      }
    }
    //'only one cell movement' setting
    else {
      //can I eat in 4 directions at a distance  of 1 cell
      getLegalQueenJumps(row, col);
      if (legalMoves.length > 0) {
        data.canEat = true;
      }
      //if no unit can eat - allow queen to move 1 cell in any direction
      if (legalMoves.length == 0 && !data.canEat) {
        //down right
        if (row < 7 && col < 7) {
          if (data.board[row + 1][col + 1] === 0) {
            legalMoves.push([row + 1, col + 1]);
          }
        }
        //down left
        if (row < 7 && col >= 0) {
          if (data.board[row + 1][col - 1] === 0) {
            legalMoves.push([row + 1, col - 1]);
          }
        }

        //up left
        if (row > 0 && col > 0) {
          if (data.board[row - 1][col - 1] === 0) {
            legalMoves.push([row - 1, col - 1]);
          }
        }

        //up right
        if (row > 0 && col < 7) {
          if (data.board[row - 1][col + 1] === 0) {
            legalMoves.push([row - 1, col + 1]);
          }
        }
      }
    }
  }
  //mark the cells for the player to see
  if (paintPossibleMoves) {
    addAvailableOption();
  }
  //returns an array of possible moves. for example [[0,0],[0,3],[2,2]]
  return legalMoves;

  //functions:
  //get the cells the queen can jump to in order to eat
  function getLegalQueenFirstMoveJump(row, col) {
    //eat down right + +
    for (let i = 0; row + 1 + i < 7 && col + 1 + i < 7; i++) {
      //if I hit a non-empty cell
      if (
        row < 6 &&
        col < 6 &&
        direction * data.board[row + 1 + i][col + 1 + i] < 0
      ) {
        if (data.board[row + 2 + i][col + 2 + i] === 0) {
          legalMoves.push([row + 2 + i, col + 2 + i]);
        }

        break;
      }
    }
    //eat down left + -
    for (let i = 0; row + 1 + i < 7 && col - 1 - i > 0; i++) {
      //if I hit a non-empty cell
      if (
        row < 6 &&
        col > 1 &&
        direction * data.board[row + 1 + i][col - 1 - i] < 0
      ) {
        if (data.board[row + 2 + i][col - 2 - i] === 0) {
          legalMoves.push([row + 2 + i, col - 2 - i]);
        }

        break;
      }
    }
    //eat up left - -
    for (let i = 0; row - 1 - i > 0 && col - 1 - i > 0; i++) {
      //if I hit a non-empty cell
      if (
        row > 0 &&
        col > 0 &&
        direction * data.board[row - 1 - i][col - 1 - i] < 0
      ) {
        if (data.board[row - 2 - i][col - 2 - i] === 0) {
          legalMoves.push([row - 2 - i, col - 2 - i]);
        }

        break;
      }
    }
    //eat up right - -
    for (let i = 0; row - 1 - i > 0 && col + 1 + i < 7; i++) {
      //if I hit a non-empty cell
      if (
        row > 0 &&
        col < 7 &&
        direction * data.board[row - 1 - i][col + 1 + i] < 0
      ) {
        if (data.board[row - 2 - i][col + 2 + i] === 0) {
          legalMoves.push([row - 2 - i, col + 2 + i]);
        }

        break;
      }
    }
  }
  //called if no piece can eat this turn and if not in a combo
  //move any distance in any direction
  function getLegalQueenFirstMoves() {
    //move down right + +
    for (let i = 0; row + 1 + i <= 7 && col + 1 + i <= 7; i++) {
      if (row < 7 && col < 7) {
        if (data.board[row + 1 + i][col + 1 + i] === 0) {
          legalMoves.push([row + 1 + i, col + 1 + i]);
        } else {
          break;
        }
      }
    }

    //move down left + -
    for (let i = 0; row + 1 + i <= 7 && col - 1 - i >= 0; i++) {
      if (row <= 7 && col >= 0) {
        if (data.board[row + 1 + i][col - 1 - i] === 0) {
          legalMoves.push([row + 1 + i, col - 1 - i]);
        } else {
          break;
        }
      }
    }

    //move up left - +
    for (let i = 0; row - 1 - i >= 0 && col - 1 - i >= 0; i++) {
      if (row > 0 && col > 0) {
        if (data.board[row - 1 - i][col - 1 - i] === 0) {
          legalMoves.push([row - 1 - i, col - 1 - i]);
        } else {
          break;
        }
      }
    }
    //move up right - +
    for (let i = 0; row - 1 - i >= 0 && col + 1 + i <= 7; i++) {
      if (row > 0 && col < 7) {
        if (data.board[row - 1 - i][col + 1 + i] === 0) {
          legalMoves.push([row - 1 - i, col + 1 + i]);
        } else {
          break;
        }
      }
    }
  }
  //add the all the cells the queen, or normal piece during a combo, can eat-jump to 1 cell distance
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
        console.log("eat down right: ");
        legalMoves.push([row + 2, col + 2]);
      }
    }
    // look up left
    if (row > 1 && col > 1 && direction * data.board[row - 1][col - 1] < 0) {
      if (
        direction * data.board[row - 1][col - 1] < 0 &&
        data.board[row - 2][col - 2] === 0
      ) {
        legalMoves.push([row - 2, col - 2]);
      }
    }
    //  look up right
    if (row > 1 && col < 6 && direction * data.board[row - 1][col + 1] < 0) {
      if (
        direction * data.board[row - 1][col + 1] < 0 &&
        data.board[row - 2][col + 2] === 0
      ) {
        legalMoves.push([row - 2, col + 2]);
      }
    }
  }

  //can this normal piece eat forward?
  function getLegalJumps(row, col) {
    //if white look down
    if (data.board[row][col] > 0) {
      //look down left
      if (row < 6 && col > 1 && direction * data.board[row + 1][col - 1] < 0) {
        if (data.board[row + 2][col - 2] === 0) {
          legalMoves.push([row + 2, col - 2]);
        }
      }
      //look down right
      if (row < 6 && col < 6 && direction * data.board[row + 1][col + 1] < 0) {
        if (data.board[row + 2 * direction][col + 2] === 0) {
          legalMoves.push([row + 2, col + 2]);
        }
      }
    }
    //if black look up
    else if (direction < 0) {
      //look up left
      if (row > 1 && col > 1) {
        if (
          direction * data.board[row - 1][col - 1] < 0 &&
          data.board[row - 2][col - 2] === 0
        ) {
          legalMoves.push([row - 2, col - 2]);
        }
      }
      //look up right
      if (row > 1 && col < 6) {
        if (
          direction * data.board[row - 1][col + 1] < 0 &&
          data.board[row - 2][col + 2] === 0
        ) {
          legalMoves.push([row - 2, col + 2]);
        }
      }
    }
  }
  //can this normal piece move 1 cell?
  function getLegalOneMove(row, col) {
    //if the piece is white
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
    //if the piece is black
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

  //show movement and eating options on the board
  function addAvailableOption() {
    //loop through the array 'legalMoves'    [[row2,col1],[row2,col2],[row3.col3]]
    //each cells contains legal coordinates [row,col]
    for (let i = 0; i < legalMoves.length; i++) {
      let targetElement =
        document.getElementsByTagName("table")[0].rows[legalMoves[i][0]].cells[
          legalMoves[i][1]
        ];
      let targetDataCell = data.board[legalMoves[i][0]][legalMoves[i][1]];
      //make sure the target is empty --for SAFTY, not necessary--
      if (targetDataCell === 0) {
        targetElement.classList.add("option");
      }
    }
  }
}
