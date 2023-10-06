paper.setup('canvas');

// Set canvas dimensions
const width = 900;
const height = 400;
paper.view.viewSize = [width, height];

// Global variables
let topScores = [0, 0, 0, 0, 0];
let numberOfWordsToPassLevel = 2;
let numberOflives = 2;
let speedForLevel1 = 1;
let speedForLevel2 = 1.5;
let speedForLevel3 = 2;
let speedForLevel4 = 3;

class Word {
  constructor(text, speed, x, y) {
    this.text = text;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.item = new paper.PointText({ // Paper.js text item
      point: [this.x, this.y],
      content: this.text,
      fillColor: 'black',
      fontSize: 20
    });
  }

  drop() {
    this.y += this.speed;
    this.item.position.y = this.y; // Update Paper.js text item position
  }

  remove() {
    this.item.remove(); // Remove Paper.js text item
  }
}

class Level {
  constructor(wordArrays, speedMultiplier) {
    this.wordArrays = wordArrays;
    this.speedMultiplier = speedMultiplier;
    this.activeWords = [];
    this.lives = numberOflives;
    this.score = 0;
    this.wordsCleared = 0;
  }

  spawnWord() {
    if (this.activeWords.length === 0) {
      const randomArrayIndex = Math.floor(Math.random() * this.wordArrays.length);
      const randomWordArray = this.wordArrays[randomArrayIndex];
      const randomWordIndex = Math.floor(Math.random() * randomWordArray.length);
      const wordText = randomWordArray[randomWordIndex];
      const textSize = new paper.PointText({ content: wordText });
      const maxWidth = width - textSize.bounds.width;
      textSize.remove();
      const x = Math.random() * maxWidth;
      const word = new Word(wordText, 1 * this.speedMultiplier, x, 0);
      this.activeWords.push(word);
    }
  }

  checkWord(userInput) {
    for (let i = 0; i < this.activeWords.length; i++) {
      if (this.activeWords[i].text === userInput) {
        game.score += this.activeWords[i].text.length;  // Adjust this line
        this.wordsCleared += 1;
        this.activeWords[i].remove();
        this.activeWords.splice(i, 1);
        document.getElementById('scoreDisplay').innerText = 'Score: ' + game.score;  // Adjust this line
        break;
      }
    }
  }

  update() {
    for (const word of this.activeWords) {
      word.drop();
      if (word.y > height) {
        this.lives -= 1;
        word.remove();
        this.activeWords.splice(this.activeWords.indexOf(word), 1);
      }
    }
  
    document.getElementById('livesDisplay').innerText = 'Lives: ' + this.lives;
  
    if (this.lives <= 0) {
      showModal();
      paper.view.onFrame = null; // Stop the game loop
      // Update topScores if the current score is a new high score
      for (let i = 0; i < topScores.length; i++) {
        if (game.score > topScores[i]) {  // Modify this line to reference game.score
          topScores.splice(i, 0, game.score);  // Modify this line to reference game.score
          topScores.pop();  // Remove the lowest score to keep only the top 5 scores
          break;
        }
      }
  
      updateScoreList(topScores);  // Update the score list display with the updated topScores array
    }

    // // Check for level advancement
    // if (this.wordsCleared >= 10) {
    //   this.wordsCleared = 0;  // Reset words cleared count
    //   advanceLevel();  // Advance to the next level
    // }

    // Spawn a new word if the current word hits the floor or is typed correctly
    if (this.activeWords.length === 0) {
      this.spawnWord();
    }
  }

  draw() {
    // Optionally draw score and lives here
  }

  reset() {
    this.activeWords = [];
    this.lives = numberOflives;
    this.score = 0;
    this.wordsCleared = 0;
    // remove all words from the canvas (in case any are still on-screen)
    paper.project.activeLayer.removeChildren();
  }
}

class Game {
  constructor() {
    this.levels = [];
    this.currentLevelIndex = 0;
    this.score = 0;  // Add this line
  }

  addLevel(level) {
    this.levels.push(level);
  }

  getCurrentLevel() {
    return this.levels[this.currentLevelIndex];
  }

