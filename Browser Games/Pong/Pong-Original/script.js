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

// Collisions
function collisions() {
    // Ball & Player Collisions
    const ballLeftSide = ball.position.x + ball.velocity.x
    const ballBottomSide = ball.position.y + ball.height
    const ballRightSide = ball.position.x + ball.width + ball.velocity.x
    const ballTopSide = ball.position.y
  
    // Player Vars
    const playerRightSide = playerPaddle.position.x + playerPaddle.width;
    const playerTopSide = playerPaddle.position.y
    const playerBottomSide = playerPaddle.position.y + playerPaddle.height
    const playerLeftSide = playerPaddle.x 

    // Enemy Vars
    const enemyRightSide = enemyPaddle.position.x + enemyPaddle.width;
    const enemyTopSide = enemyPaddle.position.y;
    const enemyBottomSide = enemyPaddle.position.y + enemyPaddle.height;
    const enemyLeftSide = enemyPaddle.x
  
    // Ball & Player Collisions
    if ((ballBottomSide >= playerTopSide &&
        ballTopSide <= playerBottomSide &&
        ballLeftSide <= playerRightSide) || ballLeftSide <= 0) {
            // Collision
            ball.velocity.x = -ball.velocity.x
            console.log('test')
    }

    // Ball & Enemy Paddle Collisions
    if ((ballBottomSide >= enemyTopSide &&
        ballTopSide <= enemyBottomSide &&
        ballRightSide >= enemyLeftSide) || ballRightSide >= canvas.width) {
            // Collisions
            ball.velocity.x = -ball.velocity.x
            console.log('test2')
    };
};

function enemyAI() {
    const enemySpeed = 3
    if (ballBottomSide > enemyBottomSide) {
        // Go Down
        enemyPaddle.velocity.y = enemySpeed
    }

    if (ballTopSide < enemyTopSide) {
        // Go Up
        enemyPaddle.velocity.y = -enemySpeed
    }

    if (ball.position.y = enemyPaddle.position.y) {
        // Remain Still
        enemyPaddle.velocity.y = 0
    }
}


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

addEventListener('keyup', (event) => {
    const speed = 3;
    switch (event.key) {
        case 's':
            break
        case 'w':
            break   
    }
})




// Game Animation [Running updates of all different paddles]
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    collisions()
    
    playerPaddle.update()
    enemyPaddle.update()
    ball.update()
}

animate()