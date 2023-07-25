const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let score = 0;

// Keys
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
let leftPressed = false;
let rightPressed = false;

// Brick Field
const brickRowCount = 3; 
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30


const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}
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

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r]; // Bricks in grid
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert("You Win, Congratulations!!!");
                        document.location.reload();
                        clearInterval(interval); // Chrome Requirement
                    }
                }
            }
        }
    }
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function ballConstraint() {
    // Ball Constrainsts
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { // x axis constraint
        dx = -dx
    }

    if (y + dy < ballRadius) {
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) { // y axis constraint
        if (x > paddleX && x < paddleX + paddleWidth) { // Paddle Collision
            dy = -dy;
        } else {
        alert("Game Over");
        document.location.reload();
        clearInterval(interval); // Chrome requirement
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "0095DD";
    ctx.fillText(`Score ${score}`, 8, 20);
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

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
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

    collisionDetection()
    drawScore()
    drawBricks()

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