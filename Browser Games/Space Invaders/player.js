
class Player {
    constructor() {
        this.velocity = {x: 0, y: 0}
        this.rotation = 0

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
        
        c.save() // Used in rotation of ship
        c.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
        )

        c.rotate(this.rotation)

        c.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height / 2
        )
        
        if (this.image) { // Only call image if it exist
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        }    
        c.restore() // 
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}
