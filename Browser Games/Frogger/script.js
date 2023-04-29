// https://sites.santarosa.k12.fl.us/nhs/teacher_pages/arringtonpages/docs/FroggerTutorial.pdf

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

const frog = new Image(); frog.src = "frogger.png";

function drawBackground() {

// Grass Strips
c.fillStyle = 'lime';
c.fillRect(0, 220, 570, 45); // Top Strip
c.fillRect(0, 440, 570, 45); // Bottom Strip

// Road lines
    // Center Bottom Line (Dashed)
c.beginPath();
c.moveTo(0, 395);
c.lineTo(570, 395);
c.strokeStyle = "white"
c.setLineDash([5]);
c.strokeWidth = 2;
c.stroke();

    // Intersector line (solid)
c.beginPath();
c.moveTo(0, 350);
c.lineTo(570, 350);
c.strokeStyle = "white";
c.setLineDash([0]);
c.strokeWidth = 4;
c.stroke();

    // Center Top Line (Dashed)
c.beginPath();
c.moveTo(0, 305);
c.lineTo(570, 305);
c.strokeStyle = "white";
c.setLineDash([5]);
c.strokeWidth = 2;
c.stroke();

// Water
c.fillStyle = "blue";
c.fillRect(0, 0, 570, 220);
}

function draw() {
    drawBackground();

    requestAnimationFrame(draw);
}
draw();