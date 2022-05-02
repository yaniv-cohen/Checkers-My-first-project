class BoardData {
    constructor(startingPlayer) {
        //board keeps track of the units: 1 is white normal, 2 is white queen, -1 black normal, -2 black queen
        //A 4X4 would suffice, but 8X8 is simpler
        this.board = [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],

        // [0, 0, 0, 0, 0, 0, 2, 0],
        // [0, 0, 0, 0, 0, 1, 0, 0],
        // [0, 0, 1, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 1, 0],
        // [0, 0, 0, 0, 0, 0, 0, -1],
        // [1, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, -2],

        // [0, 0, 0, 0, 0, 0, 2, 0],
        // [0, 1, 0, 1, 0, 0, 0, 0],
        // [2, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0],
        // [1, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 1, 0, 1, 0, 1],
        // [-1, 0, 0, 0, 1, 0, 1, 0],
        // [0, 0, 0, 0, 0, -1, 0, -2],

        // [0, 0, 0, 0, 0, 0, 2, 0],
        // [0, 0, 0, 0, 0, 1, 0, 1],
        // [0, 0, 0, 0, -1, 0, -1, 0],
        // [0, 0, 0, -1, 0, -1, 0, -1],
        // [0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 1, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, -2],
        ];
        this.currentPlayer = startingPlayer; //takes 'white' or 'black
        this.combo = false; //did I just eat a unit? used to know if a normal piece can eat backwards
        this.canEat = false; //hold true or false, used to know if one of the units of current player can eat
        this.endGame=false; //disables clicks on the board if the game is over
    }

    //goes over all of the current player's units and return true if any of them can eat
    //used to know wheter to allow a unit to make a move without eating an enemy
    canIEat() {
        //reset from last turn
        data.canEat = false;
        rowLoop: 
        for (let i = 0; i < 8; i++) {
            folLoop: 
            for (let k = 0; k < 8; k++) {
                //for every unit, if it my unit
                if ((data.currentPlayer === "white" && data.board[i][k] > 0) ||
                    (data.currentPlayer === "black" && data.board[i][k] < 0)) {
                        //calculate all its legalMoves, which chages data.canEat to 'true' if there is a possible eat move
                    getAllMoves(i, k, false);
                    if (data.canEat) {
                        //no need to check every unit (1 or more is irrelevant) 
                        // so stop on the first and exit the outer the loop
                        break rowLoop;
                        //TODO: Add eater class that marks all the units that can eat this turn
                    }
                }
            }
        }
    }

//called after every eat. if a player lost all his units - ends the game
//TODO: add score for each player based on the number of units on the board
    countPieces() {
        this.black_unit_count = 0;
        this.white_unit_count = 0;
        // console.log('count');
        for (let i = 0; i < this.board.length; i++) {
            for (let k = 0; k < this.board.length; k++) {
                if (this.board[i][k] > 0) {
                    this.white_unit_count++;
                }
                else if (this.board[i][k] < 0) {
                    this.black_unit_count++;
                }
            }
        }

        if (this.black_unit_count <= 0) {
            winner('white');
        }
        else if (this.white_unit_count <= 0) {
            winner('black');
        }
    }

    //adds select class and stores the last selected cell cordinates.
    //TODO: merge select and deselect
    select(row, col, cell) {
        cell.classList.add('selected');
        selected = [row, col];
    }
    deselct() {
        selected = [];
        if (document.getElementsByClassName('selected').length > 0) {

            document.getElementsByClassName('selected')[0].classList.remove('selected');
        }
    }
    //clear the board from all options
    deleteOptions() {
        while (document.getElementsByClassName('option').length > 0) {
            document.getElementsByClassName('option')[0].classList.remove('option');
        }
    }
}

