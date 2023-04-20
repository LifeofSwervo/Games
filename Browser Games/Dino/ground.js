import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.05
const groundElems = document.querySelectorAll("[data-ground]")

export function setupGround() {
    setCustomProperty(groundElems[0], "--left", 0) // Selects 1st ground elem
    setCustomProperty(groundElems[1], "--left", 300) // Selects 2nd ground elem; Makes Ground elem 2x the space 
}


export function updateGround(delta) {
    groundElems.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * SPEED * -1)

        if (getCustomProperty(ground, "--left") <= -300) {
            incrementCustomProperty(ground, "--left", 600)
        }
    })
}