const promptBtn = document.querySelector('button[name="prompt-btn"]');

let squaresAmount = 0;

function storeSquaresAmount() {
  squaresAmount = prompt("Please enter a number between 1 and 100!");
  return squaresAmount;
}

promptBtn.addEventListener("click", () => {
  clearSquares();
  storeSquaresAmount();
  createSquares(squaresAmount);
});

const screen = document.querySelector(".screen");

// Create a div and append it to screen

const square = document.createElement("div");

function createSquares(squaresAmount) {
  for (let i = 0; i < squaresAmount * squaresAmount; i++) {
    const square = document.createElement("div");
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
