class Player 
{
    constructor(x, y, radius, color) 
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = 3;
        this.dx = 0; // Change in x
        this.dy = 0; // Change in y

        // Event listeners for player movement
        window.addEventListener('keydown', function(e) {
            switch(e.key) {
            case 'ArrowLeft':
            case 'a':
                player.moveLeft();
                break;
            case 'ArrowRight':
            case 'd':
                player.moveRight();
                break;
            case 'ArrowUp':
            case 'w':
                player.moveUp();
                break;
            case 'ArrowDown':
            case 's':
                player.moveDown();
                break;
            }
        });
        
        window.addEventListener('keyup', function(e) {
            switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'a':
            case 'd':
                player.stopX();
                break;
            case 'ArrowUp':
            case 'ArrowDown':
            case 'w':
            case 's':
                player.stopY();
                break;
            
            }
        });
    }

    draw() 
    {
        c.beginPath();
        c.arc(this.x - camera.x, this.y - camera.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    }

    update() 
    {
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    moveLeft() {
        this.dx = -this.speed;
    }

    moveRight() {
        this.dx = this.speed;
    }

    moveUp() {
        this.dy = -this.speed;
    }

    moveDown() {
        this.dy = this.speed;
    }

    stopX() {
        this.dx = 0;
    }

    stopY() {
        this.dy = 0;
    }
}