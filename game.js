class Game {
    constructor() {
        // creates the board for play
        this.board = [[0, 0, 0, 0],
                      [0, 0, 0, 0],
                      [0, 0, 0, 0],
                      [0, 0, 0, 0]];
    }
    
    move() {
        this.board[randInt(0, 3)][randInt(0, 3)] = 2;
        console.log(this.board);
    }
}