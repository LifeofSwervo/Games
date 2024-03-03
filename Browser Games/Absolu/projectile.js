class Projectile 
{
    constructor(x, y, radius, color, velocity) 
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    
    update() 
    {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}