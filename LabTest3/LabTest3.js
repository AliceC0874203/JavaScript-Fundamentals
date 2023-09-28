paper.setup('canvas');

// Set canvas dimensions
const width = 500;
const height = 500;
paper.view.viewSize = [width, height];

// Function to create square at random position
function createRandomSquare() {
  const randomX = Math.floor(Math.random() * (width - 50));
  const randomY = Math.floor(Math.random() * (height - 50));
  
  let square = new paper.Path.Rectangle(new paper.Rectangle(randomX, randomY, 50, 50));
  square.fillColor = 'pink';
  return square;
}

// Create square at random position
let square = createRandomSquare();

// Initialize velocity
// Random newDirection between -5 and +5 for x and y
/**
 * Math.random()×10−5:
 * R=0:
    0×10−5=−5

    R=1:
    1×10−5=5
 */
let speed = 5;
let newDirection = new paper.Point(Math.random() * 10 - speed, Math.random() * 10 - speed); 

// Main game loop
paper.view.onFrame = (event) => {
  // Update position
  square.position = square.position.add(newDirection);
  
  // if hit left or right wall, reverse x velocity
  if (square.bounds.left <= 0 || square.bounds.right >= width) {
    newDirection.x = newDirection.x * -1; // reverse y direction by multiplying by -1
  }
  
  // if hit top or bottom wall, reverse y velocity
  if (square.bounds.top <= 0 || square.bounds.bottom >= height) {
    newDirection.y = newDirection.y * -1; // reverse y direction by multiplying by -1
  }
};

// Set frame rate
// paper.view.frameRate = 20;
paper.view.draw();
