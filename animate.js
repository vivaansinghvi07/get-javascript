// animates the element in id, in a certain direction and time (in milliseconds)
function animate(id, direction, distance, time) {
    $(document).ready(function() {

        // gets the type of movement
        let type = ["left", "right", "up", "down"].findIndex((element) => {
            if (element === direction) {
                return true;
            }
        });

        // assigns the distances
        let distances = [0, 0, 0, 0];
        
        // goes through each element in the distances array and adjusts the distance moved accordingly 
        distances.forEach((element, index, array) => {
            if (index === type) {
                array[index] = distance;
            }
            array[index] += "px";
        });

        // assigns distances
        let [distLeft, distRight, distUp, distDown] = distances;

        // animates the movement
        $("#" + id).animate({left: distLeft, right: distRight, up: distUp, down: distDown}, time);
        
    });
}