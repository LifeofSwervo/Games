import { updateBird, setupBird, getBirdRect } from './bird.js'

document.addEventListener("keypress", handleStart, { once: true }) // Demo uses Keypress, due to issues best practice is {keyup, keydown}
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

let lastTime
function updateLoop(time) {
    // Skip first render then render from there
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime
    updateBird(delta)
    if (checkLose()) return handleLose()
    lastTime = time
    window.requestAnimationFrame(updateLoop) // Loops game (better than performance than setInterval())
}


function checkLose() {
    const birdRect = getBirdRect()
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight 
    return outsideWorld
}

function handleStart() {
    title.classList.add("hide") // Hides "Press Any Key to start"
    setupBird()
    window.requestAnimationFrame(updateLoop)
}

function handleLose() {
    setTimeout(() => { // Set timeout allows for delay (stopping accidential restarts)
        title.classList.remove("hide")
        subtitle.classList.remove("hide")
        subtitle.textContent = "0 pipes"
        document.addEventListener("keypress", handleStart, { once: true })
    }, 100)
}