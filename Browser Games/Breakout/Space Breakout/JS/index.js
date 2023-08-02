const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = []

// Stars on Screen
for (let i = 0; i < 100; i++) { // Creates 100 particles                                                                                                                                                                                  // Color or Invader hex color        
    particles.push(new Particle({ position: {x: Math.random() * canvas.width, y: Math.random() * canvas.height}, velocity: {x: 0, y: 0.3}, radius: Math.random() * 2, color: 'white'}))
}

const speed = 6;

let brickColumns = (Math.floor(canvas.width / 100))
const bricks = new Bricks(5, brickColumns, 75, 20, 23, 60, 60);

let score = 0;

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

function drawScore() {
    c.font = "26px Comic Sans MS";
    c.fillStyle = 'white';
    c.fillText(`Score: ${score}`, 20, canvas.height - 200)
}


function keyDownHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = true;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function runParticles() {
    particles.forEach((particle, i) => {

        if (particle.position.y - particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width
            particle.position.y = -particle.radius
        }

        if (particle.opacity <= 0) {
            setTimeout(() => {
                particles.splice(i, 1)
            }, 0)
        } else {
            particle.update()
        }
    })
}


// Player
const paddleHeight = 10;
const paddleWidth = 175;
const paddle = new Paddle((canvas.width - paddleWidth) / 2, canvas.height - paddleHeight, paddleWidth, paddleHeight, "#9047FF");

    // Player Movement
function playerMovement() {
    const speed = 15;
    if (rightPressed) {
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
let ballSpeed = 10;
const ball = new Ball((canvas.width - ballRadius) / 2, (canvas.height - ballRadius) / 2, ballRadius, 'white', ballSpeed, -ballSpeed)

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    runParticles();
    drawScore();
    bricks.update()
    ball.update();

    paddle.update();
    playerMovement();
}

const interval = setInterval(draw, 10)