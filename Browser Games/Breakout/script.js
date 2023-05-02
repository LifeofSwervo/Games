const canvas = document.getElementById('canvas');
const c = canvas.getContext("2d");

// Red Box
c.beginPath();
c.rect(20, 30, 50, 50);
c.fillStyle = "#FF0000";
c.fill();
c.closePath();


// Green Ball
c.beginPath();
c.arc(240, 160, 20, 0, Math.PI*2, false);
c.fillStyle = "green";
c.fill();
c.closePath();

c.beginPath();
c.rect(160, 10, 100, 40);
c.strokeStyle = "rgba(0, 0, 255, 0.5)";
c.stroke()
c.closePath();