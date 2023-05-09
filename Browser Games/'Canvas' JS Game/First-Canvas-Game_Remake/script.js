
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
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius // If random value is less than 0.5 -> 0 - radius (30) is X otherwise ScreenWidth + radius
        }
    })
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
};

animate();

// Start Game
startGameBtn.addEventListener('click', () => {
    animate();
    modalElem.style.display = 'none';
});
