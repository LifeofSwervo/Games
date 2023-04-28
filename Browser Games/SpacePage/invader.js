
class Invader {
    constructor() {
        this.velocity = {x: 0, y: 0};

        const image = new Image()
        image.src = 'Assets/invader.png'
        image.onload = () => { // Call image after loading 
            this.image = image;
            this.width = image.width;
            this.height = image.height
            this.position = {x: canvas.width / 2, y: canvas.height / 2}

        }
    }

    draw() {
        if (this.image) { // Calls image (only if it exist).
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        }
    }

    update() {
        if (this.image) {
            this.draw()
        }
    }
}

class Grid {
    constructor() {
        this.position = {x: 0, y: 0}
        this.velocity = {x: 0, y: 0}
        this.invaders = [new Invader()]
    }

    update() {
        
    }
}