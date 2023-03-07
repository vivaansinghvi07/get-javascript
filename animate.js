// animates the element in id, in a certain direction and time (in milliseconds)
function animateMovement(id, newCoords, time) {
    $(document).ready(function() {

        // applies multipliers
        let x = newCoords.x * SIZEMULTIPLIER + SIZEINCREMENT;
        let y = newCoords.y * SIZEMULTIPLIER + SIZEINCREMENT;

        // animates the movement
        $("#" + id).animate({left: x + "px", top: y + "px"}, time);
        
    });
}

function animatePop(id, time) {
    $(document).ready(function() {

        // animates the inflation
        $("#" + id).animate({width: IMAGEWIDTH + 10, height: IMAGEWIDTH + 10, left: "-=5px", top: "-=5px"}, time/2);
        // animates the deflation
        $("#" + id).animate({width: IMAGEWIDTH, height: IMAGEWIDTH, left: "+=5px", top: "+=5px"}, time/2);
        
    });
}