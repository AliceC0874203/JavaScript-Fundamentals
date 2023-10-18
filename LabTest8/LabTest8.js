const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const scoreDiv = document.getElementById("score");
const roundDiv = document.getElementById("round");
const leftWonDiv = document.getElementById("leftWon");
const rightWonDiv = document.getElementById("rightWon");
const leftLossDiv = document.getElementById("leftLoss");
const rightLossDiv = document.getElementById("rightLoss");

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 3;
let ballSpeedY = 2; 
let leftPaddleY = 150;
let rightPaddleY = 150;
let rounds = 0;
let leftScore = 0;
let rightScore = 0;
let leftWon = 0;
let rightWon = 0;
let leftLoss = 0;
let rightLoss = 0;
let totalMatches = 0;
let gameOver = false;
let gameInterval;
let isTieBreaker = false;

document.addEventListener("keydown", function (event) {
  const paddleHeight = 100;
  const step = 20;

  if (event.code === "ArrowUp" && rightPaddleY > 0) {
    rightPaddleY = Math.max(0, rightPaddleY - step);
  }
  if (event.code === "ArrowDown" && rightPaddleY < canvas.height - paddleHeight) {
    rightPaddleY = Math.min(canvas.height - paddleHeight, rightPaddleY + step);
  }
  if (event.code === "KeyW" && leftPaddleY > 0) {
    leftPaddleY = Math.max(0, leftPaddleY - step);
  }
  if (event.code === "KeyS" && leftPaddleY < canvas.height - paddleHeight) {
    leftPaddleY = Math.min(canvas.height - paddleHeight, leftPaddleY + step);
  }
});

function move() {

  //-- Ball movement logic --//
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check for ball collision with top or bottom walls
  if (ballY <= 0 || ballY >= canvas.height - 10) {
    // Reverse the ball's Y direction
    ballSpeedY = -ballSpeedY;
  }

  const paddleOffset = 20;

  // Check for ball collision with paddles
  if (ballX <= 10 + paddleOffset && ballY > leftPaddleY && ballY < leftPaddleY + 100 ||
    ballX >= canvas.width - 20 - paddleOffset && ballY > rightPaddleY && ballY < rightPaddleY + 100) {
    // Reverse the ball's X direction
    ballSpeedX = -ballSpeedX;
  }

  // Check for ball collision with left or right walls
  if (ballX <= 0 && (ballY < leftPaddleY || ballY > leftPaddleY + 100)) { 
    // Right player scores
    rightScore++;
    rounds++; 
    console.log(`User 2 scored! Score is ${leftScore}-${rightScore}`);
    resetBall();
  }

  if (ballX >= canvas.width && (ballY < rightPaddleY || ballY > rightPaddleY + 100)) {
    // Left player scores 
    leftScore++;
    rounds++;
    console.log(`User 1 scored! Score is ${leftScore}-${rightScore}`);
    resetBall();
  }

  // -- Score logic --//

  // Check for 6-6 tie-breaker
  if (leftScore === 6 && rightScore === 6) {
    console.log("It's 6-6! Tie-breaker round initiated.");
    isTieBreaker = true;  // Set the flag to true
  }

  // Update Round Display
  roundDiv.textContent = `Round: ${rounds}`;
  scoreDiv.textContent = `${leftScore} - ${rightScore}`;

  // Check if a player has reached 7 points 
  // or if it's a tie-breaker and a player has reached 2 points
  if ((leftScore >= 7 && !isTieBreaker) || (rightScore >= 7 && !isTieBreaker) ||
      (isTieBreaker && Math.abs(leftScore - rightScore) >= 2)) {
    clearInterval(gameInterval);

    // Determine match winner
    if (leftScore > rightScore) {
      leftWon++;
      rightLoss++;
      console.log(`User 1 won this match!`);
    } else {
      rightWon++;
      leftLoss++;
      console.log(`User 2 won this match!`);
    }

    // Reset tie-breaker flag
    isTieBreaker = false;

    leftWonDiv.textContent = leftWon;
    rightWonDiv.textContent = rightWon;
    leftLossDiv.textContent = leftLoss;
    rightLossDiv.textContent = rightLoss;

    // Check for game winner here
    if (leftWon >= 3 || rightWon >= 3) {
      if (leftWon >= 3) {
        alert(`User 1 is the winner! Beat User 2 with ${leftWon}-${rightWon} score! Congratulations!!`);
      } else if (rightWon >= 3) {
        alert(`User 2 is the winner! Beat User 1 with ${rightWon}-${leftWon} score! Congratulations!!`);
      }
      stopGame();
      return; // Stop further execution
    }

    // Reset rounds and scores for the next match
    rounds = 0;
    leftScore = 0;
    rightScore = 0;
    roundDiv.textContent = `Round: ${rounds}`;
    scoreDiv.textContent = `${leftScore} - ${rightScore}`;
    gameInterval = setInterval(gameLoop, 1000 / 30);
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 3;
  ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * 2;
}

function stopGame() {
  clearInterval(gameInterval);
  rounds = 0;
  leftScore = 0;
  rightScore = 0;
  leftWon = 0;
  rightWon = 0;
  leftLoss = 0;
  rightLoss = 0;
  totalMatches = 0;
  roundDiv.textContent = `Round: ${rounds}`;
  scoreDiv.textContent = `${leftScore} - ${rightScore}`;
  leftWonDiv.textContent = leftWon;
  rightWonDiv.textContent = rightWon;
  leftLossDiv.textContent = leftLoss;
  rightLossDiv.textContent = rightLoss;
}

function gameLoop() {
  // Draw everything
  Draw();

  // Move the ball and paddles
  move();
}

// Draw function
function Draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddles and ball
  const paddleOffset = 20;
  const paddleWidth = 10;
  const paddleHeight = 100;
  const ballSize = 10;

  // Draw left paddle
  ctx.fillStyle = 'black';
  ctx.fillRect(paddleOffset, leftPaddleY, paddleWidth, paddleHeight);

  // Draw right paddle
  ctx.fillStyle = 'black';
  ctx.fillRect(canvas.width - paddleWidth - paddleOffset, rightPaddleY, paddleWidth, paddleHeight);

  // Draw ball (as a square)
  ctx.fillStyle = 'red';
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  // Draw center dotted line
  ctx.beginPath();
  ctx.setLineDash([5, 15]); // 5 pixels filled, 15 pixels empty
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.setLineDash([]); // Reset to solid line
}

startButton.addEventListener("click", function () {
  // Reset everything for a new game
  stopGame();
  rounds = 0;
  roundDiv.textContent = `Round: ${rounds}`;
  resetBall();
  gameInterval = setInterval(gameLoop, 1000 / 30);
});

// Draw init
Draw();