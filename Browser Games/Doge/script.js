window.addEventListener('load', function(){ 
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 720;

    class InputHandler {
        constructor() {
            this.keys = []; // Array allows tracking of multiple key presses
            window.addEventListener('keydown', e => { // Use of (=>) rather than (function(e)) allow lexicol scoping of (defining key pressed to (this.)).
                console.log(e.key);
                if ((e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' || 
                    e.key === 'ArrowRight' ||
                    e.key === 'ArrowLeft')
                    && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
                }
            });
            window.addEventListener('keyup', e => {
                if (e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' || 
                    e.key === 'ArrowRight' ||
                    e.key === 'ArrowLeft') { 
                this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }

    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = (this.gameHeight - this.height);
            this.image = document.getElementById('playerImage')
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0;
        }

        draw(context){
            context.fillStyle = 'white';
            context.fillRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }

        update(input) {
            // horizontal movement
            this.x += this.speed;
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;
            } else {
                this.speed = 0;
            }

            // Screen Constraint
            if (this.x < 0) {
                this.x = 0
            } else if (this.x > this.gameWidth - this.width) {
                this.x = this.gameWidth - this.width
            }

        }
    }

    class Background {

    }

    class Enemy {

    }

    function handleEnemies() {

    }

    function displayStatusText() {

    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    
    

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw(ctx);
        player.update(input);
        requestAnimationFrame(animate);
    }
    animate()++;
});