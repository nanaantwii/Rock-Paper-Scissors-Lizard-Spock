// Get elements
const icons = document.querySelectorAll('.icon');
const userChoiceDisplay = document.getElementById('userChoice');
const computerChoiceDisplay = document.getElementById('computerChoice');
const resultDisplay = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const playAgainBtn = document.getElementById('playAgain');

// Initialize score
let score = 0;

// Choices object
const choices = {
  rock: { beats: ['scissors', 'lizard'], icon: 'rock' },
  paper: { beats: ['rock', 'spock'], icon: 'paper' },
  scissors: { beats: ['paper', 'lizard'], icon: 'scissors' },
  lizard: { beats: ['paper', 'spock'], icon: 'lizard' },
  spock: { beats: ['rock', 'scissors'], icon: 'spock' },
};

// Computer's choice
function computerChoice() {
  const keys = Object.keys(choices);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return choices[keys[randomIndex]];
}

// Update score
function updateScore(result) {
  if (result === 'win') score++;
  if (result === 'lose') score--;
  scoreDisplay.textContent = score;
}

// Display choices
function displayChoices(user, computer) {
  userChoiceDisplay.className = `icon ${user}`;
  userChoiceDisplay.style.backgroundImage = `url('images/${user}.png')`;
  computerChoiceDisplay.className = `icon ${computer}`;
  computerChoiceDisplay.style.backgroundImage = `url('images/${computer}.png')`;
}

// Determine winner
function determineWinner(user, computer) {
  if (user === computer) return 'draw';
  if (choices[user].beats.includes(computer)) return 'win';
  return 'lose';
}

// Show result
function showResult(result) {
  if (result === 'draw') resultDisplay.textContent = "It's a draw!";
  if (result === 'win') resultDisplay.textContent = 'You win!';
  if (result === 'lose') resultDisplay.textContent = 'You lose!';
}

// Play again
function playAgain() {
  userChoiceDisplay.style.backgroundImage = '';
  computerChoiceDisplay.style.backgroundImage = '';
  resultDisplay.textContent = '';
}

// Event listeners
icons.forEach(icon => {
  icon.addEventListener('click', () => {
    const userChoice = icon.getAttribute('data-choice');
    const computerChoiceObj = computerChoice();
    const computerChoice = computerChoiceObj.icon;
    const result = determineWinner(userChoice, computerChoice);
    displayChoices(userChoice, computerChoice);
    showResult(result);
    updateScore(result);
  });
});

playAgainBtn.addEventListener('click', playAgain);
