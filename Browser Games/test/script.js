// import { Player } from "./player";

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scoreElem = document.getElementById('scoreElem')
const enemyScoreElem = document.getElementById('enemyScoreElem')

const speed = 6
const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    }
}

// Center Line
const centerLine = new CenterLine(canvas.width / 2, 0)

// Player
const player = new Player(canvas.width / 80, 100);
let playerScore = 0

// Enemy
const enemy = new Enemy(canvas.width / 1.02, 100)
let enemyScore = 0

// Ball
const ball = new Ball(canvas.width / 2, canvas.height / 2);

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
    if (ball.y + ball.radius >= player.y &&
        ball.x <= player.x + player.width &&
        ball.y <= player.y + player.height) {
        ball.velocity.x = -ball.velocity.x
    }

    if (ball.y + ball.radius >= enemy.y &&
        ball.x + ball.radius >= enemy.x &&
        ball.y <= enemy.y + enemy.height) {
        ball.velocity.x = -ball.velocity.x
    }

    if (ball.x <= 0) {
        ball.x = canvas.width / 2;
        enemyScore += 1;
        enemyScoreElem.innerHTML = enemyScore
    };

    if (ball.x >= canvas.width) {
        ball.x = canvas.width / 2;
        playerScore += 1;
        scoreElem.innerHTML = playerScore;
        
    }
}

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