// image file names based on number
const NUMTOIMAGE = {
    2: "c",
    4: "cpp",
    8: "csharp",
    16: "php",
    32: "rust",
    64: "ruby",
    128: "swift",
    256: "java",
    512: "python",
    1024: "ts",
    2048: "js"
};

// sets constants for image displaying
const SIZEMULTIPLIER = 110;
const SIZEINCREMENT = 10;

// sets the time for animation
const ANIMATIONTIMEMOVE = 100;
const ANIMATIONTIMEPOP = 80;

// sets constant image width
const IMAGEWIDTH = 80;

class Game {
    constructor(container, result) {
        // creates the board for play
        this.board = [[1, 1, 1, 1],
                      [1, 1, 1, 1],
                      [1, 1, 1, 1],
                      [1, 1, 1, 1]];

        // initializes a new array of things that will be pop animated
        this.pops = new Array();

        // sets whether the game is over or not
        this.over = false;

        // unprints result
        result.innerHTML = null;

        // creates the old board 
        this.oldBoard = [[1, 1, 1, 1],
                         [1, 1, 1, 1],
                         [1, 1, 1, 1], 
                         [1, 1, 1, 1]];
            
        // creates a blank square
        this.newSquare();

        // displays game
        this.display(container);

    }
    
    // controls movement with arrow keys
    controlMovement (method, result) {

        // skips if game over
        if (this.over) {
            return false;
        }

        // controls up-down movement
        if (method === "up" || method === "down") {
            this.moveUpDown(method);
        } else {
            this.moveLeftRight(method);
        }

        // skips if the old board is the same as the new board
        if (this.boardChanged()) {
            
            // adds a new square
            this.newSquare();

        }

        // updates the old board to the new board
        this.board.forEach((row, y) => {
            row.forEach((number, x) => {
                this.oldBoard[y][x] = number;
            });
        });

        // checks for game being over
        if (this.gameLost()) {

            // prints loss message
            result.innerHTML = "You lost!";
            result.style.color = "#000000";

            // sets game to be over
            this.over = true;

        } else if (this.gameWon()) {
            
            // prints win message
            result.innerHTML = "You win!";
            result.style.color = "#d4af37";

            // sets game to be over
            this.over = true;
        }

    }

    // checks if the old board is the same as the new board
    boardChanged() {

        // initializes value to be false, assuming no change
        let same = false;

        // checks every number
        this.board.forEach((row, y) => {
            row.forEach((number, x) => {
                // if any number is differnet, make the value true: it has changed
                if (number != this.oldBoard[y][x]) {
                    same = true;
                }
            });
        });

        // returns the value
        return same;

    }

    // checks nearby squares for availability
    checkNearby(y, x) {
        // gets the value of the square
        let val = this.board[y][x];

        // checks if the value is empty
        if (val === 1) {
            return true;
        }

        // four sides of the square
        let places = [{x: 0, y: 1}, {x: 0, y: -1}, {x: -1, y: 0}, {x: 1, y: 0}];

        // stores if a things has been found
        let found = false;

        // cheks for similarities or 0s
        places.forEach((place) => {
            
            // if error, we are out of bounds; just continue
            try {
                // gets the value at the spot
                let testVal = this.board[y + place.y][x + place.x];

                // checks if its the same or empty
                if (testVal === val) {
                    found = true;
                }
            } catch (error) {}

        });

        // if we didn't return true, return false
        return found;
    }

