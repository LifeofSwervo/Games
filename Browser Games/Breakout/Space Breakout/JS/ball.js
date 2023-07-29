class Ball {
    constructor(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    movement() {
        this.x += this.dx;
        this.y += this.dy;

        // X screen constraint
        if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
        }

        // Y screen constraint 
        if (this.y + this.dy < this.radius) { // Top of Screen
            this.dy = -this.dy;
        } else if (this.y + this.dy > canvas.height - this.radius) { // Bottom 
            if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
                this.dy = -this.dy;
            } else {
                alert("Game Over");
                document.location.reload();
                clearInterval(interval); // Chrome Requirement
            }
        }
    }

    update() {
        this.draw();
        this.movement();
    }
}