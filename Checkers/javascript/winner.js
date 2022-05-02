//called if a player has less than 1 unit
//the parameter is the winning player
function winner(player,winCondition) {
    data.endGame=true;
    if (player === 'white') {
        alert('whiete won by '+ winCondition);
    }
    else if (player === 'black') {
        alert('blackkkk won by '+ winCondition);

    }
    else {
        alert('something went wrong');
    }
}