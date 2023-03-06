// creates a new game
var game = new Game();

window.addEventListener("DOMContentLoaded", () => {

    // gets the container in which the images are displayed in
    const CONTAINER = document.getElementById("container");

    // listens for a key press
    document.addEventListener("keydown", (event) => {

        // stores the possible event key names
        var moves = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "s", "a", "d", "W", "S", "A", "D"];

        // finds the index of the key press
        var index = moves.findIndex((option) => {
                        if (option === event.key) {
                            return true;
                        }
                    });

        // if the press is not found, its not a valid move
        if (index === -1) {
            return false;
        }

        // moves the board based on the key press
        else {
            game.move(["up", "down", "left", "right"][index % 4]);
            setTimeout(function() {
                game.display(CONTAINER);
            }, ANIMATIONTIMEMOVE);
            setTimeout(function() {
                return;
            }, ANIMATIONTIMEPOP);
        }
    })
});

// returns a random number from the min (inclusive) to the max (exclusive)
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
