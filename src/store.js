import { getCurrentBoardState } from "./interact.js";
const localStorage = window.localStorage;

export function saveBoardData() {
  localStorage.setItem("officialBoard", JSON.stringify(window.boardData));
}

export function getBoardData() {
  return JSON.parse(localStorage.getItem("officialBoard"));
}

export function saveLocalBoard() {
  localStorage.setItem("board", getCurrentBoardState());
}

export function getLocalBoard() {
  return localStorage.getItem("board");
}

export function removeLocalBoard() {
  localStorage.removeItem("board");
}
