import { Player } from './player.js'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = innerHeight
canvas.width = innerWidth

// Player
const player = new Player({position : {x: canvas.width / 25, y: 0}})

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
}

animate()