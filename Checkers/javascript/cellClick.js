//called on every cell click, goOn disables the clicks if the game is over.
function cellClick(row, col, goOn) {
  // if the game is on
  if (goOn) {
    //save current cell
    let cell = document.getElementById("game").rows[row].cells[col];

    //if i have no piece selected
    if (selected.length == 0) {
      //if clicked on my piece
      if (
        (data.currentPlayer === "white" && data.board[row][col] > 0) ||
        (data.currentPlayer === "black" && data.board[row][col] < 0)
      ) {
        //remove all options from the board
        data.deleteOptions();
        //select this piece
        data.select(row, col, cell);
        //check if any of my units can eat - used in the calculation next line
        data.canIEat();
        //mark all the optional moves for this unit
        getAllMoves(row, col);
      }
      // (else if I clicked on an enemy or empty cell - do nothing)
    }

    //if i have a cell selected
    else {
      //if i clicked on one of my pieces - select the piece and show its options
      if (
        (data.currentPlayer === "white" && data.board[row][col] > 0) ||
        (data.currentPlayer === "black" && data.board[row][col] < 0)
      ) {
        data.deselect();
        data.deleteOptions();
        data.select(row, col, cell);

        //can any of my units eat?
        data.canIEat();
        //mark optional moves
        getAllMoves(row, col);
      }

      //if i clicked on an empty cell
      else if (data.board[row][col] === 0) {

        //recalculate the options <-MIGHT BE REDUNDANT--
        //can any of my units eat?
        data.canIEat();
        //mark optional moves
        getAllMoves(row, col);
        //--MIGHT BE REDUNDANT->

        //if it is a valid move
        if (cell.classList.contains("option")) {
          //copy the selected cell value and classes
          data.board[row][col] = data.board[selected[0]][selected[1]];
          cell.className =
            document.getElementById("game").rows[selected[0]].cells[
              selected[1]
            ].className;
          //empty previous position
          data.board[selected[0]][selected[1]] = 0;
          document.getElementById("game").rows[selected[0]].cells[
            selected[1]
          ].className = "dark-cell";

          //did a black normal piece reach the end for black?
          if (data.board[row][col] === -1 && row === 0) {
            data.board[row][col] = -2;
            cell.className = "dark-cell black-queen";
          }
          //did a white normal piece reach the end for white?
          else if (data.board[row][col] === 1 && row === 7) {
            data.board[row][col] = 2;
            cell.className = "dark-cell white-queen";
          }
          //if the move was eating another unit
          //move the piece, and check if you can eat another
          //(data.canEat is still the same a it were before the movement)
          if (data.canEat) {
            onEat();
            //can i eat another?
            data.canEat = false;
            getAllMoves(row, col, false);
            if (data.canEat) {
              //mark possible moves, without changing turns
              getAllMoves(row, col);
            }
            //if I cant eat another -change payer turn, end the combo :(
            else {
              changePlayer();
              data.combo = false;
              data.deselect();
            }
            //check if I ate the last piece of the opponent
            //this checks both player which is --REDUNDANT--
            //TODO: only check the eaten piece's player
            data.countPieces();
          }

          //if I moved and didn't eat => end my turn
          else {
            data.deselect(row, col, cell);
            data.deleteOptions();
            data.combo = false;
            changePlayer();
          }
          //can the current player make a move?
          //if he can't than the other player is the winner
          //      *notice data.currentPlayer is not this turn's player and needs to be changed
          if (!canMakeMove(data.currentPlayer)) {
            changePlayer();
            winner(data.currentPlayer);
          }
        }
      }
      //if the clicked cell is not a valid move - change nothing other than selected cell and the options displayed
      else {
        //can't deselect during a combo
        if (!data.combo) {
          data.deselect(row, col, cell);
          data.deleteOptions();
        }
      }
    }

    //functions:

    //defines the action after a unit eats another
    //remove eatten piece, click on the new cell location and set start/continue a combo
    function onEat() {
      //calculate the coordinate of the eatten piece
      //needed for queen jumps
      let targetRow = selected[0] > row ? row + 1 : row - 1;
      let targetCol = selected[1] > col ? col + 1 : col - 1;
      data.board[targetRow][targetCol] = 0;
      document.getElementById("game").rows[targetRow].cells[
        targetCol
      ].className = "dark-cell";
      // reset turn and click on the new cell
      //update selected to the new cell
      data.deselect();
      data.deleteOptions();
      data.select(row,col,cell);
      //I ate, so do a combo
      data.combo = true;
    }

    //called after no more combo-eats or after a move with no eating
    //changes the player currently playing, updates the indicator
    //calculates which units of the current player can eat and gives colors them
    function changePlayer() {
      if (data.currentPlayer == "white") {
        //change the player
        data.currentPlayer = "black";
        //update the indicator
        document.getElementById('turn-h').innerText = "Black's turn";
        document.getElementById('turn-h').className = 'black-turn';
        data.canIEat();
        //if the player can make a eat move - add swords to the turn indicator
        if (data.canEat) {
          console.log('cross');
          document.getElementById('turn-h').classList.add('white-crossed-swords');
        }

      } else {
        data.currentPlayer = "white";
        //update the indicator
        document.getElementById('turn-h').innerText = "White's turn";
        document.getElementById('turn-h').className = 'white-turn';
        //if the player can make a eat move - add swords to the turn indicator
        data.canIEat();
        if (data.canEat) {
          console.log('cross');
          document.getElementById('turn-h').classList.add('black-crossed-swords');
        }
      }
    }

    //return true if the player has a move he can make
    function canMakeMove(player) {
      console.log("called canMakeMove " + player);
      if (player == "black") {
        //loop throught all cells
        for (let i = 0; i < data.board.length; i++) {
          for (let k = 0; k < data.board[i].length; k++) {
            //if the cell is black
            //if i have a possible move
            if (data.board[i][k] < 0 && getAllMoves(i, k, false).length > 0) {
              return true;
            }
          }
        }
      } else if (player == "white") {
        //loop throught all cells
        for (let i = 0; i < data.board.length; i++) {
          for (let k = 0; k < data.board[i].length; k++) {
            //if the cell is white
            //if this unit has a possible move
            if (data.board[i][k] > 0 && getAllMoves(i, k, false).length > 0) {
              return true;
            }
          }
        }
      }
      return false;
    }
  }
}
