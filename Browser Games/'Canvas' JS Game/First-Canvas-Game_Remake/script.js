
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const startGameBtn = document.querySelector('#startGameBtn')

const x = canvas.width / 2;
const y = canvas.height / 2;
const playerRadius = 10;
const player = new Player(x, y, 10, 'white');

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
}

animate()

// Start Game
startGameBtn.addEventListener('click', () => {
    animate()
    
})
