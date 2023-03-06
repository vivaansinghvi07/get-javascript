// TODO: Make the move move the closest one to the edge: for example if you move left you move the one thats the smallest index left first, then whatever else is available
// create an array of ids that need to be popped in the display and pop them in the display function after everything is done

const NUMTOIMAGE = {
    2: "c",
    4: "cpp",
    8: "php",
    16: "rust",
    32: "ruby",
    64: "swift",
    128: "sql",
    256: "java",
    512: "python",
    1024: "ts",
    2048: "js"
};

// 100 px for the image, 10 px for the margin
const SIZEMULTIPLIER = 110;

// sets the time for animation
const ANIMATIONTIMEMOVE = 100;
const ANIMATIONTIMEPOP = 80;

// sets constant image width
const imageWidth = 80;

class Game {
    constructor() {
        // creates the board for play
        this.board = [[1, 1, 1, 1],
                      [1, 1, 1, 1],
                      [1, 1, 1, 1],
                      [1, 1, 1, 1]];

        // initializes a new array of things that will be pop animated
        this.pops = new Array();
    }
    
    // controls movement with arrow keys
    move (method) {

        // controls up-down movement
        if (method === "up" || method === "down") {
            // stores the available square for movement
            this.moveUpDown(method);
        }

        // makes new square
        if (!this.newSquare()) {
            // TODO: code game over
            console.log("Lost");
            return false;
        }

        
    }

    moveUpDown(move) {

        let ySign, start, end;
        if (move === "up") {
            ySign = 1;
            start = 1;
            end = 4;
        }
        else {
            ySign = -1;
            start = 2;
            end = -1;
        }
        // goes through every column
        for (let x = 0; x < 4; x++) {
            // stores the available square
            let available = {value: this.board[move === "up" ? 0 : 3][x], x: x, y: move === "up" ? 0 : 3};
            for (let y = start; move === "up" ? y < end : y > end; y += ySign) {
                let val = this.board[y][x];
                if (val === 1) {
                    continue;
                }
                else if (val === available.value) {
                    // perform move and increment value
                    this.board[y][x] = 1;
                    this.board[available.y][available.x] *= 2;

                    // performs animation and adds to pops
                    animateMovement(getId(y, x), {y: available.y, x: available.x}, ANIMATIONTIMEMOVE);
                    this.pops.push({x: available.x, y: available.y});

                    // resets avaiable value
                    available.value = 1;
                    available.y += ySign;
                }
                else if (available.value === 1) {
                    // perform move to available square
                    this.board[y][x] = 1;
                    this.board[available.y][x] = val;

                    // performs animation
                    animateMovement(getId(y, x), {y: available.y, x: available.x}, ANIMATIONTIMEMOVE);

                    // moves the available square forwards
                    available.value = 1;
                    available.y += ySign;
                }
                else if (this.board[available.y + ySign][x] === 1) {
                    // perform move to available square
                    this.board[y][x] = 1;
                    this.board[available.y + ySign][x] = val;

                    // performs animation
                    animateMovement(getId(y, x), {y: available.y + ySign, x: available.x}, ANIMATIONTIMEMOVE);

                    // changes avaible value
                    available.value = 1;
                    available.y += 2 * ySign;
                } 
                else {
                    available.value = this.board[available.y + ySign][available.x];
                    available.y += ySign;
                }
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

        // adds the board to the container
        let board = document.createElement("img");
        board.setAttribute("src", "board.png");
        board.setAttribute("class", "board");
        container.appendChild(board);

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
                let top = y * (SIZEMULTIPLIER); // distance from top
                let left = x * (SIZEMULTIPLIER); // distance from left
                
                // creates a new image with specified characteristics
                let img = document.createElement("img");
                img.setAttribute("src", "/imgs/" + filename + ".png");
                img.setAttribute("class", "image");
                img.setAttribute("id", y + "" + x);
                img.style.top = String(top) + "px";
                img.style.left = String(left) + "px";

                // adds image to container
                container.appendChild(img);
            }
        }

        // goes through everything that needs to be popped
        this.pops.forEach((element) => {
            animatePop(element.y + "" + element.x, ANIMATIONTIMEPOP);
        });

        // clears pops 
        this.pops = new Array();
    }
}

// returns the two numbers combined into a string
function getId(y, x) {
    return y + "" + x;
}