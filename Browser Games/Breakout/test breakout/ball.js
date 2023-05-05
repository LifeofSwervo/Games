
class Ball {
    constructor() {
        this.position = {x: canvas.width / 2, y: canvas.height / 2};

        // Randomization of ball direction
        const direction = {
            x: Math.random() - 0.5 >= 0 ? -2 : 2, // If -0.5 to 0 returns -2, if 0 to 5 returns 2
            y: Math.random() - 0.5 >= 0 ? -2 : 2, // If -0.5 to 0 returns -2, if 0 to 5 returns 2
        };
        
        this.velocity = {x: direction.x, y: direction.y};
        this.radius = canvas.width / 100;
        this.color = 'white';
    }

    movement() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    collision() {
        if (this.position.x <= 0 || 
            this.position.x >= canvas.width) {
            this.velocity.x = -this.velocity.x
        }

        // Y coord
        if (this.position.y + this.radius <= 0  || 
            this.position.y + this.radius + this.velocity.y >= canvas.height) {
            this.velocity.y = -this.velocity.y
        }
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill()
    }

    update() {
        this.draw();
        this.movement()
        this.collision()
    }
}