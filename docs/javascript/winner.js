//called if a player has no moves or no units
//the parameter is the winning player
function winner(player) {
    //default is no units
    let winCondition = "no units";
    //count how many units the loser has if more than 0  than he lost because he has no moves
    row: for (let i = 0; i < 8; i++) {
        for (let k = 0; k < 8; k++) {
            //if the unit is not of my color
            if ((player === 'black' && data.board[i][k] > 0) || (player === 'white' && data.board[i][k] < 0)) {
                console.log('found a enemy unit');
                winCondition = "no moves";
                break row;
            }
        }
    }
    //disable additional clicks on the board
    data.endGame = true;
    //if winner is white
    if (player === 'white') {
        document.getElementById("white-win-div").style.display = 'inline';
        document.getElementById("white-win-div").classList.add('fade-in-animation');
        //add the win condition to the winner window
        document.getElementById("white-win-condition-text").innerText = 'Black has ' + winCondition;

    }
    //if the winner is black
    else if (player === 'black') {
        document.getElementById("black-win-div").style.display = 'inline';
        document.getElementById("black-win-div").classList.add('fade-in-animation');
        //add the win condition to the winner window
        document.getElementById("black-win-condition-text").innerText = 'white has ' + winCondition;
    }
    //if there is a problem
    else {
        alert('something went wrong in the winning function');
    }
}