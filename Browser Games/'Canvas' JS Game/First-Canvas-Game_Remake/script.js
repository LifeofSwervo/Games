
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
 
const scoreElem = document.querySelector('#scoreElem');
const startGameBtn = document.querySelector('#startGameBtn');
const modalElem = document.querySelector('#modalElem')

const x = canvas.width / 2;
const y = canvas.height / 2;
const player = new Player(x, y, 10, 'white');

const enemies = [];

// Enemy Spawn Function
function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 4) + 4 // Radius of any value from 4 to 30
    
        let x;
        let y;
        if (Math.random() < 0.5) { // If Math.random() is less than 0.5 (50% of the time)
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius // If random value is less than 0.5 -> 0 - radius (30) is X otherwise ScreenWidth + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width // If random value is less than 0.5 -> 0 - radius (30) is X otherwise ScreenWidth + radius
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
        const velocity = {x: Math.cos(angle), y: Math.sin(angle)}
        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 1000)
}

let animationId
let score = 0
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();

    enemies.forEach((enemy) => {
        enemy.update()

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
    })
};

// Shooting Projectile 
addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - canvas.height /2, event.clientX - canvas.width / 2)
})

// Start Game
startGameBtn.addEventListener('click', () => {
    animate();
    spawnEnemies();
    console.log(enemies)
    modalElem.style.display = 'none';
});