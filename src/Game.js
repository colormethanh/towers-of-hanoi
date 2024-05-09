console.log("Towers of Hanoi!")
var TowersOfHanoi = new GameBoard();
TowersOfHanoi.logGameBoard();
var pegElementsArray = TowersOfHanoi.createPegElementsArray();

var gameBoard = document.getElementById("game-board");

pegElementsArray.forEach((element) => {
  gameBoard.appendChild(element);
})

