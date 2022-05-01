class BoardData {
    constructor(startingPlayer) {
        //board keeps track of the units: 1 is white normal, 2 is white queen, -1 black normal, -2 black queen
        this.board = [
            [1, 0, 0, 0, 1, 0, 1, 0],
            [0, 1, 0,-1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, -1, 0, -1, 0, 0, 0, -1],
            [-1, 0, -1, 0, -1, 0, 1, 0],
            [0, -1, 0, -1, 0, -1, 0, -1]
        ];
        this.currentPlayer = startingPlayer;
        this.combo=false;
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

