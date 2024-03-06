// Becareful running this code, it's not optimized and may cause your browser to crash.



const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//console.log("Hello World!");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Player info
const player = new Player(0, 0, 30, 'white');

// Camera info
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

const enemies = [];

function spawnEnemies() 
{
  setInterval(() => {
    const radius = Math.random() * (15 - 7) + 7; // Enemies radius range from 7 to 15
    let x;
    let y;
    // If random value is less than 0.5; Left edge (of screen) is x otherwise the Right edge is the spawn point.
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height; // Y will be a random value between 0 and bottom of screen
      // (As the x value ensure's enemies spawn on the edge, the y value randomizes the game a bit)
    } else {
      // If Math.random() returns more than 0.5
      x = Math.random() * canvas.width; // X will be a random value between 0 and right edge of screen
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius; // If random is less than 0.5, the y will be (slightly above screen) or (slight below screen)
    }
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`; // Random color
    const angle = Math.atan2(player.y - y, player.x - x); // Angle of enemy to player
    const velocity = 
    {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000); // Spawn an enemy every second
}

// Projectile
let projectiles = [];
  // Projectile event listener
addEventListener('click', (event) => 
{
  const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
  const velocity = 
  {
    x: Math.cos(angle),
    y: Math.sin(angle)
  }
  projectiles.push(new Projectile(player.x + player.radius / 2,
   player.y + player.radius / 2, 5,
    'white', velocity, Date.now()));
});

  // Shoot projectiles
function shoot() {
  // Update and draw projectiles
  projectiles.forEach((projectile, index) => {
    projectile.update();
    if (Date.now() - projectile.timeStamp > 7000) { // Check if 7 seconds have passed
      projectiles.splice(index, 1);
    }
  });
};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  camera.update(player);
  player.update();
  shoot();
  
  // Draw a rectangle
  c.fillStyle = 'red';
  c.fillRect(50 - camera.x, 50 - camera.y, 100, 100);
  spawnEnemies();
  enemies.forEach((enemy, index) => {
    enemy.update();
    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (distance - player.radius - enemy.radius < 1) {
      console.log('Game Over');
      enemies.splice(index, 1);
    }
  });
};



animate();
