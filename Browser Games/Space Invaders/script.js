const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player()


function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height) // Black Background
    player.update()
}

animate()

// Movement 
addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            console.log('left')
            break
        case 'd':
            console.log('right')
            break
        case ' ':
            console.log('Space')
            break
    }
})