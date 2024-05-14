const choices = ["rock", "paper", "scissors", "lizard", "spock"];
let userChoice = "";
let computerChoice = "";

// Function to generate computer's choice
function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * choices.length);
    return choices[randomNumber];
}

// Function to determine the winner
function determineWinner(user, computer) {
    if (user === computer) {
        return "It's a tie!";
    } else if ((user === "rock" && (computer === "scissors" || computer === "lizard")) ||
               (user === "paper" && (computer === "rock" || computer === "spock")) ||
               (user === "scissors" && (computer === "paper" || computer === "lizard")) ||
               (user === "lizard" && (computer === "paper" || computer === "spock")) ||
               (user === "spock" && (computer === "rock" || computer === "scissors"))) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}

// Function to display the result
function displayResult(result) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p>${result}</p>`;
}

// Function to update the computer's choice in the UI
function updateComputerChoice(computer) {
    const computerChoiceDiv = document.getElementById("computer-choice");
    computerChoiceDiv.innerHTML = computer;
}

// Function to reset the game
function resetGame() {
    userChoice = "";
    computerChoice = "";
    displayResult("");
    updateComputerChoice("");
}

// Event listeners for user's choice
document.querySelectorAll(".choices img").forEach(choice => {
    choice.addEventListener("click", () => {
        userChoice = choice.alt.toLowerCase();
        computerChoice = generateComputerChoice();
        displayResult(determineWinner(userChoice, computerChoice));
        updateComputerChoice(computerChoice);
    });
});

// Event listener for resetting the game
document.getElementById("rock").addEventListener("click", resetGame);
document.getElementById("paper").addEventListener("click", resetGame);
document.getElementById("scissors").addEventListener("click", resetGame);
document.getElementById("lizard").addEventListener("click", resetGame);
document.getElementById("spock").addEventListener("click", resetGame);
