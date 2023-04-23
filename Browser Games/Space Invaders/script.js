const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player
const player = new Player()
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

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height) // Black Background
    player.update()
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
}

animate()

// Movement 
addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            console.log('left')
            keys.a.pressed = true
        case 'd':
            console.log('right')
            keys.d.pressed = true
            break
        case ' ':
            console.log('Space')
            break
    }
})

// Check to stop movement of ship
addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            console.log('left')
            keys.a.pressed = false
        case 'd':
            console.log('right')
            keys.d.pressed = false
            break
        case ' ':
            console.log('Space')
            break
    }
})