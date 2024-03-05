class Projectile 
{
    constructor(x, y, radius, color, velocity, timeStamp) 
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.timeStamp = timeStamp;
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
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    }
}