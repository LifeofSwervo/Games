const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = innerHeight
canvas.width = innerWidth

// Player and Enemy

    // Player
const playerPaddle = new Paddle({position: {x: canvas.width / 25, y: 0},})

    // Enemy
const enemyPaddle = new Enemy({position: {x: canvas.width / 1.07, y: 0},})
console.log(canvas.width)

// Player Movement 
addEventListener('keydown', (event) => {
    switch (event.key) { // Focus on [s] key
        case 's':
            // Go Down
            playerPaddle.velocity.y = 1
        break
        case 'w':
            // Go Up
            playerPaddle.velocity.y = -1
        break
        case 'a':
            // Go Left
        break
        case 'd':
            // Go Right    
    }   
    
})



function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    playerPaddle.update()
    enemyPaddle.update()
}

animate()