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

function createSquares(squaresNumber) {
  for (let i = 0; i < squaresNumber * squaresNumber; i++) {
    const square = document.createElement("div");
    square.style.width = `${100 / squaresNumber}%`;
    square.style.height = `${100 / squaresNumber}%`;
    square.classList.add("square");
    screen.appendChild(square);
    activateMouseListener(square);
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
    case "rainbow-btn":
      sqrColor = "rainbow";
      break;
    case "black-btn":
      sqrColor = "#000000";
      break;
  }

  return sqrColor;
}

const colorArray = [
  "#df0000",
  "#d65b00",
  "#e9f500",
  "#17ff11",
  "#1dffff",
  "#0511ff",
  "#ca00fd",
  "#000000",
];
const randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];

function activateMouseListener(square) {
  square.addEventListener("mousemove", () => {
    if (isMouseDown && sqrColor) {
      square.style.backgroundColor = sqrColor;
    }

    if (isMouseDown && sqrColor === "rainbow") {
      const randomColor =
        colorArray[Math.floor(Math.random() * colorArray.length)];
      square.style.backgroundColor = randomColor;
    }
    if (isMouseDown && screen.style.backgroundImage === alpacaImg) {
      square.style.opacity = "0";
    }
  });

  square.addEventListener("mousedown", () => {
    isMouseDown = true;
  });

  square.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  square.addEventListener("click", () => {
    if (sqrColor) {
      square.style.backgroundColor = sqrColor;
    }
    if (sqrColor === "rainbow") {
      const randomColor =
        colorArray[Math.floor(Math.random() * colorArray.length)];
      square.style.backgroundColor = randomColor;
    }
  });
}

//SPECIAL BUTTON

const specialBtn = document.querySelector('button[name="alpaca-btn"]');

specialBtn.addEventListener("click", () => {
  clearSquares();
  addAlpacaImg();
  createSquares(20);
});

const alpacaImg = document.createElement("img");

function addAlpacaImg() {
  alpacaImg.src = "./img/alpacasmol.png";
  alpacaImg.alt = "An image of a small brown alpaca.";
  alpacaImg.classList.add("alpaca-img");
  screen.appendChild(alpacaImg);
}
