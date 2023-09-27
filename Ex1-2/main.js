$(document).ready(function () {
    'use strict';
    console.log('main.js loaded');
    paper.install(window);

    // TODO
    // Exercise 1 + 2
    /**
     * 1. The canvas should have dimensions of 600 pixels in width and 800 pixels in height.

    2. Randomly draw circles on the canvas using an array of colors.

    3. Each circle should have a radius between 10 and 30 pixels. Ensure that the entire circle is visible on the canvas and not outside or partially cut off.

    4. After an initial every half of seconds, circles should be automatically drawn on the canvas. This should continue for 15 seconds.

    5. After 15 seconds, the canvas should freeze, preserving the state of the circles.


     */

    // Initialize paper.js on the canvas
    const canvas = document.getElementById("mainCanvas");
    paper.setup(canvas);

    // Set canvas dimensions
    const width = 800;
    const height = 600;
    paper.view.viewSize = [width, height];

    // Array of colors
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];

    // Function to draw a circle
    function drawCircle() {
        const x = Math.random() * (width - 60) + 30; // Minimum 30, Maximum width - 30
        const y = Math.random() * (height - 60) + 30; // Minimum 30, Maximum height - 30
        const radius = Math.random() * 20 + 10; // Minimum 10, Maximum 30
        const color = colors[Math.floor(Math.random() * colors.length)];

        const circle = new paper.Path.Circle({
            center: [x, y],
            radius: radius,
            fillColor: color,
        });
    }

    // Draw circles initially
    drawCircle();

    // Variables to track game state
    let elapsedTime = 0;
    let round = 1;
    let circleCount = 0;

    // Function to clear canvas
    function clearCanvas() {
        paper.project.activeLayer.removeChildren();
    }

    // Function to display Game Over text
    function displayGameOver() {
        const text = new paper.PointText({
            point: [width / 2, height / 2],
            content: 'Game Over',
            fillColor: 'red',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: 48,
            justification: 'center',
        });
    }

    // Set initial conditions
    let circlesToDraw = 30;

    // Main function
    function gameLoop() {
        if (elapsedTime < 15) {
            drawCircle();
            circleCount++;
            elapsedTime += 0.5;
            console.log(`Elapsed Time: ${elapsedTime} seconds`);

            if ((round === 1 && circleCount >= 30) ||
                (round === 2 && circleCount >= 20) ||
                (round === 3 && circleCount >= 10)) {
                clearCanvas();
                circleCount = 0;
                round++;
                if (round === 2) {
                    circlesToDraw = 20;
                } else if (round === 3) {
                    circlesToDraw = 10;
                }
            }
        } else {
            clearInterval(intervalId);
            clearCanvas();
            displayGameOver();
            console.log("15 seconds have passed. The canvas is now frozen.");
        }
    }

    // Draw circles every half-second for 15 seconds
    let intervalId = setInterval(gameLoop, 500);

    // // Draw circles every half-second for 15 seconds
    // let intervalId = setInterval(() => {
    //     drawCircle();
    //     elapsedTime += 0.5;
    //     console.log(`Elapsed Time: ${elapsedTime} seconds`);
    // }, 500);

    // setTimeout(() => {
    //     clearInterval(intervalId);
    //     console.log(intervalId);
    // }, 15000);

    /** Learning in Class
    // Green circle at center of canvas
    var c = Shape.Circle(200, 200, 50);
    c.fillColor = 'green';

    //Repeat the circle 64 times, resulting 8 rows of 8 circles each.
    var c;
    for (var x = 25; x < 400; x += 50) {
        for (var y = 25; y < 400; y += 50) {
            c = Shape.Circle(x, y, 20); c.fillColor = 'green';
        }
    }

    // Onmousedown event handler , draw a circle where the user clicks
    var tool = new Tool();
    tool.onMouseDown = function (event) {
        var c = Shape.Circle(event.point.x, event.point.y, 20);
        // var c = Shape.Circle(event.point, 20); //Do same with above line 
        c.fillColor = 'green';
    };

    // Black circle with white text
    var c = Shape.Circle(200, 200, 80); 
    c.fillColor = 'black';
    var text = new PointText(200, 200); 
    text.justification = 'center'; 
    text.fillColor = 'white'; 
    text.fontSize = 20;
    text.content = 'hello world';
    **/

    paper.view.draw();
});