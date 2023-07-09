(function () {
    let isStart = false;
    let tetris = {
        board: [],
        boardDiv: null,
        canvas: null,
        pSize: 20,
        canvasHeight: 440,
        canvasWidth: 200,
        boardHeight: 0,
        boardWidth: 0,
        spawnX: 4,
        spawnY: 1,
        shapes: [
            [ // T
              [-1, 1],
              [0, 1],
              [1, 1],
              [0, 0],
            ],
            [ // Line
              [-1, 0],
              [0, 0],
              [1, 0],
              [2, 0],
            ],
            [
              // L El  
              [-1, -1],
              [-1, 0],
              [0, 0],
              [1, 0],
            ],
            [
              // R El  
              [1, -1],
              [-1, 0],
              [0, 0],
              [1, 0],
            ],
            [
              // R Ess  
              [0, -1],
              [1, -1],
              [-1, 0],
              [0, 0], 
            ],
            [
              // L Ess
              [-1, -1],
              [0, -1],
              [0, 0],
              [1, 0], 
            ],
            [
              // Square  
              [0, -1],
              [1, -1],
              [0, 0],
              [1, 0], 
            ],
        ],
        tempShapes: null,
        curShape: null, // Current Shape
        curShapeIndex: null, // Current Shape Index
        curX: 0,
        curY: 0,
        curSqs: [],
        nextShape: null,
        nextShapeDisplay: null,
        nextShapeIndex: null,
        sqs: [],
        score: 0,
        scoreDisplay: null,
        level: 1,
        levelDisplay: null,
        numLevels: 10,
        time: 0,
        maxTime: 1000,
        timeDisplay: null,
        isActive: 0,
        curComplete: false,
        timer: null,
        sTimer: null,
        speed: 700,
        lines: 0,

        // Init
        init: function () {
            isStart = true;
            this.canvas = document.getElementById('canvas');
            this.initBoard();
            this.initInfo();
        },

        // Initilize Board
        initBoard: function () {
            this.boardHeight = this.canvasHeight / this.pSize;
            this.boardWidth = this.canvasWidth / this.pSize;
            let s = this.boardHeight * this.boardWidth;

            for (let i = 0; i < s; i++) {
              this.board.push(0) // Push 0's into board array (until it equals sum of height * width)
            }
            //this.boardDiv = document.getElementById('board'); // For Debugging
        },

        // Initilizes display for next shape, scores, and lines. 
        initInfo: function () {
          this.nextShapeDisplay = document.getElementById('next_shape');
          this.levelDisplay = document
            .getElementById('level')
            .getElementsByTagName('span')[0];
          this.timeDisplay = document
            .getElementById('time')
            .getElementsByTagName('span')[0];
          this.scoreDisplay = document
            .getElementById('score')
            .getElementsByTagName('span')[0];
          this.linesDisplay = document
            .getElementById('lines')
            .getElementsByTagName('span')[0];

          // Calls setInfo method to initilize values.
          this.setInfo('time');
          this.setInfo('score');
          this.setInfo('level');
          this.setInfo('lines');
        },

        // Initilizes the game shapes. 
        initShapes: function() {
          this.curSqs = []; // Resets current squares array
          this.curComplete = false; // Indicates that the current shape is not complete
          this.shiftTempShapes(); // Shifts temp shape array
          this.curShapeIndex = this.tempShapes[0]; // Selects the new shape
          this.curShape = this.shapes[this.curShapeIndex]; // Sets the current shape to the selected shape
          this.initNextShapes();
          this.setCurCoords(this.spawnX, this.spawnY); // Sets coordinates
          this.drawShape(this.curX, this.curY, this.curShape);
        },

        // Initilizes the next shape by selecting the next shape from the temp shapes array.
        initNextShapes: function() {
          if (typeof this.tempShapes[1] === 'undefined') {
            this.initTempShapes();
          }
        },

        // initTemptShapes
        initTempShapes: function() {
          this.tempShapes = [];
          // Loop through shape array, adds each element to the new tempShapes Array
          for (let i = 0; i < this.shapes.length; i++) {
            this.tempShapes.push(i);
          }
          let k = this.tempShapes.length;
          while(--k) {
            // Fisher Yates Shuffle (Used to randomize the next shape.)
            let j = Math.floor(Math.random() * (k + 1));
            let tempk = this.tempShapes[k];
            let tempj = this.tempShapes[j];
            this.tempShapes[k] = tempk;
            this.tempShapes[j] = tempj;
          }
        },

        // Shifts elements out the tempShapes array. 
        shiftTempShapes: function() {
          try {
            if (
              typeof this.tempShapes === 'undefined' || // Checks if defined or null
              this.tempShapes === null
            ) {
              this.initTempShapes(); // If not defined calls initTempShapes
            } else {
              this.tempShapes.shift(); // Once defined calls shift method to remove 1st element
            }
          } catch (e) {
            throw new Error('Could not shift or init tempShapes: ' + e); // Provides error message explaining any errors
          }
        },

        // Initilizes the timer
        initTimer: function() {
          let me = this;
          let tLoop = function() {
            me.incTime(); // Calls function increasing game timer
            me.timer = setTimeout(tLoop, 2000);
          };
          this.timer = setTimeout(tLoop, 2000);
        },

        // Init Level Scores
        initLevelScores: function() {
          let c = 1; // Current level score
          for (let i = 1; i <= this.numLevels; i++) {
            this['level' + i] = [c * 1000, 40 * i, 5 * i]; // For next leve, row score, p score
            c = c + c;
          }
        },

        // Set information Function
        setInfo: function(el) { // Passes element in as argument
          this[el + 'Display'].innerHTML = this[el]; // Sets element's value to be displayed. 
        },

        // Draw next shape function
        drawNextShape: function() {
          let ns = []; // Next shape array.
          for (let i = 0; i < this.nextShape.length; i++) {
            // Finish this function.
          }
        },

        // Increases in game timer
        incTime: function() {
          this.time++;
          this.setInfo('time'); // Updates on screen timer info.
        },
    }
})