const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let speed = 5

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    space: {
        pressed: false
    }

}



function movement() {
    // Movement
    addEventListener('keydown', ({ key }) => {
        switch (key) {
            case 'a':
                keys.a.pressed = true
                break
            case 'd':
                keys.d.pressed = true
                break
            case 'w':
                keys.w.pressed = true
                break
            case 's':
                keys.s.pressed = true
                break
            case ' ': // If space is pressed.
                projectiles.push(new Projectile({ // Push new Projectile into projectiles array
                    position: {x: player.position.x + (player.width / 2), y: player.position.y},
                    velocity: {x: 0, y: -10}
                }))
                break
        }   
        
    })

    // Stop Movement
    addEventListener('keyup', ({ key }) => {
        switch (key) {
            // Left and right
            case 'a':
                keys.a.pressed = false
                break
            case 'd':
                keys.d.pressed = false
                break
            case 'w':
                keys.w.pressed = false
                break
            case 's':
                keys.s.pressed = false
                break
            case ' ':
                break
        }
    })
}

function movementInConstraint() {

    if (keys.a.pressed && player.position.x >= 0) { // Constraint for left side of screen
        player.velocity.x = -speed
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) { // Constraint for right side of screen
        player.velocity.x = speed
    } else if (keys.w.pressed && player.position.y >= 50) { // Constraint for top of screen
        player.velocity.y = -speed
    } else if (keys.s.pressed && player.position.y + player.height <= canvas.height - 10) { // Constraint for bottom of screen
        player.velocity.y = speed
    } else {
        player.velocity.y = 0
        player.velocity.x = 0
    }
}

function drawProjectile() {
    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        } else {
            projectile.update()
        }
    })
    
}

// Player
const player = new Player()
const projectiles = []

// Animation 
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height) // Make Background Black
    player.update()

    drawProjectile()

    movementInConstraint()
}

animate()

// Movement
movement()