    // checks if the game is lost
    gameLost() {

        // goes through every square and checks nearby it
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.checkNearby(y, x)) {
                    return false;
                }
            }
        }

        // return false if nothing is available
        return true;
    }

    // checks if a game is won
    gameWon() {
        
        // goes through every square and checks for a 2048
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.board[y][x] === 2048) {
                    return true;
                }
            }
        }

        // returns false if there are no 2048's
        return false;
    }

    // runs a single move of a block
    move (y, x, available, xSign, ySign) {
        // stores the value in the spot
        let val = this.board[y][x];

        // if the value is 1 (empty), then skip
        if (val === 1) {
            return;
        }

        // if the values match, combine
        else if (val === available.value) {
            // perform move and increment value
            this.board[y][x] = 1;
            this.board[available.y][available.x] *= 2;

            // performs animation and adds to pops
            animateMovement(getId(y, x), {y: available.y, x: available.x}, ANIMATIONTIMEMOVE);
            this.pops.push({x: available.x, y: available.y});

            // resets avaiable value
            available.value = 1;
            available.x += xSign;
            available.y += ySign;
        }
        
        // if they don't match, and the value is not 1, then check if the available is empty - if it is, move into it
        else if (available.value === 1) {
            // perform move to available square
            this.board[y][x] = 1;
            this.board[available.y][available.x] = val;

            // performs animation
            animateMovement(getId(y, x), {y: available.y, x: available.x}, ANIMATIONTIMEMOVE);

            // moves the available square forwards
            available.value = val;
        }

        // finally, check if the spot in front of the available is empty 
        else if (this.board[available.y + ySign][available.x + xSign] === 1) {
            // perform move to available square
            this.board[y][x] = 1;
            this.board[available.y + ySign][available.x + xSign] = val;

            // performs animation
            animateMovement(getId(y, x), {y: available.y + ySign, x: available.x + xSign}, ANIMATIONTIMEMOVE);

            // changes avaible value
            available.value = val;
            available.x += xSign;
            available.y += ySign;
        } 
        
        // otherwise, move the available forwards
        else {
            available.value = this.board[available.y + ySign][available.x + xSign];
            available.x += xSign;
            available.y += ySign;
        }
    }

    moveLeftRight(move) {
        // assigns starter values depending on the type of movement
        let xSign, start, end;

        // goes left to right if move is left; otherwise, go right to left
        if (move === "left") {
            xSign = 1;
            start = 1;
            end = 4;
        } else {
            xSign = -1;
            start = 2;
            end = -1;
        }

        // goes through every column
        for (let y = 0; y < 4; y++) {

            // determines where the starting square is
            let startX = move === "left" ? 0 : 3;

            // stores the available square
            let available = {value: this.board[y][startX], x: startX, y: y};

            // goes through everything in the column (going up or going down)
            for (let x = start; move === "left" ? x < end : x > end; x += xSign) { 
                // performs the move           
                this.move(y, x, available, xSign, 0);
            }
        }
    }
    moveUpDown(move) {

        // assigns starter values depending on the type of movement
        let ySign, start, end;

        // goes up to down if moving up; otherwise down to up
        if (move === "up") {
            ySign = 1;
            start = 1;
            end = 4;
        } else {
            ySign = -1;
            start = 2;
            end = -1;
        }

        // goes through every column
        for (let x = 0; x < 4; x++) {

            // determines where the starting square is
            let startY = move === "up" ? 0 : 3;

            // stores the available square
            let available = {value: this.board[startY][x], x: x, y: startY};

            // goes through everything in the column (going up or going down)
            for (let y = start; move === "up" ? y < end : y > end; y += ySign) {
                
                // performs the move
                this.move(y, x, available, 0, ySign);
                
            }
        }
    }


    // places a random 2 or 4 on the board
    newSquare () {

        // initializes possible spots 
        let spots = new Array();

        // gets possible spots for the new number and adds to array
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.board[y][x] === 1) {
                    spots.push({y: y, x: x});
                }
            }
        }

        // checks for a game over
        if (spots.length === 0) {
            return false;
        }

        // gets a random spot
        let spot = spots[randInt(0, spots.length)];

        // randomly assigns the spot to be a 2 or a 4
        this.board[spot.y][spot.x] = Math.random() > 0.75 ? 4 : 2;

        // adds spot to the pop
        this.pops.push(spot);

        return true;

    }

    // displays the board onto the container
    display(container) {

        // clears the container
        container.innerHTML = null;

        // goes through every square on the board
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {

                // skip if empty
                if (this.board[y][x] === 1) {
                    continue;
                }

                // gets the image being looked at
                let filename = NUMTOIMAGE[this.board[y][x]];

                // gets the margins of the image relative to the rest of the board: img size: 100px, margin: 10px
                let top = y * SIZEMULTIPLIER + SIZEINCREMENT; // distance from top
                let left = x * SIZEMULTIPLIER + SIZEINCREMENT; // distance from left
                
                // creates a new image with specified characteristics
                let img = document.createElement("img");
                img.setAttribute("src", "imgs/" + filename + ".png");
                img.setAttribute("class", "image");
                img.setAttribute("id", getId(y, x));
                img.style.top = String(top) + "px";
                img.style.left = String(left) + "px";

                // adds image to container
                container.appendChild(img);
            }
        }

        // goes through everything that needs to be popped
        this.pops.forEach((element) => {
            animatePop(getId(element.y, element.x), ANIMATIONTIMEPOP);
        });

        // clears pops 
        this.pops = new Array();
    }
}

// returns the two numbers combined into a string
function getId(y, x) {
    return y + "" + x;
}
