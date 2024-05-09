
var GameBoard = function () {
  this.board = [[5,4,3,2,1],[],[]],
  this.numberOfPegs = 3,
  this.disks = 5
};

/**
 * Functions that interact/alter the GameBoard
 */

GameBoard.prototype.stringFormattedGameBoard = function() {
  // Returns an array of strings that are formatted to be pegs
  return this.board.map((peg) => {
    return peg.reduce((prev, cur) => { return prev + " " + cur}, "---");
  });
};

GameBoard.prototype.logGameBoard = function (message) {
  var strings = this.stringFormattedGameBoard();
  if (message) {
    console.log(message)
  }
  return strings.forEach((string) => console.log(string));
}

GameBoard.prototype.moveIsValid = function (from, to) {
  // Returns an array containing if the move is valid and it's error message
  if (from.length === 0){
    return [false, "Cannot move disk from an empty peg"]
  } else if (from[from.length - 1] > to[to.length - 1]) {
    return [false, "You cannot move a larger disc on top of a smaller one"]
  } else if (to.length === 0) {
    return [true, "That move was successful"]
  }
  return [false, "Move is not valid"]
}

GameBoard.prototype.move = function(from, to) {
  var startingPeg = this.board[from]
  var targetPeg = this.board[to]
  var moveIsValid = this.moveIsValid(startingPeg, targetPeg)
  if (moveIsValid[0] === false){
    this.logGameBoard(moveIsValid[1] + ", " + "The board is still: ")
    return moveIsValid[1]  
  }
  var removeDisk = startingPeg.pop()
  targetPeg.push(removeDisk)
  this.logGameBoard(moveIsValid[1] + ", " + "the board is now: ")
  return this.board
}

GameBoard.prototype.resetBoard = function() {
  var newBoard = [];
  // Todo: rethink this method to make it more efficient
  for (let i = 0; i < this.numberOfPegs; i++){
    newBoard.push([])
  }
  for (let i = this.disks; i > 0; i--) {
    newBoard[0].push(i)
  }

  this.board = newBoard
  this.logGameBoard("Game Board has been reset, it is now: ")
  return newBoard
}

GameBoard.prototype.checkIfAllButOnePegIsEmpty = function(board){
  let emptyPeg
  board.forEach((peg, index) => {
    if (peg.length > 0) {
      if (emptyPeg == undefined) {
        emptyPeg = index
      } else {
        return emptyPeg = -1
      }
    }
  })
  return emptyPeg
}

GameBoard.prototype.checkIfPegIsInOrder = function(peg) {
  let oneLessThanPrevious = (cur, prev) => {
    return cur == prev - 1
  }

  return peg.every((disk, index, arr) => {
    if (index == 0) return true;
    return oneLessThanPrevious(disk, arr[index - 1])
  })
}



GameBoard.prototype.checkWinner = function(board) {

  // Check if all but one peg is empty
  let filledPeg = this.checkIfAllButOnePegIsEmpty(board)
  let winner = false
  // check if non empty peg is starting peg
  if (filledPeg > 0) {
    winner = this.checkIfPegIsInOrder(board[filledPeg])
  }
  // check if the peg with disks is descending order
  return winner
}


/**
 * HTML Altering functions
 */

GameBoard.prototype.createPegElementsArray = function () {
  return this.stringFormattedGameBoard().map((pegString) => {
    var pegText = document.createElement("h2");
    pegText.innerHTML = pegString;
    var pegElement = document.createElement("div");
    pegElement.setAttribute("class", "game-peg");
    pegElement.appendChild(pegText)

    return pegElement;
  });
};


