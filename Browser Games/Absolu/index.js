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
  projectiles.push(new Projectile(player.x + player.radius / 2, player.y + player.radius / 2, 5, 'red', velocity));
});

  // Shoot projectiles
function shoot() 
{
   // Update and draw projectiles
  projectiles.forEach((projectile, index) => 
  {
    projectile.update();
    if(projectile.x + projectile.radius < 0 || 
      projectile.x - projectile.radius > canvas.width || 
      projectile.y + projectile.radius < 0 || 
      projectile.y - projectile.radius > canvas.height) 
    {
      setTimeout(() => 
      {
        projectiles.splice(index, 1);
      }, 0);
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  camera.update(player);
  player.update();
  shoot();
  
  // Draw a rectangle
  c.fillStyle = 'red';
  c.fillRect(50 - camera.x, 50 - camera.y, 100, 100);
};



animate();
