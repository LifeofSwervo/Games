const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let speed = 5

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }

}



function movement() {
    // Movement
    addEventListener('keydown', ({ key }) => {
        switch (key) {
            case 'a':
                keys.a.pressed = true
            case 'd':
                keys.d.pressed = true
                break
        }
    })

    // Stop Movement
    addEventListener('keyup', ({ key }) => {
        switch (key) {
            case 'a':
                keys.a.pressed = false
            case 'd':
                keys.d.pressed = false
                break
        }
    })
}

function movementInConstraint() {
    if (keys.a.pressed && player.position.x >= 0) { // Constraint for left side of screen
        player.velocity.x = -speed
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = speed
    } else {
        player.velocity.x = 0
    }
}

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Player
const player = new Player()

// Animation 
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height) // Make Background Black
    player.update()

    movementInConstraint()
}

animate()

// Movement
movement()