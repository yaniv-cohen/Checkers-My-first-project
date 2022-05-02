//called if a player has less than 1 unit
//the parameter is the winning player
function winner(player) {
    let winCondition = "no units";
    for(let i=0;i<8;i++)
    {
        for(let k=0;k<8;k++)
        {
            if(player ==data.board[i][k])
            {
                winCondition="no moves";
            }
        }   
    }
    data.endGame=true;
    if (player === 'white') {
        document.getElementById("white-win-div").style.display = 'inline';
        document.getElementById("white-win-div").classList.add('fade-in-animation');
        document.getElementById("white-win-condition-text").innerText ='Black has ' +winCondition;
        
    }
    else if (player === 'black') {
        document.getElementById("black-win-div").style.display = 'inline';
        document.getElementById("black-win-div").classList.add('fade-in-animation');
        document.getElementById("black-win-condition-text").innerText ='white has ' +winCondition;


    }
    else {
        alert('something went wrong');
    }
}