


class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        //this.image
        this.radius = 10;
        this.color = 'white';
    };

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };

    update() {
        this.draw();
    };

};

