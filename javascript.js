// CREATE SQUARES INSIDE THE canvas DIV

const promptBtn = document.querySelector('button[name="prompt-btn"]');

let squaresNumber = 0;

function getSquaresNumber() {
  squaresNumber = prompt("Please enter a number between 1 and 100!");

  return squaresNumber;
}

const buttons = document.querySelectorAll("button");

//show visually when a button is active/has been clicked
function activateBtn(button) {
  button.classList.add("active");
}

//remove (visual) active state from previously active buttons
function deactivateBns(buttons) {
  buttons.forEach((button) => button.classList.remove("active"));
}

promptBtn.addEventListener("click", () => {
  sqrColor = ""; //remove color from previous round
  deactivateBns(buttons);
  colorBtns.forEach((colorBtn) => (colorBtn.disabled = false)); //if user interacted with special button before, these need to be reactivated
  activateBtn(promptBtn);
  clearSquares(); //removes squares from previous round
  removeAlpacaImg();
  getSquaresNumber();
  errorMessage(squaresNumber);
  createSquares(squaresNumber);
  activatePaintMode(canvas);
});

const canvas = document.querySelector(".canvas");
const square = document.querySelector(".square");

// Create square divs and append them to .canvas

function createSquares(squaresNumber) {
  for (let i = 0; i < squaresNumber * squaresNumber; i++) {
    const square = document.createElement("div");
    square.style.width = `${100 / squaresNumber}%`;
    square.style.height = `${100 / squaresNumber}%`;
    square.classList.add("square");
    canvas.appendChild(square);
    if (canvas.classList.contains("alpaca-img")) {
      //depending on whether prompt or special button was clicked, different mouse listeners are used
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
    //to make sure people don't break their browser by adding 1000 squares - LOOKING AT YOU FELIX!
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
    deactivateBns(colorBtns); //remove visual active state from previously used button
    getColorChoice(event);
    activateBtn(colorBtn); //mark current button visually as active
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
    case "white-btn":
      sqrColor = "#FFFFFF";
      break;
  }

  return sqrColor;
}

//color array to randomize colors for rainbow button

const colorArray = [
  "#df0000",
  "#d65b00",
  "#e9f500",
  "#17ff11",
  "#1dffff",
  "#0511ff",
  "#ca00fd",
];

//improve user experience: clarify visually that the user can now paint on the canvas
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
        colorArray[Math.floor(Math.random() * colorArray.length)]; //use randomized color for rainbow button - adding this here instead of globally ensures rapidly changing colors
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
        colorArray[Math.floor(Math.random() * colorArray.length)]; //use randomized color for rainbow button - adding this here instead of globally ensures rapidly changing colors
      square.style.backgroundColor = randomColor;
      square.style.backgroundColor = randomColor;
    }
  });
}

//SPECIAL BUTTON

const specialBtn = document.querySelector('button[name="alpaca-btn"]');

specialBtn.addEventListener("click", () => {
  deactivateBns(buttons);
  colorBtns.forEach((colorBtn) => (colorBtn.disabled = true)); //color buttons aren't supposed to be in use in this mode
  activateBtn(specialBtn);
  clearSquares();
  addAlpacaImg();
  createSquares(20);
  activateEraseMode(canvas);
});

//improve user experience: clarify visually that the user will have to erase the squares covering the canvas
function activateEraseMode(canvas) {
  canvas.addEventListener("mouseenter", () => {
    canvas.style.cursor = 'url("./img/ai-eraser-stroke-rounded.svg"), auto';
  });

  canvas.addEventListener("mouseleave", () => {
    canvas.style.cursor = "auto";
  });
}

//reduce opacity of squares to uncover the surprise underneath
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
