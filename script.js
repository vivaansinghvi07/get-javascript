// creates a new game
var game = new Game();

window.addEventListener("DOMContentLoaded", () => {

    // gets the container in which the images are displayed in
    const CONTAINER = document.getElementById("container");
    console.log(CONTAINER);
    
    document.addEventListener("keydown", (event) => {
        var moves = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        var index = moves.findIndex((option) => {
                        if (option === event.key) {
                            return true;
                        }
                    });
        if (index === -1) {
            return false;
        }
        else {
            game.move(["up", "down", "left", "right"][index]);
            game.display(CONTAINER);
        }
    })
});

// returns a random number from the min (inclusive) to the max (exclusive)
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
