export function getLegalQueenFirstMoveJump(row, col) {
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

  export default getLegalQueenFirstMoveJump;