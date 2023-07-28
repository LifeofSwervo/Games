const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const speed = 6;

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
const paddleWidth = 75;
paddleX = (canvas.width - paddleWidth) / 2;
const paddle = new Paddle(paddleX, canvas.height - (paddleHeight * 5), paddleWidth, paddleHeight, "#9047FF");



    // Player Movement
function playerMovement() {
    
}

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    paddle.update();
    if (rightPressed) {
        paddle.x += 7; // Paddle goes right
        if (paddle.x + paddleWidth > canvas.width) {
            paddle.x = canvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddle.x -= 7; // Paddle goes left
        if (paddle.x <= 0) {
            paddle.x = 0;
        }
    }
}

const interval = setInterval(draw, 10)