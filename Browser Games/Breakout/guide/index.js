const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Keys
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
let leftPressed = false;
let rightPressed = false;


// Ball Variables
let x = canvas.width / 2;
let y = canvas.height - 30;
let ballRadius = 10;
let dx = 2;
let dy = -2

// Player Variables
const paddleHeight = 10;
const paddleWidth = 75;
paddleX = (canvas.width - paddleWidth) / 2;

function ballConstraint() {
    // Ball Constrainsts
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { // x axis constraint
        dx = -dx
    }

    if (y + dy < ballRadius) {
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) { // y axis constraint
        alert("Game Over");
        document.location.reload();
        clearInterval(interval); // Chrome requirement
    }
}

// Key Functions
function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "#0095DD"; // Blue
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle()
    drawBall()

    ballConstraint()

    // Player Constraint
    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    // Assign ball movement
    x += dx;
    y += dy;

}
// Calls draw loop every 10 milliseconds
const interval = setInterval(draw, 10)