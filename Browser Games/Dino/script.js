import { updateGround } from './ground.js' 

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30 


console.log('Hello World')

const worldElem = document.querySelector('[data-world]')

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)  // Size world to window on resize. 

let lastTime
function update(time) {
    // Account for when lastTime is 0
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }

    const delta = time - lastTime
    
    // Ground Update Loop
    updateGround(delta)

    lastTime = time
    window.requestAnimationFrame(update)
}

// Game Update Loop
window.requestAnimationFrame(update)


// Rescale world to resize
function setPixelToWorldScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }

    worldElem.style.width =  `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height =  `${WORLD_HEIGHT * worldToPixelScale}px`
}

