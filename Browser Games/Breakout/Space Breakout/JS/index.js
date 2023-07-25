const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const speed = 6;

// Player
const paddleHeight = 10;
const paddleWidth = 75;
const paddle = new Paddle((canvas.width / 2) - (paddleWidth / 2), canvas.height - (paddleHeight * 2), paddleWidth, paddleHeight, "#9047FF");

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    paddle.update()
}

draw()