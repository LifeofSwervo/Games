
class Paddle {
    constructor({position}) {
        this.position = position;
        this.velocity = {x: 0, y: 0};
        this.width = 10;
        this.height = 100;
    }

    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

    }

    update() {
        this.draw()
        
        if (this.position.y + this.velocity.y > 0 && this.position.y + this.height + this.velocity.y < canvas.height) // If player remains in screen contraints
            this.position.y += this.velocity.y; // Movement

    }
}

