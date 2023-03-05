var game = new Game();

document.addEventListener("keydown", (event) => {
    var move = event.key;
    var moves = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    var index = moves.findIndex((option) => {
                    if (option === move) {
                        return true;
                    }
                });
    if (index === -1) {
        return false;
    }
    else {
        game.move(["up", "down", "left", "right"][index]);
    }
});

// returns a random number from the min (inclusive) to the max (exclusive)
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}