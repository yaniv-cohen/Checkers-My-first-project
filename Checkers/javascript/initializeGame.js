//called on 'Generate Game' button click
function initializeGame()
{
    //hide the header
document.getElementsByTagName('header')[0].style.display='none';
//hide win screens
document.getElementsByClassName('win-div')[0].style.display='none';
document.getElementsByClassName('win-div')[1].style.display='none';
//show gameBoard
document.getElementById('gameBoard').style.display='flex';
//data will hold the board state and settings
data=new BoardData('white');
//get settings from the checkboxes
data.settings =[document.getElementsByName('comboCantGoBack')[0].checked,
document.getElementsByName('queenOnlyOneMove')[0].checked];
//call to make the cells
paintBoard();
}