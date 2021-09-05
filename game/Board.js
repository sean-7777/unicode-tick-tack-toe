// store and update the board. also check for winners.
export default class Board {
  constructor(length) {
    this.#board = this.#generateEmptyMatrix("*", length);
  }

  #generateEmptyMatrix(filler, length) {
    return new Array(length).fill(null).map(e => new Array(length).fill(filler));
  }

  #board;

  get board() {
    return this.#board;
  }

  set board(val) {
    throw new Error("You cannot change the board!");
  }

  update(player, moveX, moveY) {
    if ((moveX > this.#board.length - 1) || (moveY > this.#board.length - 1)) return false;
    else if (this.#board[moveX][moveY] !== "*") return false;
    else this.#board[moveX][moveY] = player;
    return true;
  }

  checkWin() {
    // check winner
    // lines
    let winner = (() => {
  
      // checks for horizontal line winners
      function checkLine(board) {
        // loop through each, and check if each line only has one different element not counting nothing (the asterisk)
        for (let row of board) {
          row = row.map(e => e === "*" ? "" : e)
          const unique = new Set(row);
          if (unique.size === 1) return row[0];
        }
        return false;
      }

      const horizontalCheck = checkLine(this.#board); // horizontal lines
  
      // make cols into rows
      let verticalCheckArr = this.#generateEmptyMatrix("", this.#board.length);
      let outerCounter = 0;
      for (let row of this.#board) {
        let innerCounter = 0;
        for (let col of row) {
          verticalCheckArr[innerCounter][outerCounter] = col;
          innerCounter++;
        }
        outerCounter++;
      }

      const verticalCheck = checkLine(verticalCheckArr); // vertical lines
  

      // get empty array
      function generateEmptyArray(length) {
        return new Array(length).fill("");
      }
      // same as checkLine(), except it doesn't have a loop
      function checkLineSingle(line) {
        line = line.map(e => e === "*" ? "" : e)
        const unique = new Set(line);
        if (unique.size === 1) return line[0];
        return false;
      }

      // make top left to bottom right diagonals into rows
      let diagonalCheck1Arr = generateEmptyArray(this.#board.length);
      for (let i in this.#board) diagonalCheck1Arr[i] = this.#board[i][i];

      const diagonalCheck1 = checkLineSingle(diagonalCheck1Arr);

      // make top right to bottom left diagonals into rows
      let diagonalCheck2Arr = generateEmptyArray(this.#board.length);
      // the .map reverses the board
      // the .slice creates a clone otherwise it reverses the board
      const reversedBoard = this.#board.map(elem => elem.slice().reverse());
      for (let i in this.#board) diagonalCheck2Arr[i] = reversedBoard[i][i]

      const diagonalCheck2 = checkLineSingle(diagonalCheck2Arr);


      return horizontalCheck || verticalCheck || diagonalCheck1 || diagonalCheck2;
    })();
    if (winner) return winner;
  
    // check for ties
    if ((() => {
      for (let row of this.#board) {
        for (let col of row) {
          if (col === "*") return false;
        }
      }
      return true;
    })()) {
      return "tie";
    }
  
    return "no winner";
  }
}