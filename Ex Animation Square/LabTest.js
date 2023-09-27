paper.setup('canvas');

// Set canvas dimensions
const width = 200;
const height = 200;
paper.view.viewSize = [width, height];

// TODO
/**
 *  No animation 
    Anything just basic if else/ for loop. 
    we can use paper.js to draw the square. 
    1. At very top create a circle 50x50 with random 4-5 colours
    2. no press, no actio, the square move down speed 5px per 0.05 seconds, or lower the speed as much as possible that make it smooth and not too slow.
    3. When it come to bottom, change color with the same randon set colors.
    4. Go right change color.
    5. Go top change color.
    6. Go left change color and this time it will go back to start point.
    7. when it Go back to start point stay with 2 seconds then move again but this time move from right->bottom->left->top hit start points. 
    8. Keep do this with another side again and again, 
    9. Until 10 rounds count we show Game over.
 */

let colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "magenta",
    "cyan",
    "orange",
    "purple",
    "pink",
    "brown",
    "lime",
    "violet",
    "indigo",
    "gold",
    "silver"
];
let square = new paper.Path.Rectangle(new paper.Rectangle(0, 0, 50, 50));
let directions = ['down', 'right', 'up', 'left'];
let reverseDirections = ['right', 'down', 'left', 'up'];
let directionIndex = 0;
let count = 0;
let sidesVisited = 0;
let isPaused = false;
let isReversed = false;
let isGameOver = false;

changeSquareColor();

// Move square
function moveSquare() {
    if (isPaused) return;

    let direction = isReversed ? reverseDirections[directionIndex] : directions[directionIndex];
    completedCycle = false;

    if (direction === 'down') {
        square.position.y += 5;
        if (square.position.y >= paper.view.size.height - 25) {
            directionIndex = isReversed ? 2 : 1;
            sideVisited();
        }
    } else if (direction === 'right') {
        square.position.x += 5;
        if (square.position.x >= paper.view.size.width - 25) {
            directionIndex = isReversed ? 1 : 2;
            sideVisited();
        }
    } else if (direction === 'up') {
        square.position.y -= 5;
        if (square.position.y <= 25) {
            directionIndex = isReversed ? 0 : 3;
            sideVisited();
        }
    } else if (direction === 'left') {
        square.position.x -= 5;
        if (square.position.x <= 25) {
            directionIndex = isReversed ? 3 : 0;
            sideVisited();
        }
    }

    checkIfSquareIsFullLoop()
}

// Check if square has completed a full loop
function checkIfSquareIsFullLoop() {
    if (sidesVisited >= 4 && completedCycle === false) {
        completedCycle = true;
        count++;
        document.getElementById('count').innerText = 'Count: ' + count;
        checkIfGameOver();
        pauseAndReverse();
    }
}

// Check if game is over
function checkIfGameOver() {
    if (count >= 10) {
        displayGameOver();
        square.remove();
        return;
    }
}

// Side has been visited
function sideVisited() {
    sidesVisited++;
    console.log("Sides Visited:", sidesVisited);
    changeSquareColor();
}

// Change square color 
function changeSquareColor() {
    square.fillColor = colors[Math.floor(Math.random() * colors.length)];
}

function pauseAndReverse() {
    isPaused = true;
    sidesVisited = 0;
    setTimeout(function () {
        isPaused = false;
        isReversed = !isReversed;
        console.log("Reversed:", isReversed);
    }, 2000);
}

// Function to display Game Over text
function displayGameOver() {
    const text = new paper.PointText({
        point: [width / 2, height / 2],
        content: 'GameOver',
        fillColor: 'red',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 35,
        justification: 'center',
    });
    isGameOver = true;
}

// Main game loop
paper.view.onFrame = (event) => {
    if (!isGameOver && event.count % 1 === 0) {
        moveSquare();
    }
};

paper.view.setframeRate(20);
paper.view.draw();