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


playerPaddle.draw()
enemyPaddle.draw()