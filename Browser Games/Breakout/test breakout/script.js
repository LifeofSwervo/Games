const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Keys (automatically keys are not pressed)
const keys = {
    a: { // Left 
        pressed: false
    },
    d: { // Right
        pressed: false
    }
}

const player_x_position = canvas.width / 2
const player_y_position = canvas.height - (canvas.height / 8)
const player = new Player({position: {x: player_x_position, y: player_y_position}})
const playerSpeed = 5

function movementEventListeners() {
    addEventListener('keydown', ({ key }) => {
        switch (key) {
            case 'a':
                keys.a.pressed = true
                break
            case 'd':
                keys.d.pressed = true
                break
        }
    })

    
}

function movement() {
    if (player.position.x >= 0 && keys.a.pressed) {
        player.velocity.x = -playerSpeed
    }
    movementEventListeners()
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function animate() {
    requestAnimationFrame(animate)
    resize()
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    movement()
}

animate()

