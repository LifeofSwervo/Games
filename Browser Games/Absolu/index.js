// Becareful running this code, it's not optimized and may cause your browser to crash.



const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//console.log("Hello World!");

canvas.width = innerWidth;
canvas.height = innerHeight;

const startGameBtn = document.querySelector('#startGameBtn');
const modalEl = document.querySelector('#modalEl');
const pauseEl = document.querySelector('#PauseEl');
const resuemGameBtn = document.querySelector('#resumeGameBtn');

let isRunning = true;

// Pause Game on Escape key
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (pauseEl.style.display === 'none') { // If game is running
      // Pause the game
      pauseEl.style.display = 'flex';
      cancelAnimationFrame(animationId);
      isRunning = false;
    } else {
      pauseEl.style.display = 'none';
      // Resume the game
      if (!isRunning) {
        animationId = requestAnimationFrame(animate); 
        isRunning = true;
      }
    }
  }
});

console.log(pauseEl.style.display);

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

    x += camera.x;
    y += camera.y;

    const color = `hsl(${Math.random() * 360}, 50%, 50%)`; // Random color
    const angle = Math.atan2(player.y - y, player.x - x); // Angle of enemy to player
    const enemySpeed = 3; // Speed of enemy
    const velocity = 
    {
      x: Math.cos(angle) * enemySpeed, // Cosine of angle determines the x velocity
      y: Math.sin(angle) * enemySpeed // Sine of angle determines the y velocity
    }
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 500); // Spawn an enemy every second
}

// Projectile
let projectiles = [];

// Projectile event listener
addEventListener('click', (event) => 
{
  const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
  const speed = 6;
  const velocity = 
  {
    x: Math.cos(angle) * speed,
    y: Math.sin(angle) * speed
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

/*
  - Particle Code
*/
function particleCode() {
  particles.forEach((particle, particleIndex) => {
    if (Date.now() - particle.timeStamp > 300) {
      particles.splice(particleIndex, 1);
    } else {
      particle.update();
    }
  });
}

/*
  - Projectile code
*/
function projectileLogic() {
  projectiles.forEach((projectile, projectileIndex) => {
    const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
    if (dist - enemy.radius - projectile.radius < 1) {
      console.log('Hit');

      const PARTICLE_VELOCITY = 7.2;
      // Particle Explosion
      for (let i = 0; i < enemy.radius * 2; i++) {
        particles.push(new Particle(enemy.x - camera.x, enemy.y - camera.y, 3, enemy.color,
           {x: (Math.random() - 0.5) * (Math.random() * PARTICLE_VELOCITY), y: (Math.random() - 0.5) * (Math.random() * PARTICLE_VELOCITY)})) // Set Math.random() to create positive and negative numbers. 
      }

      // Min height check
      if (enemy.radius - 10 > 5) 
      {
        gsap.to(enemy, {
          radius: enemy.radius - 10
        })
      } else 
      {
        setTimeout(() => {
          enemies.splice(index, 1);
          projectiles.splice(projectileIndex, 1);
        }, 0);
      }
    }
  });
}

function enemyCode() {
  enemies.forEach((enemy, index) => {
    enemy.update();
    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    // End game if player and enemy collide
    if (distance - player.radius - enemy.radius < 1) {
      console.log('Game Over');
      enemies.splice(index, 1);
    }

    particleCode();

    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
      if (dist - enemy.radius - projectile.radius < 1) {
        console.log('Hit');

      const PARTICLE_VELOCITY = 7.2;
      // Particle Explosion
      for (let i = 0; i < enemy.radius * 2; i++) {
        particles.push(new Particle(enemy.x - camera.x, enemy.y - camera.y, 3, enemy.color,
           {x: (Math.random() - 0.5) * (Math.random() * PARTICLE_VELOCITY), y: (Math.random() - 0.5) * (Math.random() * PARTICLE_VELOCITY)})) // Set Math.random() to create positive and negative numbers. 
      }

        // Min height check
        if (enemy.radius - 10 > 5) 
        {
          gsap.to(enemy, {
            radius: enemy.radius - 10
          })
        } else 
        {
          setTimeout(() => {
            enemies.splice(index, 1);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      }
    });
  });
}

// Particles
const particles = [];

let animationId;
function animate() {
  animationId = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  camera.update(player);
  player.update();
  shoot();


  //console.log(enemies);
  
  // Draw a rectangle
  c.fillStyle = 'red';
  c.fillRect(50 - camera.x, 50 - camera.y, 100, 100);

  enemyCode();

  
};

// Start Game button
startGameBtn.addEventListener('click', () => {
  animate();
  spawnEnemies();
  modalEl.style.display = 'none';
  console.log(window.getComputedStyle(pauseEl).display);

});

// Resume Game button
resuemGameBtn.addEventListener('click', () => {
  pauseEl.style.display = 'none';
});