// animates the element in id, in a certain direction and time (in milliseconds)
function animateMovement(id, newCoords, time) {
    $(document).ready(function() {

        // animates the movement
        $("#" + id).animate({left: newCoords.x + "px", top: newCoords.y + "px"}, time);
        
    });
}

function animatePop(id, time) {
    $(document).ready(function() {

        console.log("that");

        // animates the inflation
        $("#" + id).animate({width: imageWidth + 10, height: imageWidth + 10, left: "-=5px", top: "-=5px"}, time/2);
        // animates the deflation
        $("#" + id).animate({width: imageWidth, height: imageWidth, left: "+=5px", top: "+=5px"}, time/2);
        
    });
}