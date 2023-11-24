import { saveLocalBoard, removeLocalBoard } from "./store";
import { getSolution } from "./comms";

const invalidClass = "text-red-500";
const validClass = "bg-background-300";
const bgDanger = "bg-red-700";
const bgSuccess = "bg-teal-600";
const bgNormal = ["bg-white/10", "backdrop-blur-xl"];
const bgFixed = "bg-background-200";


export function boardCellTextChangeHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target;
    target.textContent = event.data.toUpperCase();
    if (isValid(target)) {
        target.classList.add(validClass);
        target.classList.remove(invalidClass);
        removeClass(target, bgNormal);
    } else {
        target.classList.add(invalidClass);
        target.classList.remove(validClass);
        applyClass(target, bgNormal);
    }
    saveLocalBoard(getCurrentBoardState());
    window.document.querySelector("aside #answer").disabled = !isAnswerReady();
}

export function isValid(el) {
    return (
        !isNaN(el.textContent) &&
        !isNaN(parseFloat(el.textContent)) &&
        el.textContent.length == 1 &&
        parseInt(el.textContent) > 0
    );
}

export function isAnswerReady() {
    return (
        Array.from(window.board.querySelectorAll("div"))
            .filter((el) => el.isContentEditable)
            .filter((el) => !isValid(el)).length == 0
    );
}

export function resetBoard() {
    Array.from(window.board.querySelectorAll("div"))
        .filter((el) => el.isContentEditable)
        .forEach((el) => {
            el.textContent = "";
            el.classList.remove(invalidClass);
            el.classList.remove(validClass);
            applyClass(el, bgNormal);
        });
    removeLocalBoard();
}

export function getCurrentBoardState() {
    return Array.from(window.board.querySelectorAll("div"))
        .map((el) => (/[1-9]/.test(el.textContent) ? el.textContent : "x"))
        .join("");
}

export function prepareBoard(dim, board = window.board) {
    if (isNaN(dim)) return;
    for (let i = 0; i < dim * dim; i++) {
        const card = window.cardTemplate.content.cloneNode(true);
        const div = card.querySelector("div");

        div.addEventListener("input", boardCellTextChangeHandler);
        board.appendChild(card);
    }
}

export function loadBoardFromString(off, usr, board = window.board) {
    const official = off.split("");
    const user = usr.split("");
    board.querySelectorAll("div").forEach((div, i) => {
        div.innerText = isNaN(official[i])
            ? isNaN(user[i])
                ? ""
                : user[i]
            : official[i];
        if (official[i] == "x") {
            div.contentEditable = true;
            if (usr != "" && user[i] != "x")
                div.classList.add(validClass);
            else
                applyClass(div, bgNormal);
        } else {
            applyClass(div, bgFixed);
            div.contentEditable = false;
        }
    });
}

export async function revealAnswer() {
    const answerBoard = window.document.getElementById("answer");
    const solution = (await getSolution()).solution;
    prepareBoard(window.boardData.width, answerBoard);
    loadBoardFromString(window.boardData.board, solution, answerBoard);
    disableInput();

    window.document.getElementById("answer").style.display = "grid";
    const mismatches = findMismatches(
        Array.from(window.board.querySelectorAll("div")),
        Array.from(answerBoard.querySelectorAll("div")),
        (el) => el.textContent,
    );
    mismatches.forEach((i) => applyDanger(window.board.querySelectorAll("div")[i]));
    const officialArray = window.boardData.board.split("");
    [...Array.from(window.board.querySelectorAll("div")).keys()].filter(i => !mismatches.includes(i) && isNaN(officialArray[i]))
        .forEach(el => applyClass(window.board.querySelectorAll("div")[el], bgSuccess));

    window.document.querySelector("aside #answer").disabled = true;
    window.document.querySelector("aside #reset").disabled = false;
}

export function disableInput() {
    window.document.querySelectorAll("div").forEach((div) => {
        div.contentEditable = false;
    });
}

export function findMismatches(arr1, arr2, lambda) {
    const mismatches = [];
    for (let [i, _] of arr1.entries()) {
        if (lambda(arr1[i]) != lambda(arr2[i])) mismatches.push(i);
    }
    return mismatches;
}

export function applyDanger(el) {
    removeClass(el, [validClass, invalidClass, ...bgNormal, bgFixed]);
    applyClass(el, ["text-white", bgDanger]);
}

export function applyClass(el, cls) {
    if (Array.isArray(cls)) {
        cls.forEach((c) => el.classList.add(c));
    } else {
        el.classList.add(cls);
    }
}

export function removeClass(el, cls) {
    if (Array.isArray(cls)) {
        cls.forEach((c) => el.classList.remove(c));
    } else {
        el.classList.remove(cls);
    }
}
