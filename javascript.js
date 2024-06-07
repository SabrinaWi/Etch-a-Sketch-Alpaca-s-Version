// CREATE SQUARES INSIDE THE canvas DIV

const promptBtn = document.querySelector('button[name="prompt-btn"]');

let squaresNumber = 0;

function getSquaresNumber() {
  squaresNumber = prompt("Please enter a number between 1 and 100!");

  return squaresNumber;
}

const buttons = document.querySelectorAll("button");

promptBtn.addEventListener("click", () => {
  sqrColor = ""; //remove color from previous round so user chooses new one
  buttons.forEach((button) => button.classList.remove("active"));
  colorBtns.forEach((colorBtn) => (colorBtn.disabled = false));
  promptBtn.classList.add("active");
  clearSquares();
  removeAlpacaImg();
  getSquaresNumber();
  errorMessage(squaresNumber);
  createSquares(squaresNumber);
  activatePaintMode(canvas);
});

const canvas = document.querySelector(".canvas");
const square = document.querySelector(".square");

// Create a div and append it to .canvas

function createSquares(squaresNumber) {
  for (let i = 0; i < squaresNumber * squaresNumber; i++) {
    const square = document.createElement("div");
    square.style.width = `${100 / squaresNumber}%`;
    square.style.height = `${100 / squaresNumber}%`;
    square.classList.add("square");
    canvas.appendChild(square);
    if (canvas.classList.contains("alpaca-img")) {
      activateAlpacaMouseListener(square);
    } else {
      activateMouseListener(square);
    }
  }
}

function clearSquares() {
  const existingSquares = document.querySelectorAll(".square");
  existingSquares.forEach((square) => {
    canvas.removeChild(square);
  });
}

function errorMessage(squaresNumber) {
  if (squaresNumber < 1 || squaresNumber > 100) {
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
  colorBtn.addEventListener("click", (event) => {
    colorBtns.forEach((colorBtn) => colorBtn.classList.remove("active"));
    getColorChoice(event);
    colorBtn.classList.add("active");
  });
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
];
const randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];

function activatePaintMode(canvas) {
  canvas.addEventListener("mouseenter", () => {
    canvas.style.cursor = 'url("./img/brush-stroke-rounded.svg"), auto';
  });

  canvas.addEventListener("mouseleave", () => {
    canvas.style.cursor = "auto";
  });
}

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
  buttons.forEach((button) => button.classList.remove("active"));
  colorBtns.forEach((colorBtn) => (colorBtn.disabled = true));
  specialBtn.classList.add("active");
  clearSquares();
  addAlpacaImg();
  createSquares(20);
  activateEraseMode(canvas);
});

function activateEraseMode(canvas) {
  canvas.addEventListener("mouseenter", () => {
    canvas.style.cursor = 'url("./img/ai-eraser-stroke-rounded.svg"), auto';
  });

  canvas.addEventListener("mouseleave", () => {
    canvas.style.cursor = "auto";
  });
}

function activateAlpacaMouseListener(square) {
  let squareOpacity = 1;
  square.addEventListener("mousemove", () => {
    if (isMouseDown) {
      squareOpacity -= 0.1;
      square.style.opacity = squareOpacity;
    }
  });

  square.addEventListener("mousedown", () => {
    isMouseDown = true;
  });

  square.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  square.addEventListener("click", () => {
    squareOpacity -= 0.1;
    square.style.opacity = squareOpacity;
  });
}

function addAlpacaImg() {
  canvas.classList.add("alpaca-img");
}

function removeAlpacaImg() {
  canvas.classList.remove("alpaca-img");
}
