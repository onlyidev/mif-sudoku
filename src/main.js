import * as store from "./store.js";
import * as comms from "./comms.js";
import * as interact from "./interact.js";
import "./index.css";
import { showToast } from "./toast.js";

window.onload = async () => {
  window.board = document.getElementById("board");
  window.cardTemplate = document.getElementById("card");
  window.boardData = store.getBoardData() ?? (await comms.getBoard());
  store.saveBoardData();

  interact.prepareBoard(window.boardData.width);
  interact.loadBoardFromString(window.boardData.board, store.getLocalBoard() ?? "");

  window.document.querySelector("#answerButton").addEventListener("click", interact.revealAnswer);
  window.document.querySelector("#resetButton").addEventListener("click", interact.resetBoard);

  $("#info").click(() => showToast("This is a Sudoku game. Fill in the blanks with numbers 1-9. Each row, column, and 3x3 box must contain the numbers 1-9 exactly once. Once you've filled the board - click the 'Check' button to see if you've won!", Infinity));

};