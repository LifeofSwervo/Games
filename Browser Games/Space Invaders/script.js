const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player
const player = new Player()
const projectiles = []
const grids = []
const invaderProjectiles = []
const particles = []

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}
let speed = 5

let frames = 0
let randomInterval = Math.floor(Math.random() * 500 + 500)

// Stars on Screen
for (let i = 0; i < 100; i++) { // Creates 15 particles                                                                                                                                                                                  // Color or Invader hex color        
    particles.push(new Particle({ position: {x: Math.random() * canvas.width, y: Math.random() * canvas.height}, velocity: {x: 0, y: 0.3}, radius: Math.random() * 2, color: 'white'}))
}

function createParticles({object, color, fades}) {
    for (let i = 0; i < 15; i++) { // Creates 15 particles                                                                                                                                                                                  // Color or Invader hex color        
        particles.push(new Particle({ position: {x: object.position.x + object.width / 2, y: object.position.y + object.height / 2}, velocity: {x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2}, radius: Math.random() * 3, color: color || '#BAA0DE', fades: true}))
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height) // Black Background
    player.update()
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
    invaderProjectiles.forEach((invaderProjectile, index) => {
        // Invader Projectile Screen Constraint
        if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1)
            }, 0)
        } else invaderProjectile.update()

        // Lose Condition (if Invader Projectile hits player)
        if (invaderProjectile.position.y + invaderProjectile.height >= player.position.y &&
            invaderProjectile.position.x + invaderProjectile.width >= player.position.x &&
            invaderProjectile.position.x <= player.position.x + player.width ) {
            console.log('You Lost!')

            setTimeout(() => {
                invaderProjectiles.splice(index, 1)
            }, 0)
            createParticles({ object: player, color: 'white', fades: true})
        }
    })
    

    // Projectile Loop
    projectiles.forEach((projectile, index) => { // For each required to initiate projectile loop
        if (projectile.position.y + projectile.radius <= 0) { // If required to collect garbage assets (out of bounds projectiles)
            setTimeout(() => { // Gets rid of flashing
                projectiles.splice(index, 1)
            }, 0) 
        } else {
            projectile.update() // Draw Projectile
        }
    })

    grids.forEach((grid, gridIndex) => {
        grid.update()

        // Spawn Projectiles
        if (frames % 100 === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
                invaderProjectiles
            )
        }

        grid.invaders.forEach((invader, i) => {
            invader.update({ velocity: grid.velocity })

            // Projectile and invader collision
            projectiles.forEach((projectile, j) => {
                if (projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
                    projectile.position.x + projectile.radius >= invader.position.x &&
                    projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
                    projectile.position.y + projectile.radius >= invader.position.y) {
                    

                    setTimeout(() => {
                        const invaderFound = grid.invaders.find((invader2) => invader2 === invader)
                        const projectileFound = projectiles.find((projectile2) => projectile2 === projectile)
                        
                        // remove Invader and Projectile
                        if (invaderFound && projectileFound) {
                            // Particles on death
                            createParticles({ object: invader, fades: true})
                            grid.invaders.splice(i, 1)
                            projectiles.splice(j, 1)

                            if (grid.invaders.length > 0) {
                                const firstInvader = grid.invaders[0]
                                const lastInvader = grid.invaders[grid.invaders.length - 1]

                                grid.width = 
                                    lastInvader.position.x - 
                                    firstInvader.position.x + 
                                    lastInvader.width
                                grid.position.x = firstInvader.position.x
                            } else {
                                grids.splice(gridIndex, 1)
                            }
                        }
                    }, 0)
                }
            })
        })
    })

    // Player Movement and Rotation (rotation on movement for visual effect)
    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -speed
        player.rotation = -0.15
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = speed
        player.rotation = 0.15
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }

    // Spawns Grids in intervals
    if (frames % randomInterval === 0) {
        grids.push(new Grid())
        let randomInterval = Math.floor(Math.random() * 500 + 500)
        frames = 0
    }


    frames++
}

animate()

// Movement 
addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = true
        case 'd':
            keys.d.pressed = true
            break
        case ' ':
            projectiles.push(new Projectile({
                position: {x: player.position.x + (player.width / 2), y: player.position.y},
                velocity: {x: 0, y: -10}
            }))
            break
    }
})

// Check to stop movement of ship
addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = false
        case 'd':
            keys.d.pressed = false
            break
        case ' ':
            break
    }
})