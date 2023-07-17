const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Player
const player = new Player({ position: {x: canvas.width / 2, y: canvas.height / 2}, velocity: {x: 0, y: 0}, radius: 10, color: 'white'})

// Particles
particles = [];

// Stars on Screen
for (let i = 0; i < 100; i++) {
    particles.push(new Particle({position: {x: Math.random() * canvas.width, y: Math.random() * canvas.height}, 
    velocity: {x: 0, y: 0.3}, 
    radius: Math.random() * 2, 
    color: 'white'}))
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
}

animate()