  update() {
    this.getCurrentLevel().update();
    // Update the level display
    document.getElementById('levelDisplay').innerText = 'Level: ' + (this.currentLevelIndex + 1);
    this.checkLevelAdvancement();  // Check for level advancement
  }

  draw() {
    this.getCurrentLevel().draw();
  }

  checkLevelAdvancement() {
    const currentLevel = this.getCurrentLevel();
    if (currentLevel.wordsCleared >= numberOfWordsToPassLevel) {
      this.advanceLevel();
    }
  }

  advanceLevel() {
    if (this.currentLevelIndex < this.levels.length - 1) {
      this.currentLevelIndex += 1;
      initializeGame();  // Reset the game state for the new level
    } else {
      alert('Congratulations! You completed all levels!');
      showModal();
      paper.view.onFrame = null;  // Stop the game loop
    }
  }
}

//---------- Main game ----------//

const game = new Game();
const level1Words = createArraysOfWords().words3Words;
const inputField = document.getElementById('inputField');

inputField.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    game.getCurrentLevel().checkWord(inputField.value);
    inputField.value = '';  // Clear the input field
  }
});

// Call initializeGame when the page loads to set up the initial game state
initializeGame();

function createArraysOfWords() {
  const words3Words = ['cat', 'dog', 'bat', 'rat', 'hat', 'mat', 'sat', 'fat', 'pat', 'cap', 'tap', 'lap', 'map', 'gap', 'nap'];
  const words4Words = ['fish', 'frog', 'bird', 'lion', 'bear', 'wolf', 'deer', 'duck', 'goat', 'goose', 'hawk', 'kangaroo', 'mouse', 'panda', 'shark'];
  const words5Words = ['apple', 'grape', 'melon', 'peach', 'pear', 'cherry', 'orange', 'lemon', 'banana', 'mango', 'plum', 'kiwi', 'papaya', 'coconut', 'strawberry'];
  const words6Words = ['potato', 'tomato', 'carrot', 'onion', 'cabbage', 'broccoli', 'spinach', 'cucumber', 'eggplant', 'pumpkin', 'radish', 'lettuce', 'garlic', 'ginger', 'pepper'];
  return { words3Words, words4Words, words5Words, words6Words };
}

function initializeGame() {
  if (game.levels.length === 0) {
    const wordArrays = createArraysOfWords();
    const level1 = new Level([wordArrays.words3Words], speedForLevel1);
    const level2 = new Level([wordArrays.words3Words, wordArrays.words4Words], speedForLevel2);
    const level3 = new Level([wordArrays.words3Words, wordArrays.words4Words, wordArrays.words5Words], speedForLevel3);
    const level4 = new Level([wordArrays.words3Words, wordArrays.words4Words, wordArrays.words5Words, wordArrays.words6Words], speedForLevel4);
    
    game.addLevel(level1);
    game.addLevel(level2);
    game.addLevel(level3);
    game.addLevel(level4);
  } else {
    game.getCurrentLevel().reset();
  }

  paper.view.onFrame = (event) => {
    game.update();
    game.draw();
    if (event.count % 60 === 0) {
      game.getCurrentLevel().spawnWord();
    }
  };
  
  paper.view.draw();
}

function updateScoreList(scores) {
  const scoreListDiv = document.getElementById('scoreList');
  scoreListDiv.innerHTML = '';  // Clear the current score list
  scores.forEach((score, index) => {
    const scoreDiv = document.createElement('div');
    scoreDiv.innerText = `Person ${index + 1}: ${score}`;
    scoreListDiv.appendChild(scoreDiv);
  });
}

function advanceLevel() {
  game.advanceLevel();
}

function showModal() {
  const modal = document.getElementById('gameOverModal');
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('gameOverModal');
  modal.style.display = 'none';
}

function restartGame() {
  closeModal();  // Close the Game Over modal dialog
  game.score = 0;
  game.currentLevelIndex = 0;  // Reset the level index to 0
  document.getElementById('scoreDisplay').innerText = 'Score: ' + game.score;  // Update the score display
  initializeGame();  // Reset the game state
  inputField.value = '';
}