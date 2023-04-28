// https://sites.santarosa.k12.fl.us/nhs/teacher_pages/arringtonpages/docs/FroggerTutorial.pdf

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

// Grass Strips
c.fillStyle = 'lime';
c.fillRect(0, 228, 570, 45); // Top Strip
c.fillRect(0, 440, 570, 45); // Bottom Strip

// Road lines
    // Center Bottom Line
c.beginPath()
c.moveTo(0, 395)
c.lineTo(570, 395)
c.strokeStyle = "white"
c.setLineDash([5]);
c.strokeWidth = 2;
c.stroke()
