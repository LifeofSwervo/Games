
class Invader {
    constructor() {
        this.velocity = {x: 0, y: 0}

        const image = new Image()
        image.src = './Assets/invader.png'
        image.onload = () => { // Call images as they load. 
            const scale = 1;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {x: canvas.width / 2 - this.width / 2, y: canvas.height / 2};
        };        
    };

    draw() {
        if (this.image) { // Only call image if it exist
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        }    
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
}

class Grid {
    constructor() {
        this.position = {x: 0, y: 0};
        this.velocity = {x: 0, y: 0};
        this.invaders = [new Invader()];
    }

    update() {
        
    }
}