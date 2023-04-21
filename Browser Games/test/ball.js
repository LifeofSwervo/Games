class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;


        // Allow ball to spawn going in random direction
        const direction = { // Forces Math.random() to return either 1 or -1. (- or + choose directions)
            x: Math.random() - 0.5 >= 0 ? -1 : 1, // If -0.5 to 0 returns -1, if 0 to 5 returns 1
            y: Math.random() - 0.5 >= 0 ? -1 : 1 //  If -0.5 to 0 returns -1, if 0 to 5 returns 1
        }; 

        this.radius = 10;
        this.color = 'white';
        this.velocity = {x: direction.x, y: direction.y}; // Set velocity to direction determined by Math.random()
    };

    movement() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    collisions() {
        // X coordinate constraint
        if (this.x + this.radius + this.velocity.x >= canvas.width || this.x + this.radius + this.velocity.x <= 0) {
            this.velocity.x = -this.velocity.x
        }
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill()
    };

    update() {
        this.draw();
        this.movement();
        this.collisions();
    };

};