var blocksize = 30;
var rows = 20;
var cols = 45;
var board;
var context;

var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];
var gameOver = false;

var score = 0;

var foodX;
var foodY;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blocksize;
  board.width = cols * blocksize;
  context = board.getContext("2d");
  placefood();
  document.addEventListener("keyup", changedirection);
  //update();
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blocksize, blocksize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    score++;
    placefood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  context.fillStyle = "lime";

  snakeX += velocityX * blocksize;
  snakeY += velocityY * blocksize;

  context.fillRect(snakeX, snakeY, blocksize, blocksize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
  }

  if (
    snakeX < 0 ||
    snakeX > cols * blocksize ||
    snakeY < 0 ||
    snakeY > rows * blocksize
  ) {
    gameOver = true;
    alert("Game Over......! Your score is " + score);
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over......! Your score is " + score);
    }
  }
}

function placefood() {
  foodX = Math.floor(Math.random() * cols) * blocksize;
  foodY = Math.floor(Math.random() * rows) * blocksize;
}

function changedirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}
