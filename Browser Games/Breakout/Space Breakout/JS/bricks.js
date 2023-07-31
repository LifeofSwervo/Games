class Bricks {
    constructor(rows, columns, width, height, padding, offsetTop, offsetLeft) {
        this.rows = rows;
        this.columns = columns;
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.offsetTop = offsetTop;
        this.offsetLeft = offsetLeft;
    }

    draw() {
        const bricks = [];
        for (let c = 0; c < this.columns; c++) {
            bricks[c] = [];
            for (let r = 0; r < this.rows; r++) {
                bricks[c][r] = {x: 0, y: 0, status: 1};
            }
        }
        

        // Draw Bricks
        for (let col = 0; col < this.columns; col++) {
            for (let r = 0; r < this.rows; r++) {
                if (bricks[col][r].status === 1) {
                    const brickX = col * (this.width + this.padding) + this.offsetLeft;
                    const brickY = r * (this.height + this.padding) + this.offsetTop;
                    bricks[col][r].x = brickX;
                    bricks[col][r].y = brickY;
                    c.beginPath();
                    c.rect(brickX, brickY, this.width, this.height);
                    c.fillStyle = "#9047FF";
                    c.fill();
                    c.closePath();
                }
            }
        }

        // Collision
        for (let col = 0; col < this.columns; col++) {
            for (let r = 0; r < this.row; r++) {
                const b = bricks[col][r]; // Bricks in grid
                if (b.status === 1) {
                    if (ball.x > b.x && ball.x < b.x + this.width && ball.y > b.y && ball.y < b.y + this.height) {
                        ball.dy = -ball.dy;
                        b.status = 0;
                        score++;
                        if (score === brickRowCount * this.columns) {
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
        this.draw()
    }
}