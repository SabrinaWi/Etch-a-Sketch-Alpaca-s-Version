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

//Red color button

const redBtn = document.querySelector('button[name="red-btn"]');

redBtn.addEventListener("click", () => {
  setMouseState();
  setSqrColor(mouseState);
});

let mouseState = "";

function setMouseState() {
  mouseState = redBtn.getAttribute("name");
}

sqrColor = "";

function setSqrColor(mouseState) {
  switch (mouseState) {
    case "red-btn":
      sqrColor = "#db1828";
      break;
    case "blue-btn":
      sqrColor = "#181fdb";
      break;
    case "green-btn":
      sqrColor = "#26ad36";
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
