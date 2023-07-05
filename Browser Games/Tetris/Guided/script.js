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
          this.setInfo('time');
          this.setInfo('score');
          this.setInfo('level');
          this.setInfo('lines');
        },
        initShapes: function() {
          this.curSqs = [];
          this.curComplete = false;
          //this.shiftTempShapes(); // Create this function
        },
        // Set information Function
        setInfo: function(el) { // Passes element in as argument
          this[el + 'Display'].innerHTML = this[el]; // Sets element's value to be displayed. 
        },
    }
})