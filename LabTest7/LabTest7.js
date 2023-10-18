let images = ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png', 'image6.png', 'image7.png', 'image8.png'];
let tiles = [];
let openTiles = [];
let pairCount = 0;
let timer;
let time = 0;
let winners = [];

document.getElementById('start-button').addEventListener('click', startGame);
// Call initialize the game 
resetGame();

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function startGame() {
  tiles = images.concat(images); // Duplicate the images array to create pairs
  shuffle(tiles); // Shuffle the tiles

  const container = document.getElementById('puzzle-container');
  container.innerHTML = '';

  // Create the tiles and add them to the container
  // Each tile is a div with the class 'tile'
  // Each tile has a data-index attribute that stores its index in the tiles array
  // Each tile has a data-image attribute that stores the image it should display
  // Each tile has an event listener that calls onTileClick when it is clicked

  tiles.forEach((tile, index) => {
    const tileElement = document.createElement('div');
    tileElement.className = 'tile';
    tileElement.dataset.index = index;
    tileElement.dataset.image = tile;
    tileElement.addEventListener('click', onTileClick);
    container.appendChild(tileElement);
  });

  // Reset the timer and pair count
  clearInterval(timer);

  // Start the timer and update the timer display every second
  time = 0;
  document.getElementById('timer').innerText = `Time: ${time} seconds`;
  timer = setInterval(() => {
    time++;
    document.getElementById('timer').innerText = `Time: ${time} seconds`;
  }, 1000);

  // Reset the pair count and update the pair count display
  pairCount = 0;
  document.getElementById('pair-count').innerText = `Pairs Opened: ${pairCount} times`;
}

function onTileClick(event) {
  const clickedTile = event.currentTarget;
  const clickedIndex = parseInt(clickedTile.dataset.index);

  // Check if the tile is already revealed or if there are already two tiles open 
  // if so, do nothing
  if (openTiles.length < 2 && !clickedTile.classList.contains('revealed')) {

    // Set the tile's background image 
    clickedTile.style.backgroundImage = `url(${tiles[clickedIndex]})`;
    // Add the revealed class to the tile to be as a "flag" that it is revealed or not
    clickedTile.classList.add('revealed');
    // Add the tile to the openTiles array
    openTiles.push(clickedTile);

    // Check if two tiles are open
    if (openTiles.length === 2) {
      pairCount++;
      document.getElementById('pair-count').innerText = `Pairs Opened: ${pairCount} times`;

      // Tiles match
      if (openTiles[0].dataset.image === openTiles[1].dataset.image) {
        openTiles.forEach(tile => tile.classList.add('matched'));

        // Clear the openTiles array
        openTiles = [];

        // Check for win by getting all unmatched tiles
        const unmatchedTiles = Array.from(document.querySelectorAll('.tile:not(.matched)'));
        // If there are no unmatched tiles, the user has won
        if (unmatchedTiles.length === 0) {
          clearInterval(timer); // Stop the timer
          updateWinnerTable(); 
        }

      // Tiles don't match
      } else { 
        setTimeout(() => {
          openTiles.forEach(tile => {
            // remove the revealed class and background image
            tile.style.backgroundImage = '';
            tile.classList.remove('revealed');
          });
          openTiles = [];
        }, 2000); // Wait 2 seconds before hiding the tiles again
      }
    }
  }
}

function updateWinnerTable() {
  const newWinner = { time, pairCount }; 
  winners.push(newWinner); 
  // Sort the winners array by time and pair count
  winners.sort((a, b) => a.time - b.time || a.pairCount - b.pairCount);
  // Only keep the top 5 winners
  winners = winners.slice(0, 5); 

  // Update the winner table
  const winnerTable = document.getElementById('winner-table');
  winnerTable.innerHTML = `
      <tr>
          <th>Rank</th>
          <th>Time (s)</th>
          <th>Pairs Opened</th>
      </tr>
  `;
  winners.forEach((winner, index) => {
    const winnerRow = document.createElement('tr');
    winnerRow.innerHTML = `
          <td>${index + 1}</td>
          <td>${winner.time}</td>
          <td>${winner.pairCount}</td>
      `;
    winnerTable.appendChild(winnerRow);
  });

  // Show the winning alert
  alert(`You win! Time: ${time} seconds, Pairs Opened: ${pairCount} times`);

  // Reset the game when the user clicks OK
  resetGame();
}

function resetGame() {
  tiles = images.concat(images); // Duplicate the images array to create pairs
  shuffle(tiles); // Shuffle the tiles

  const container = document.getElementById('puzzle-container');
  container.innerHTML = '';

  tiles.forEach((tile, index) => {
    const tileElement = document.createElement('div');
    tileElement.className = 'tile';
    tileElement.dataset.index = index;
    tileElement.dataset.image = tile;
    container.appendChild(tileElement);
  });

  // Reset the timer and pair count
  clearInterval(timer);

  pairCount = 0;
  document.getElementById('pair-count').innerText = `Pairs Opened: ${pairCount} times`;

  // Clear the timer if it's already running
  clearInterval(timer);
  time = 0;
  document.getElementById('timer').innerText = `Time: ${time} seconds`;
}















//--------DUMMY PART----------//

document.getElementById('test-ranking').addEventListener('click', testRanking);

function testRanking() {
  // Generate random times and pair counts
  const randomTime = Math.floor(Math.random() * 100);
  const randomPairs = Math.floor(Math.random() * 20);

  // Update the winners array and table
  const newWinner = { time: randomTime, pairCount: randomPairs };
  winners.push(newWinner);
  winners.sort((a, b) => a.time - b.time || a.pairCount - b.pairCount);
  winners = winners.slice(0, 5);

  // Update the winner table
  updateWinnerTable();
}
