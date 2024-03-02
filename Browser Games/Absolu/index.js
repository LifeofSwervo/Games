const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//console.log("Hello World!");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Player info
const player = new Player(0, 0, 30, 'white');

let camera = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  update: function(player) {
      // Keep the player in the center of the screen
      this.x = player.x - this.width / 2;
      this.y = player.y - this.height / 2;
  }
};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  camera.update(player);
  player.update();

  // Draw a rectangle
  c.fillStyle = 'red';
  c.fillRect(50 - camera.x, 50 - camera.y, 100, 100);
};

// Event listeners for player movement
window.addEventListener('keydown', function(e) {
  switch(e.key) {
    case 'ArrowLeft':
      player.moveLeft();
      break;
    case 'ArrowRight':
      player.moveRight();
      break;
    case 'ArrowUp':
      player.moveUp();
      break;
    case 'ArrowDown':
      player.moveDown();
      break;
  }
});

window.addEventListener('keyup', function(e) {
  switch(e.key) {
    case 'ArrowLeft':
    case 'ArrowRight':
      player.stopX();
      break;
    case 'ArrowUp':
    case 'ArrowDown':
      player.stopY();
      break;
  }
});

animate();
