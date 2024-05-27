// CREATE SQUARES INSIDE THE SCREEN DIV

const promptBtn = document.querySelector('button[name="prompt-btn"]');

let squaresNumber = 0;

function getSquaresNumber() {
  squaresNumber = prompt("Please enter a number between 1 and 100!");

  return squaresNumber;
}

promptBtn.addEventListener("click", () => {
  clearSquares();
  getSquaresNumber();
  errorMessage(squaresNumber);
  createSquares(squaresNumber);
});

const screen = document.querySelector(".screen");

// Create a div and append it to .screen

const screenWidth = screen.clientWidth;
const screenHeight = screen.clientHeight;

let squareWidth = 0;
let squareHeight = 0;

function createSquares(squaresNumber) {
  for (let i = 0; i < squaresNumber * squaresNumber; i++) {
    const square = document.createElement("div");
    squareWidth = screenWidth / squaresNumber;
    squareHeight = screenHeight / squaresNumber;
    square.style.width = squareWidth + "px";
    square.style.height = squareHeight + "px";
    square.classList.add("square");
    screen.appendChild(square);
  }
}

function clearSquares() {
  const existingSquares = document.querySelectorAll(".square");
  existingSquares.forEach((square) => {
    screen.removeChild(square);
  });
}

function errorMessage(squaresNumber) {
  if (squaresNumber < 0 || squaresNumber > 100) {
    getSquaresNumber();
  }
}

// CHANGE SQUARE COLORS
//TODO when it works for one button, rewrite so that it works for all (not separate handler for ech button!)

const redBtn = document.querySelector('button[name="red-btn"]');

redBtn.addEventListener("click", () => {});
