class Bricks {
    constructor(rows, columns, width, height, padding, offsetTop, offsetLeft) {
        this.rows = rows;
        this.columns = columns;
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.offsetTop = offsetTop;
        this.offsetLeft = offsetLeft;

        this.bricks = [];
        for (let col = 0; col < this.columns; col++) {
            this.bricks[col] = [];
            for (let r = 0; r < this.rows; r++) {
                this.bricks[col][r] = {x: 0, y: 0, status: 1}; // Status indicates if alive (1: Alive, 0: Dead)
            }
        }
    }

    draw() {
        // Draw Bricks
        for (let col = 0; col < this.columns; col++) {
            for (let r = 0; r < this.rows; r++) {
                if (this.bricks[col][r].status === 1) {
                    const brickX = col * (this.width + this.padding) + this.offsetLeft;
                    const brickY = r * (this.height + this.padding) + this.offsetTop;
                    this.bricks[col][r].x = brickX;
                    this.bricks[col][r].y = brickY;
                    c.beginPath();
                    c.rect(brickX, brickY, this.width, this.height);
                    c.fillStyle = "#9047FF";
                    c.fill();
                    c.closePath();
                }
            }
        }
    }

    collision() {
        for (let col = 0; col < this.columns; col++) {
            for (let r = 0; r < this.rows; r++) {
                const b = this.bricks[col][r]; // Bricks in grid
                if (b.status === 1) { // Logic for alive bricks
                    if (ball.x > b.x && ball.x < b.x + this.width && ball.y > b.y && ball.y < b.y + this.height) {
                        // If ball bouces off a brick
                        ball.dy = -ball.dy;
                        b.status = 0;
                        score++;
                        bounce++;
                        if (score === this.rows * this.columns) {
                            alert("You Win, Congratulations!!!");
                            document.location.reload();
                            clearInterval(interval); // Chrome Requirement
                        }
                    }
                }
            }
        }
    }

    update() {
        this.draw();
        this.collision();
    }
}