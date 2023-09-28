paper.setup('canvas');

// Set canvas dimensions
const width = 500;
const height = 500;
paper.view.viewSize = [width, height];

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

let circle = new paper.Path.Circle(new paper.Point(250, 250), 25); // Center the circle
let targetRadius = 200;
let initialRadius = 25;
let targetSeconds = 5;
let frameRate = 20; // 20 frames per second
let frames = targetSeconds * frameRate; // 5 seconds * 20 frames per second
let colorFrames = 20; // color every 1 second, 1 second = 20 frames
let incrementPerFrame = (targetRadius - initialRadius) / frames; // 175 / 100 = 1.75
let currentFrames = 0;
let currentColorFrames = 0;
let isExpanding = true;

let elapsedTime = 0;

changeCircleColor();

// Change circle color 
function changeCircleColor() {
    console.log(`Change color`);
    circle.fillColor = colors[Math.floor(Math.random() * colors.length)];
}

// Main game loop
/**
 * 20 frames per second
 * I have 5 x 20 = 100 frames (frames) to complete the animation.
 * 
 * The change in radius from initial to target is 200 - 25 = 175.
 * 
 * So, the increment per frame would be 175/100 = 1.75
 * 
 * expanding
 * newRadius=initialRadius+(incrementPerFrame×currentFrames)
 * 
 * shrinking
 * newRadius=targetRadius−(incrementPerFrame×currentFrames)
 */
paper.view.onFrame = (event) => {
    let newRadius;

    if (isExpanding) {
        // Calculate the new radius based on the number of elapsed frames
        // 25 + (1.75 * currentFrames) until reach 200
        newRadius = initialRadius + (incrementPerFrame * currentFrames);
    } else {
        // Calculate the new radius for shrinking
        // 200 - (1.75 * currentFrames) until reach 25
        newRadius = targetRadius - (incrementPerFrame * currentFrames);
    }

    // Calculate the scale factor based on the new radius
    scaleFactor = newRadius / (circle.bounds.width / 2);

    // Update the circle radius
    circle.scale(scaleFactor);
    
    // Change color every 1 second
    if (currentColorFrames >= colorFrames) {
        changeCircleColor(); // Apply color
        currentColorFrames = 0;
    }
    
    // Change direction every 5 seconds/ 200 radius
    if (currentFrames >= frames) {
        isExpanding = !isExpanding;
        currentFrames = 0;
    }
    
    // Print current radius and elapsed time
    console.log(`Current radius: ${circle.bounds.width / 2}`);
    console.log(`Elapsed time: ${elapsedTime / 20} seconds`);
    
    currentFrames++;
    currentColorFrames++;
    elapsedTime++;
};

paper.view.frameRate = 20;
paper.view.draw();