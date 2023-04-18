// Helper Functions

export function getCustomProperty(elem, prop) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0 // Returns float of CSS values selected element. If no value returns 0.
}

export function setCustomProperty(elem, prop, value) {
    elem.style.setProperty(prop, value)
}

export function incrementCustomProperty(elem, prop, inc) {
    setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)
}