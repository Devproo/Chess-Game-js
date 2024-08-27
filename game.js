// Get the chessboard container element
const board = document.getElementById("chessboard");

// Object mapping chess piece codes to their corresponding Unicode symbols
const pieces = {
  r: "♖",
  n: "♘",
  b: "♗",
  q: "♕",
  k: "♔",
  p: "♙",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
  P: "♙",
};

// Initial board setup: lowercase for black pieces, uppercase for white pieces
const initialBoard = [
  "r",
  "n",
  "b",
  "q",
  "k",
  "b",
  "n",
  "r",
  "p",
  "p",
  "p",
  "p",
  "p",
  "p",
  "p",
  "p",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  ".",
  "P",
  "P",
  "P",
  "P",
  "P",
  "P",
  "P",
  "P",
  "R",
  "N",
  "B",
  "Q",
  "K",
  "B",
  "N",
  "R",
];

// Variable to keep track of the currently selected square
let selectedSquare = null;

/**
 * Creates the chessboard grid with 64 squares.
 * Squares are given alternating black and white colors.
 * Each square is also set up to handle click events.
 */
function createBoard() {
  board.innerHTML = ""; // Clear the board content if any
  for (let i = 0; i < 64; i++) {
    const square = document.createElement("div");
    // Alternate square colors (black and white)
    square.className =
      "square " + ((Math.floor(i / 8) + i) % 2 === 0 ? "white" : "black");
    square.dataset.index = i; // Store the square's index in a data attribute
    square.addEventListener("click", () => handleSquareClick(square)); // Set up click handler
    board.appendChild(square); // Add the square to the chessboard
  }
}

/**
 * Draws the pieces on the board based on the initialBoard array.
 * Each piece is placed in its corresponding square.
 */
function drawPieces() {
  const squares = document.querySelectorAll(".square");
  initialBoard.forEach((piece, index) => {
    if (piece !== ".") {
      // If the square is not empty
      squares[index].innerHTML = `<span class="piece">${pieces[piece]}</span>`;
    }
  });
}

/**
 * Handles the click event for a square.
 * Selects a square if it contains a piece, or moves the piece if another square is already selected.
 * @param {HTMLElement} square - The clicked square element
 */
function handleSquareClick(square) {
  const index = parseInt(square.dataset.index, 10); // Get the square index
  const piece = initialBoard[index]; // Get the piece on the clicked square

  if (selectedSquare === null) {
    // If no square is selected, select this one if it contains a piece
    if (piece !== ".") {
      square.classList.add("selected"); // Highlight the selected square
      selectedSquare = index; // Store the selected square's index
    }
  } else {
    // If a square is already selected, move the piece to the clicked square
    movePiece(selectedSquare, index);
    // Deselect all squares
    document
      .querySelectorAll(".square")
      .forEach((sq) => sq.classList.remove("selected"));
    selectedSquare = null; // Reset the selected square
  }
}

/**
 * Moves a piece from one square to another.
 * Updates the board visually and in the initialBoard array.
 * @param {number} fromIndex - The index of the square from which the piece is moved
 * @param {number} toIndex - The index of the square to which the piece is moved
 */
function movePiece(fromIndex, toIndex) {
  const squares = document.querySelectorAll(".square");
  const fromSquare = squares[fromIndex];
  const toSquare = squares[toIndex];

  // Move the piece visually by updating the innerHTML of the target square
  const piece = fromSquare.innerHTML;
  toSquare.innerHTML = piece;
  fromSquare.innerHTML = ""; // Clear the original square

  // Update the initialBoard array to reflect the move
  initialBoard[toIndex] = initialBoard[fromIndex];
  initialBoard[fromIndex] = ".";
}

// Initialize the chessboard and draw the pieces
createBoard();
drawPieces();
