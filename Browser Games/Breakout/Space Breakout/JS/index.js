const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const speed = 6;

let brickColumns = (Math.floor(canvas.width / 100))
const bricks = new Bricks(5, brickColumns, 75, 20, 23, 30, 30);

// Keys
let rightPressed = false;
let leftPressed = false;
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);

// Key Functions
function keyUpHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = false;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = false;
    }
}
function keyDownHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = true;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = true;
    }
}


// Player
const paddleHeight = 10;
const paddleWidth = 175;
const paddle = new Paddle((canvas.width - paddleWidth) / 2, canvas.height - paddleHeight, paddleWidth, paddleHeight, "#9047FF");

    // Player Movement
function playerMovement() {
    if (rightPressed) {
        const speed = 7;
        paddle.x += speed; // Paddle goes right
        if (paddle.x + paddleWidth > canvas.width) {
            paddle.x = canvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddle.x -= speed; // Paddle goes left
        if (paddle.x <= 0) {
            paddle.x = 0;
        }
    }
}

// Ball
const ballRadius = 12.5;
let ballSpeed = 6;
const ball = new Ball((canvas.width - ballRadius) / 2, (canvas.height - ballRadius) / 2, ballRadius, 'white', ballSpeed, -ballSpeed)

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    bricks.update()
    ball.update();

    paddle.update();
    playerMovement();
}

const interval = setInterval(draw, 10)