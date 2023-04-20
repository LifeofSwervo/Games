
class Ball {
    constructor({position}) {
        this.position = position;

        // Randomization of ball direction (On Reset)
        const direction = {
            x: Math.random() - 0.5 >= 0 ? -1 : 1, // If -0.5 to 0 returns -1, if 0 to 5 returns 1
            y: Math.random() - 0.5 >= 0 ? -1 : 1, //  If -0.5 to 0 returns -1, if 0 to 5 returns 1
        };

        this.velocity = {x: direction.x, y: direction.y};
        this.width = 10;
        this.height = 10;
    }

    draw() {
        c.fillStyle = 'white';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    collisions() {
        // x coordinate screen constraint
        if (this.position.x + this.width + this.velocity.x >= canvas.width || this.position.x + this.width + this.velocity.x <= 0) {
            this.velocity.x = -this.velocity.x
        }

        // y coordinate screen constraint
        if (this.position.y + this.height + this.velocity.y >= canvas.height || this.position.y + this.height + this.velocity.y <= 0) {
            this.velocity.y = -this.velocity.y
        }

    }

    update() {
        this.draw();

        this.collisions();
        

        // Movement
        this.position.x += this.velocity.x; // Aligns x velocity to ball position.
        this.position.y += this.velocity.y; // Aligns y veloctiy to ball position.
    }
}

