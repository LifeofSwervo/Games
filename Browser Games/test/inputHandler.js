
class inputHandler {
    constructor() {
        this.keys = []; // Array alllows tracking of multiple key presses
        window.addEventListener('keydown', event => {
            if((event.key === 'w' || 
                event.key === 's' ||
                event.key === 'ArrowUp' ||
                event.key === 'ArrowDown') 
                && this.keys.indexOf(event.key) === -1) {
                this.keys.push(event.key);        
            }
        });
        window.addEventListener('keydup', event => {
            if(event.key === 'w' || 
                event.key === 's' ||
                event.key === 'ArrowUp' ||
                event.key === 'ArrowDown')  {
                this.keys.splice(this.keys.indexOf(event.key, 1));        
            }
        });
    }


}