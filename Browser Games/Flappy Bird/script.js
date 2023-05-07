import { updateBird, setupBird } from './bird.js'

document.addEventListener("keypress", handleStart, { once: true }) // Demo uses Keypress, due to issues best practice is {keyup, keydown}
const title = document.querySelector("[data-title]")


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
    lastTime = time
    window.requestAnimationFrame(updateLoop) // Loops game (better than performance than setInterval())
}

function handleStart() {
    title.classList.add("hide") // Hides "Press Any Key to start"
    setupBird()
    window.requestAnimationFrame(updateLoop)
}

function handleLose() {

}