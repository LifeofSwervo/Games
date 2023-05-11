// import { Player } from "./player";

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const speed = 5
const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    }
}

function movementConstraint() {
    if (keys.w.pressed && player.y >= 0) {
        player.velocity.y = -speed
    } else if (keys.s.pressed && player.y + player.height <= canvas.height) {
        player.velocity.y = speed
    } else {
        player.velocity.y = 0
    }
}

function enemyMovement() {
    if (enemy.y + enemy.height <= ball.y + ball.radius) {
        enemy.velocity.y = speed
    } else if (enemy.y >= ball.y) {
        enemy.velocity.y = -speed
    } else {
        enemy.velocity.y = 0
    }
}

function movement() {
    addEventListener('keydown', ({ key }) => {
        switch (key) {
            case 'w':
                keys.w.pressed = true
                break
            case 's':
                keys.s.pressed = true
                break
        }
    })

    addEventListener('keyup', ({ key }) => {
        switch (key) {
            case 'w':
                keys.w.pressed = false
                break
            case 's':
                keys.s.pressed = false
                break
        }
    })

    movementConstraint()

}

function collisons() {
    if ((ball.y + ball.radius >= player.y &&
        ball.x <= player.x + player.width &&
        ball.y <= player.y + player.height) || ball.x <= 0) {
        ball.velocity.x = -ball.velocity.x
    }

    if ((ball.y + ball.radius >= enemy.y &&
        ball.x + ball.radius >= enemy.x &&
        ball.y <= enemy.y + enemy.height) || ball.x >= canvas.width) {
            ball.velocity.x = -ball.velocity.x
        }
}

// Center Line
const centerLine = new CenterLine(canvas.width / 2, 0)

// Player
const player = new Player(canvas.width / 35, 100);

// Enemy
const enemy = new Enemy(canvas.width / 1.07, 100)

// Ball
const ball = new Ball(canvas.width / 2, canvas.height / 2);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height)

    collisons()

    enemy.update()
    
    player.update()

    ball.update()

    centerLine.update() 

    enemyMovement()
    movement()
}

animate()