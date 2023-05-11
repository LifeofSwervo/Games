
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 100;
        this.color = 'red';
        this.velocity = {x: 0, y: 0};
    };

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
    };

    movement() {
        // Movement if statement
    }

    update() {
        this.draw();
        this.movement();

        this.y += this.velocity.y
    };
};

