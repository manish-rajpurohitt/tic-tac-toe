/** @format */

let players = [];
let gameOver = false;
let turn = 0;
let nocells = document.getElementById("nocells");
let dimen = parseInt(nocells.value);
let board = new Array(dimen).fill("").map(() => new Array(dimen).fill(""));
const changeCells = (event) => {
  dimen = parseInt(event.target.value);
  board = new Array(dimen).fill("").map(() => new Array(dimen).fill(""));
};
nocells.addEventListener("change", changeCells);

const checkWinning = () => {
  // first check for all rows in board and then for col and then for diagonals
  let len = board.length;
  if (turn < len) {
    return false;
  }
  //console.log(board);

  for (let i = 0; i < len; i++) {
    if (board[i].every((el) => el === board[i][0] && el !== "")) {
      return true;
    }
    //console.log(`${i} Row clear`);
    let start_col_val = board[0][i];
    let count = 1;
    for (let j = 1; j < len; j++) {
      if (start_col_val === board[j][i] && start_col_val !== "") {
        count++;
      }
    }
    //console.log(`${i} Col clear`);
    if (count === len) {
      return true;
    }
  }

  // check for diagonal

  let i = board[0][0];
  let j = 0;
  while (j < len) {
    //console.log(`${board[j][j]} diagonal`);
    if (board[0][0] === "") {
      break;
    }
    if (board[j][j] !== i) {
      break;
    } else {
      j++;
    }
  }
  //console.log(`Diagonal clear`);
  //console.log(`${j} j for diagonal`);
  if (j === len) {
    return true;
  }

  let rev_i = 0;
  let rev_j = len - 1;
  let rev_val = board[rev_i][rev_j];

  while (rev_i < len) {
    if (board[rev_i][rev_j] === "") {
      break;
    }
    if (rev_val !== board[rev_i][rev_j]) {
      break;
    } else {
      rev_i++;
      rev_j--;
    }
  }
  //console.log(`reverse Diagonal clear`);
  if (rev_i === len) {
    return true;
  }

  return false;
};

let gameContainer = document.getElementById("hide");
let hideList = document.getElementsByClassName("hide");
const initGame = (id) => {
  for (let p = 0; p < hideList.length; p++) {
    hideList[p].hidden = "true";
  }
  let inp1 = document.getElementById("p1");
  let inp2 = document.getElementById("p2");
  let player1 = inp1.value;
  let player2 = inp2.value;

  if (isEmpty(player1) || isEmpty(player2)) {
    alert("Player name is req!");
    return;
  }
  inp1.setAttribute("disabled", true);
  inp2.setAttribute("disabled", true);
  nocells.setAttribute("disabled", true);

  players.push(player1);
  players.push(player2);
  document.getElementById("turn").innerHTML = `${players[0]}'s Turn`;
  document.getElementById("turn").style["margin-top"] = "20px";

  for (let j = 0; j < dimen; j++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let k = 0; k < dimen; k++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", () => handleClick(cell));
      cell.setAttribute("id", j.toString() + k.toString());
      row.appendChild(cell);
    }
    gameContainer.appendChild(row);
  }
};
gameContainer.style["margin-top"] = "20px";
const handleClick = (el) => {
  if (el.innerHTML !== "" || gameOver) {
    return;
  }
  let id = el.id;
  let i = parseInt(id[0]);
  let j = parseInt(id[1]);
  board[i][j] = turn % 2 === 0 ? "X" : "O";
  el.innerHTML = board[i][j];

  if (checkWinning()) {
    alert(players[turn % 2] + " won");
    gameOver = true;
    return;
  }
  turn++;
  if (turn === dimen * dimen) {
    gameOver = true;
    alert("Game is Drawn");
    return;
  }

  document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
};
const isEmpty = (value) => !value || !value.trim();
