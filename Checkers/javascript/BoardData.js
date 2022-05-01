class BoardData {
    constructor(startingPlayer) {
        //board keeps track of the units: 1 is white normal, 2 is white queen, -1 black normal, -2 black queen
        this.board = [
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, -1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, -1, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, -1]
        ];
        this.currentPlayer = startingPlayer;
        this.combo = false;
        this.white_unit_count = 0;
        this.black_unit_count = 0;
        this.countPieces();
    }

    countPieces() {
        this.black_unit_count=0;
        this.white_unit_count=0;
        console.log('count');
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
        console.log("this.black_unit_count: " + this.black_unit_count);
        if (this.black_unit_count <= 0) {
            winner('white');
        }
        else if (this.white_unit_count <= 0) {
            winner('black');
        }
    }

    select(row, col, cell) {
        cell.classList.add('selected');
        selected = [row, col];
    }

    getCell(row, col) {
        return (document.getElementById('gameBoard').firstChild.rows[row].cells[col]);
    }

    deselct() {
        selected = [];
        if (document.getElementsByClassName('selected').length > 0) {

            document.getElementsByClassName('selected')[0].classList.remove('selected');
        }
    }
    deleteOptions() {
        while (document.getElementsByClassName('option').length > 0) {
            document.getElementsByClassName('option')[0].classList.remove('option');
        }
    }
}

