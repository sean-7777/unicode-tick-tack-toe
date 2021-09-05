// imports
import Board from "./game/Board.js";
import UnicodeGenerator from "./game/UnicodeGenerator.js";
import {userData, resetData} from "./game/data.js";
import inquirer from "inquirer";

// get user data, if it is malformed, reset it.
const board = new Board(3);
let data = userData();
if (data.saved === undefined || data.stats.wins === undefined || data.stats.loses === undefined || data.stats.ties === undefined) data = resetData();


async function newGame(opts) {
  // function to prompt the user to enter a move. also updates the board.
  async function getMove(player) {
    await inquirer.prompt({
      type: "input",
      name: "move",
      message: "Enter where you want to move. Ex. The top square would be 1.1:",
      validate: (val, hash) => {
        const splitted = val.split(".");

        if (splitted.length !== 2) return "Invalid Input";

        const [x, y] = splitted.map(elem => {
          if (isNaN(elem)) return NaN;
          else return parseInt(elem, 10) - 1;
        });
        if (x === NaN || y === NaN) return "Invalid Input";

        const update = board.update(player, x, y);
        if (!update) return "Invalid Input";

        return true;
      }
    });
  }

  let curPlayerSym = opts.startingPlayer === "player1" ? "x" : "o"; // get symbol
  let curPlayer = opts.startingPlayer;
  let winner;
  const board = new Board(opts.boardSize);

  let firstTime = true;

  // main functionality
  while (board.checkWin() === "no winner") {
    if (firstTime) {
      console.log(`Player ${opts[`${opts.startingPlayer}Name`]} starts the game with symbol ${curPlayerSym}.`);
      firstTime = false;
    }
    else console.log(`It is now player ${opts[`${curPlayer}Name`]}'s turn, with symbol ${curPlayerSym}.`);

    console.log(UnicodeGenerator(board.board));
    await getMove(curPlayerSym);

    curPlayerSym = curPlayerSym === "x" ? "o" : "x";
    winner = curPlayer;
    curPlayer = curPlayer === "player1" ? "player2" : "player1";
  }

  console.log(`Player ${opts[`${winner}Name`]} wins!`);
}

// displays the menu, and forever loops
async function menu(player) {
  const menuOpt = (await inquirer.prompt({
    type: "list",
    name: "menu",
    message: "Select a option:",
    choices: [
      "Start new game",
      "Resume game",
      "View stats",
      "Reset data",
      "Exit"
    ],
    loop: true
  })).menu
  switch (menuOpt) {
    case "Start new game":
      // get game options
      const gameOpt = await inquirer.prompt([
        {
          type: "input",
          name: "boardSize",
          message: "What board size would you like?",
          validate: (val, hash) => {
            if (isNaN(val)) return "Invalid Input";
            else return true;
          },
          filter: (val, hash) => parseInt(val, 10)
        },
        {
          type: "input",
          name: "player1Name",
          message: "What is the name of player 1? (x):"
        },
        {
          type: "input",
          name: "player2Name",
          message: "What is the name of player 2? (o):"
        },
        {
          type: "list",
          name: "startingPlayer",
          message: "Which player should go first?",
          choices: [
            "Player 1 (x)",
            "Player 2 (o)",
          ],
          default: "Player 1 (x)",
          filter: (val, hash) => {
            if (val === "Player 1 (x)") return "player1";
            else if (val === "Player 2 (o)") return "player2";
          },
          loop: true
        }
      ]);

      // start game
      await newGame(gameOpt);
      break;

    case "Resume game":
      console.log("not implemented");
      break;

    // show stats and calculate total games and win percentage
    case "View stats":
      const totalGames = data.stats.wins + data.stats.ties + data.stats.loses;
      console.log(
`Wins: ${data.stats.wins}
Ties: ${data.stats.ties}
Loses: ${data.stats.loses}
Total Games: ${totalGames}
Win Percentage: ${Math.round((data.stats.wins / totalGames) * 10) || 0}%`)

      break;

    // self explanatory
    case "Reset data":
      const confirm = await inquirer.prompt({
        type: "confirm",
        name: "resetConfirm",
        message: "Are you sure you want to reset all you data? This will permanently erase all of your stats and saved games.",
        default: false
      });
      if (confirm) {
        console.log("Resetting data...");
        data = resetData();
      } else {
        console.log("Canceled.");
      }
      
      break;

    case "Exit":
      // idk if this is any better than process.exit lol
      process.kill(process.pid, "SIGTERM");

    // prob not needed
    default:
      console.log("what you broke the game")
      break;
  }

  menu();
}

menu();