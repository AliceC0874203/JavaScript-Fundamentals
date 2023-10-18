let tiles = [];
let swapCount = 0;
let timer;
let time = 0;

document.getElementById('start-button').addEventListener('click', startGame);
initializeGrid();

function initializeGrid() {
  const container = document.getElementById('puzzle-container');
  container.innerHTML = '';
  for (let i = 0; i < 16; i++) {
    const tileElement = document.createElement('div');
    tileElement.className = 'tile';
    container.appendChild(tileElement);
  }
}

function startGame() {
  // Randomly shuffle the tiles
  tiles = [...Array(15).keys()].map(n => n + 1); // Create array of numbers 1-15
  tiles.push('');  // Add blank tile
  tiles.sort(() => Math.random() - 0.5); // Shuffle the 16 tiles

  // Render the tiles
  const container = document.getElementById('puzzle-container');
  container.innerHTML = '';

  // Create the tiles and add them to the container
  // Each tile is a div with the class 'tile'
  // Each tile has inner text that displays its number
  // Each tile has a data-index attribute that stores its index in the tiles array
  // Each tile has an event listener that calls onTileClick when it is clicked

  tiles.forEach((tile, index) => {
    const tileElement = document.createElement('div');
    tileElement.className = 'tile';
    tileElement.dataset.index = index;
    tileElement.innerText = tile;
    tileElement.addEventListener('click', onTileClick);
    container.appendChild(tileElement);
  });

  // Reset and start the timer
  clearInterval(timer);

  // Start the timer and update the timer display every second
  time = 0;
  document.getElementById('timer').innerText = `Time: ${time} seconds`;
  timer = setInterval(() => {
    time++;
    document.getElementById('timer').innerText = `Time: ${time} seconds`;
  }, 1000);

  // Reset swap count and update the swap count display
  swapCount = 0;
  document.getElementById('swap-count').innerText = `Swaps: ${swapCount} times`;
}

function onTileClick(event) {
  // Get the index of the clicked tile and the index of the blank tile
  const clickedIndex = parseInt(event.currentTarget.dataset.index);
  const blankIndex = tiles.indexOf('');

  // Check if the clicked tile is adjacent to the blank tile
  // By checking if the difference between their indices is 1 or 4
  // Because the tiles are in a 4x4 grid
  // So if the difference is 1, they are in the same row
  // If the difference is 4, they are in the same column
  // If the difference is 5 or 3, they are diagonal or not adjacent

  const isAdjacent =
    Math.abs(clickedIndex - blankIndex) === 1 ||
    Math.abs(clickedIndex - blankIndex) === 4;

  if (isAdjacent) {
    // Swap the tiles
    [tiles[clickedIndex], tiles[blankIndex]] = [tiles[blankIndex], tiles[clickedIndex]];
    swapCount++;
    document.getElementById('swap-count').innerText = `Swaps: ${swapCount} times`;

    // Re-render the tiles
    const container = document.getElementById('puzzle-container');
    container.innerHTML = '';
    tiles.forEach((tile, index) => {
      const tileElement = document.createElement('div');
      tileElement.className = 'tile';
      tileElement.dataset.index = index;
      tileElement.innerText = tile;
      tileElement.addEventListener('click', onTileClick);
      container.appendChild(tileElement);
    });

    // Check for win 
    // By check if the first 15 tiles are in order
    const isWin = tiles.slice(0, 15).every((tile, index) => tile === index + 1); 
    if (isWin) {
      clearInterval(timer);
      alert(`You win! Time: ${time} seconds, Swaps: ${swapCount} times`);
    }
  }
}










//--------DUMMY PART----------//
document.getElementById('dummy-button').addEventListener('click', dummyWin);

function dummyWin() {
    // Set the tiles to the winning arrangement
    tiles = [...Array(15).keys()].map(n => n + 1).concat(['']);
    
    // Render the tiles
    const container = document.getElementById('puzzle-container');
    container.innerHTML = '';
    tiles.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.className = 'tile';
        tileElement.dataset.index = index;
        tileElement.innerText = tile;
        tileElement.addEventListener('click', onTileClick);
        container.appendChild(tileElement);
    });
    
    // Stop the timer
    clearInterval(timer);
    
    // Show the winning message
    alert(`You win! Time: ${time} seconds, Swaps: ${swapCount} times`);
}
