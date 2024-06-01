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
const square = document.querySelector(".square");

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
    activateListener(square);
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
//TODO when it works for one button, rewrite so that it works for all (not separate handler for each button!)

//Toggle what should happen on mouseover

let colorChoice = "";

const colorBtns = document.querySelectorAll(".color-btns button");

function getColorChoice(event) {
  colorBtn = event.target;
  colorChoice = colorBtn.getAttribute("name");
  setSqrColor(colorChoice);
}

colorBtns.forEach((colorBtn) => {
  colorBtn.addEventListener("click", getColorChoice);
});

sqrColor = "";

function setSqrColor(colorChoice) {
  switch (colorChoice) {
    case "red-btn":
      sqrColor = "#df0000";
      break;
    case "orange-btn":
      sqrColor = "#d65b00";
      break;
    case "yellow-btn":
      sqrColor = "#e9f500";
      break;
    case "green-btn":
      sqrColor = "#17ff11";
      break;
    case "liteblue-btn":
      sqrColor = "#1dffff";
      break;
    case "darkblue-btn":
      sqrColor = "#0511ff";
      break;
    case "violet-btn":
      sqrColor = "#ca00fd";
      break;
  }

  return sqrColor;
}

function activateListener(square) {
  if (square) {
    square.addEventListener("mousemove", () => {
      if (sqrColor) {
        square.style.backgroundColor = sqrColor;
      }
    });
  }
}

// function changeSqrBackground(sqrColor) {
//   square.style.backgroundColor = sqrColor;
// }
