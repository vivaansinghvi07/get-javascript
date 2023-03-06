const NUMTOIMAGE = {
    1: "empty",
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

class Game {
    constructor() {
        // creates the board for play
        this.board = [[1, 1, 1, 1],
                      [1, 1, 1, 1],
                      [1, 1, 1, 1],
                      [1, 1, 1, 1]];
    }
    
    move(method) {
        this.board[randInt(0, 4)][randInt(0, 4)] = Math.pow(2, randInt(0, 12));
        console.log(this.board);
    }

    display(container) {

        // clears the container
        container.innerHTML = null;

        // goes through every square on the board
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {

                // gets the image being looked at
                let filename = NUMTOIMAGE[this.board[y][x]];

                // gets the margins of the image relative to the rest of the board: img size: 100, margin: 10px
                let top = y * (110); // distance from top
                let left = x * (110); // distance from left
                
                // creates a new image with specified characteristics
                let img = document.createElement("img");
                img.setAttribute("src", "/imgs/" + filename + ".png");
                img.setAttribute("class", "image");
                img.style.top = String(top) + "px";
                img.style.left = String(left) + "px";

                // adds image to container
                container.appendChild(img);
            }
        }
    }
}