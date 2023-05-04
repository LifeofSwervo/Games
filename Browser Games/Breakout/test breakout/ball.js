
class Ball {
    constructor() {
        this.position = {x: canvas.width / 2, y: canvas.height / 2};

        // Randomization of ball direction
        const direction = {
            x: Math.random() - 0.5 >= 0 ? -3 : 3, // If -0.5 to 0 returns -1, if 0 to 5 returns 1
            y: Math.random() - 0.5 >= 0 ? -3 : 3, // If -0.5 to 0 returns -1, if 0 to 5 returns 1
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
    }
}