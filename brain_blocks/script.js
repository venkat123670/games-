const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const ROWS = 20, COLS = 10, BLOCK_SIZE = 24;
let board = [];
let score = 0;
let gameOver = false;

function createBoard() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (cell) {
        ctx.fillStyle = "#00ffc6";
        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    })
  );
}

function dropBlock() {
  if (gameOver) return;

  const x = Math.floor(Math.random() * COLS);
  for (let y = 0; y < ROWS; y++) {
    if (board[y][x] === 1) {
      if (y === 0) {
        gameOver = true;
        alert("💥 Game Over!");
        return;
      }
      board[y - 1][x] = 1;
      checkLines();
      return;
    }
  }
  board[ROWS - 1][x] = 1;
  checkLines();
}

function checkLines() {
  for (let y = ROWS - 1; y >= 0; y--) {
    if (board[y].every(cell => cell === 1)) {
      board.splice(y, 1);
      board.unshift(Array(COLS).fill(0));
      score += 100;
      document.getElementById("score").textContent = `Score: ${score}`;
      y++;
    }
  }
}

function gameLoop() {
  if (!gameOver) {
    dropBlock();
    drawBoard();
  }
}

function startGame() {
  createBoard();
  score = 0;
  gameOver = false;
  document.getElementById("score").textContent = `Score: 0`;
  clearInterval(window.loop);
  window.loop = setInterval(gameLoop, 800);
}

startGame();
