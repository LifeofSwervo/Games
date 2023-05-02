function movementAssignment() {
    player.position.x += player.velocity.x
    player.position.y += player.velocity.y
}

class Player {
    constructor({position}) {
        this.velocity = {x: 0, y: 0}
        this.position = position
        this.width = (canvas.width / 10)
        this.height = (canvas.height / 60)
    }

    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        movementAssignment()
    }
}