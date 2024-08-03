// script.js

// Initialize game variables
let board = ['', '', '', '', '', '', '', '', '']; // Represents the 3x3 board as an array
let currentPlayer = 'X'; // The current player, either 'X' or 'O'
let gameActive = true; // Boolean to check if the game is still active

// Elements
const cells = document.querySelectorAll('.cell'); // Selects all cells in the game board
const resetButton = document.getElementById('reset-button'); // Selects the reset button

// Winning combinations
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

// Function to handle cell clicks
function handleCellClick(event) {
    const clickedCell = event.target; // The cell that was clicked
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index')); // Get the index of the clicked cell

    // Check if the cell is already filled or if the game is not active
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update the board array and the clicked cell's text content
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check for a winner or a draw
    checkForWinner();

    // Switch the current player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById("pp").textContent = "Current Player is: "+ currentPlayer;
}

// Function to check for a winner
function checkForWinner() {
    let roundWon = false;

    // Loop through all winning conditions to check if there is a winner
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        // Skip if any cell in the win condition is empty
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // Check if all cells in the win condition are the same
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // If a player has won, end the game and display an alert
    if (roundWon) {
        gameActive = false;
        // alert(`Player ${currentPlayer} has won!`);
        Swal.fire({
            title: "Good job!",
            text: `Player ${currentPlayer} has won!`,
            icon: "success"
          });
        return;
    }

    // Check for a draw (no empty cells left)
    if (!board.includes('')) {
        gameActive = false;
        alert('Game ended in a draw!');
    }
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']; // Reset the board array
    currentPlayer = 'X'; // Reset the current player to 'X'
    gameActive = true; // Set the game to active
    cells.forEach(cell => cell.textContent = ''); // Clear all cell contents
}

// Add event listeners to each cell and the reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);