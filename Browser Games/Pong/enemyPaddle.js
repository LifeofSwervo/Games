
class Enemy {
    constructor({position}) {
        this.position = position
        this.velocity = {x: 0, y: 0}
        this.width = 10
        this.height = 100
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

    }
}