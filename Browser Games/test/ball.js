const SPEED = 5;

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bounce = 0

        const ballSpeed = 1.5
        // Allow ball to spawn going in random direction
        const direction = { // Forces Math.random() to return either ballSpeed or -ballSpeed. (- or + choose directions)
            x: Math.random() - 0.5 >= 0 ? -ballSpeed : ballSpeed, // If -0.5 to 0 returns -ballSpeed, if 0 to 5 returns ballSpeed
            y: Math.random() - 0.5 >= 0 ? -ballSpeed : ballSpeed //  If -0.5 to 0 returns -ballSpeed, if 0 to 5 returns ballSpeed
        }; 

        this.radius = 10;
        this.color = 'white';
        this.velocity = {x: direction.x + SPEED, y: direction.y + SPEED}; // Set velocity to direction determined by Math.random()
    };

    movement() {
        this.x += this.velocity.x; 
        this.y += this.velocity.y;
    }

    collisions() {
        // X coordinate constraint
        if (this.x + this.radius + this.velocity.x >= canvas.width || this.x + this.radius + this.velocity.x <= 0) {
            this.bounce += 1
            //console.log(this.bounce)
        };

        // y Coordinate Constraint
        if (this.y + this.radius + this.velocity.y >= canvas.height || this.y + this.radius + this.velocity.y <= 0) {
            this.velocity.y = -this.velocity.y
            this.bounce += 1
            //console.log(this.bounce)
        };
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