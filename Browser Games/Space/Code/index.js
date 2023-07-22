const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Player
const player = new Player({ position: {x: canvas.width / 2, y: canvas.height / 2}, velocity: {x: 0, y: 0}, radius: 10, color: 'white'})

// Enemies
const enemies = [];


// Particles
particles = [];

// Projectile
projectiles = [];


// Click event listeners
addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2)
    const velocity = {x: Math.cos(angle) * 5, y: Math.sin(angle) * 5}
    projectiles.push(
        new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', velocity)
    )
})

// Stars on Screen
for (let i = 0; i < 100; i++) {
    particles.push(new Particle({position: {x: Math.random() * canvas.width, y: Math.random() * canvas.height}, 
    velocity: {x: 0, y: 0.3}, 
    radius: Math.random() * 2, 
    color: 'white'}))
}

// Spawns enemies at 1 second intervals
function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 4) + 4 // Create radius as any value from 4 to 30

        let x;
        let y;
        // If (Math.Random()) radius returned less than 0.5
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius // if random value is less than 0.5 -> 0 - radius(30) is x otherwise screenWidth + radius 
            y = Math.random() * canvas.height
        } else {
            x = 0 // Keeps enemies from spanwing along width (Locked to left and right)
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
        const velocity = {x: Math.cos(angle), y: Math.sin(angle)}
        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 1000) 
}

function runParticles() {
    particles.forEach((particle, i) => {

        if (particle.position.y - particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width
            particle.position.y = -particle.radius
        }

        if (particle.opacity <= 0) {
            setTimeout(() => {
                particles.splice(i, 1)
            }, 0)
        } else {
            particle.update()
        }
    })
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    runParticles()
    player.update()

    enemies.forEach((enemy, index) => {
        enemy.update()   
    })

    projectiles.forEach((projectile, index) => {
        projectile.update()
    })
}

animate()
spawnEnemies()
