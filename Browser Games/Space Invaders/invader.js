
class Invader {
    constructor({ position }) {
        this.velocity = {x: 0, y: 0}

        const image = new Image()
        image.src = './Assets/invader.png'
        image.onload = () => { // Call images as they load. 
            const scale = 1;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {x: position.x, y: position.y};
        };        
    };

    draw() {
        if (this.image) { // Only call image if it exist
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        }    
    }

    update({velocity}) {
        if (this.image) {
            this.draw()
            this.position.x += velocity.x
            this.position.y += velocity.y
        }
    }
}

class Grid {
    constructor() {
        this.position = {x: 0, y: 0};
        this.velocity = {x: 3, y: 0};
        this.invaders = [];

        // Create multiple
        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)

        this.width = columns * 30

        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(new Invader({position: {x: x * 30, y: y * 30}}))
            }
        }   
        console.log(this.invaders)
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        this.velocity.y = 0 // Maintain velocity of 0 (only changes upon if statement)

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x =  - this.velocity.x
            this.velocity.y = 30
        }
    }
}