// store and update the board. also check for winners.
export default class Board {
  constructor() {
    // singleton
    if (Board.__instance) {
      return Board.__instance;
    }
    Board.__instance = this;
  }

  board = [
    ["*", "*", "*"],
    ["*", "*", "*"],
    ["*", "*", "*"]
  ];

  update(move) {
    // parse string
    const player = move[0];
    const moveX = parseInt(move[1]), moveY = parseInt(move[2]);
    
    // update board
    if (this.board[moveX][moveY]) return false;
    this.board[moveX][moveY] = player;
  }

  checkWin() {
    // check for ties
    if ((() => {
      for (let row of this.board) {
        for (let col of row) {
          if (col === "*") return false;
        }
      }
      return true;
    })()) {
      return "tie";
    }

    // check winner
    // lines
    let winner = (() => {
      function check(board) {
        // loop through each, and check if each line only has one different element not counting nothing (the asterisk)
        for (let row of board) {
          const unique = new Set(row);
          unique.delete("*");
          if (unique.size === 1) return row[0];
        }
        return false;
      }
      const check1 = check(this.board); // left right lines
      // make rows into cols
      let newArr = new Array(this.board.length).fill([]);
      let outerCounter = 0;
      for (let row of this.board) {
        let innerCounter = 0;
        for (let col of row) {
          newArr[innerCounter][outerCounter] = col;
          innerCounter++;
        }
        outerCounter++;
      }
      const check2 = check(newArr); // up down lines
      
      if (!check1 && !check2) return false;
      else return check1 || check2;
    })();
    if (winner) return winner;

    // diagonals
    winner = (() => {
      function check(player) {
        // check from top left to bottom right
        let xCounter = 0, yCounter = 0;
        for (let i in this.board.length) {
          if (this.board[xCounter][yCounter] !== player) {
            // check from top right to bottom left
            xCounter = this.board.length, yCounter = this.board.length;
            for (let i in this.board.length) {
              if (this.board[xCounter][yCounter] !== player) return false;
              xCounter--;
              yCounter--;
            }
            break;
          };
          xCounter++;
          yCounter++;
        }
        return true;
      }
    })();
    if (winner) return winner;

    return "no winner";
  }
}