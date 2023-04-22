
class Player {
    constructor() {
        this.velocity = {x: 0, y: 0}

        const image = new Image()
        image.src = './Assets/spaceship.png'
        image.onload = () => { // Call images as they load. 
           const scale = 0.15;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {x: canvas.width / 2 - this.width / 2, y: canvas.height - this.height -  20};
        };        
    };

    draw() {
        //c.fillStyle = 'red';
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        if (this.image) { // Only call image if it exist
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
            
        }    
    }

    update() {
        this.draw()
    }
}
