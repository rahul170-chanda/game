const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
let cells = Array(9).fill(null);
let currentPlayer = 'X';

function createBoard() {
    cells.forEach((cell, index) => {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.dataset.index = index;
        div.addEventListener('click', handleCellClick);
        board.appendChild(div);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (cells[index] || checkWinner()) return;

    cells[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `${currentPlayer} Wins!`;
    } else if (cells.every(cell => cell)) {
        message.textContent = 'It\'s a Tie!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

function restartGame() {
    cells.fill(null);
    currentPlayer = 'X';
    message.textContent = '';
    board.innerHTML = '';
    createBoard();
}

restartButton.addEventListener('click', restartGame);
createBoard();
