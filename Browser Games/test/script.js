// import { Player } from "./player";

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Center Line
const centerLine = new CenterLine(canvas.width / 2, 0)

// Player
const player = new Player(canvas.width / 25, 0);

// Ball
const ball = new Ball(canvas.width / 2, canvas.height / 2);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    ball.update()
    centerLine.update()
}


animate()