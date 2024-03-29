var game;

window.addEventListener("DOMContentLoaded", () => {

    // gets the container in which the images are displayed in, and the place where the result of the game is printed
    const CONTAINER = document.getElementById("container");
    const RESULT = document.getElementById("result");

    // starts a new game
    game = new Game(CONTAINER, RESULT);

    // listens for a key press
    document.addEventListener("keydown", (event) => {

        // prevents scrolling
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.key) > -1) {
            event.preventDefault();
        }

        // stores the possible event key names
        var moves = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "s", "a", "d", "W", "S", "A", "D"];

        // finds the index of the key press
        var index = moves.indexOf(event.key)

        // if the press is not found, its not a valid move
        if (index === -1) {
            return false;
        }

        // moves the board based on the key press
        else {

            // gets the way to move based on the index (modulus to tolerate WASD)
            game.controlMovement(["up", "down", "left", "right"][index % 4], RESULT);

            // waits for the moving animations
            setTimeout(function() {
                game.display(CONTAINER);
            }, ANIMATIONTIMEMOVE);

            // waits for the pop animation
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

// shows the progression
function showProgression() {
    document.getElementById("progression").innerHTML = "C &rarr; C++ &rarr; C# &rarr; PHP &rarr; Rust &rarr; Ruby &rarr; Swift &rarr; Java &rarr; Python &rarr; TypeScript &rarr; JavaScript"
}

// resets the game
function reset() {
    game = new Game(document.getElementById("container"), document.getElementById("result"));
}
