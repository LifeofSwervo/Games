
class CenterLine {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = canvas.height;
        this.color = 'white';
    };

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
    };

    update() {
        this.draw();
    };
};