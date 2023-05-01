const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player
const player = new Player()
const projectiles = []
const grids = [new Grid()]

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

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height) // Black Background
    player.update()

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

    grids.forEach((grid) => {
        grid.update()
        grid.invaders.forEach((invader) => {
            invader.update({ velocity: grid.velocity })
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
        console.log(randomInterval)
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
            console.log(projectiles)
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