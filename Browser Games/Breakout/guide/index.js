const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Red Square
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

// Green Circle - Player
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
ctx.fillStyle = 'green';
ctx.fill();
ctx.closePath();

// Frame
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();

function draw() {
    // Ball
    ctx.beginPath();
    ctx.arc(50, 50, 10, 0, Math.PI * 2, false);
    ctx.fillStyle = "#0095ZDD"; // Green
    ctx.fill();
    ctx.closePath();

}
// Calls draw loop every 10 milliseconds
setInterval(draw, 10)