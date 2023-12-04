import * as store from "./store.js";
import * as comms from "./comms.js";
import * as interact from "./interact.js";
import "./index.css";

window.onload = async () => {
  window.board = document.getElementById("board");
  window.cardTemplate = document.getElementById("card");
  window.boardData = store.getBoardData() ?? (await comms.getBoard());
  store.saveBoardData();

  interact.prepareBoard(window.boardData.width);
  interact.loadBoardFromString(window.boardData.board, store.getLocalBoard() ?? "");

  window.document.querySelector("#answerButton").addEventListener("click", interact.revealAnswer);
  window.document.querySelector("#resetButton").addEventListener("click", interact.resetBoard);

};