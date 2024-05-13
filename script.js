// Define global variables
let userScore = 0;
let computerScore = 0;

// Function to start the game
function startGame() {
    // Add event listeners to all icons
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const userChoice = icon.dataset.choice;
            const computerChoice = getComputerChoice();
            const result = determineWinner(userChoice, computerChoice);
            displayResult(userChoice, computerChoice, result);
            playSound(result);
        });
    });
}

// Function to get computer's choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'draw';
    } else if (
        (userChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
        (userChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
        (userChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
        (userChoice === 'lizard' && (computerChoice === 'paper' || computerChoice === 'spock')) ||
        (userChoice === 'spock' && (computerChoice === 'rock' || computerChoice === 'scissors'))
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

// Function to display the result
function displayResult(userChoice, computerChoice, result) {
    // Get the icons
    const userIcon = document.getElementById('userIcon');
    const houseIcon = document.getElementById('houseIcon');

    // Set the icons based on choices
    userIcon.className = `icon ${userChoice}`;
    houseIcon.className = `icon ${computerChoice}`;

    // Get the result message element
    const whoWin = document.getElementById('whoWin');

    // Display result message
    if (result === 'draw') {
        whoWin.innerText = "It's a draw!";
    } else if (result === 'win') {
        whoWin.innerText = 'You win!';
        userScore++;
    } else {
        whoWin.innerText = 'You lose!';
        computerScore++;
    }

    // Update score
    document.getElementById('score').innerText = userScore;

    // Show result page
    document.getElementById('startPage').style.display = 'none';
    document.getElementById('resultPage').style.display = 'block';
}

// Function to reset the game
function resetGame() {
    // Reset scores
    userScore = 0;
    computerScore = 0;

    // Reset score display
    document.getElementById('score').innerText = '0';

    // Reset result page
    document.getElementById('startPage').style.display = 'block';
    document.getElementById('resultPage').style.display = 'none';
}

// Function to handle play again button click
document.getElementById('playAgain').addEventListener('click', resetGame);

// Function to handle rules modal
function handleRulesModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

// Function to handle close modal button click
document.getElementById('closeModal').addEventListener('click', function () {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
});

// Function to play sound based on result
function playSound(result) {
    let sound;
    if (result === 'win') {
        sound = document.querySelector('audio[data-sound="you-win"]');
    } else if (result === 'lose') {
        sound = document.querySelector('audio[data-sound="you-lose"]');
    } else {
        sound = document.querySelector('audio[data-sound="draw"]');
    }
    sound.play();
}

// Event listener for rules modal
document.getElementById('openModal').addEventListener('click', handleRulesModal);

// Call the startGame function to initiate the game
startGame();
