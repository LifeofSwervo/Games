const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = innerHeight
canvas.width = innerWidth

// Player, Enemy and Ball

    // Player
const playerPaddle = new Paddle({position: {x: canvas.width / 25, y: 0},})

    // Enemy
const enemyPaddle = new Enemy({position: {x: canvas.width / 1.07, y: 0},})
console.log(canvas.width)

    // Ball
const ball = new Ball({position: {x: canvas.width / 2, y: canvas.height / 2}});




// Player Movement 
addEventListener('keydown', (event) => {
    const speed = 3
    switch (event.key) { // Focus on [s] key
        case 's':
            // Go Down
            playerPaddle.velocity.y = speed
            break
        case 'w':
            // Go Up
            playerPaddle.velocity.y = -speed
            break
    }   
})


// Game Animation [Running updates of all different paddles]
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    playerPaddle.update()
    enemyPaddle.update()

    ball.update()
}

animate()