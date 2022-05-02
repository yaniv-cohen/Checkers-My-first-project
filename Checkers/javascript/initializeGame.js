
function initializeGame()
{

document.getElementsByTagName('header')[0].style.display='none';
document.getElementsByClassName('win-div')[0].style.display='none';
document.getElementsByClassName('win-div')[1].style.display='none';
document.getElementById('gameBoard').style.display='flex';
//data will hold the board state
data=new BoardData('white');
data.settings =[document.getElementsByName('comboCantGoBack')[0].checked,
document.getElementsByName('queenOnlyOneMove')[0].checked];
console.log('set ' +data.settings);
paintBoard();
}