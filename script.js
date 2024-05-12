document.addEventListener("DOMContentLoaded", function () {
    // MODAL
    const modal = document.querySelector("#modal");
    const modalContent = document.querySelector("#modalContent");
    const btnOpenModal = document.querySelector("#openModal");
    const xCloseModal = document.querySelector("#closeModal");

    btnOpenModal.addEventListener("click", () => {
        modal.style.display = "block";
        modalContent.style.top = 0;
    })

    xCloseModal.addEventListener("click", () => {
        modal.style.display = "none";
    })

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    })

    // GLOBALS
    const allChoices = ["rock", "paper", "scissors", "lizard", "spock"];
    const startPage = document.querySelector("#startPage");
    const arrChoices = startPage.querySelectorAll(".choices");
    const resultPage = document.querySelector("#resultPage");
    const containerScore = document.querySelector(".score");
    const score = document.querySelector("#score");
    const userIcon = document.querySelector("#userIcon");
    const houseIcon = document.querySelector("#houseIcon");
    const messageWhoWin = document.querySelector("#whoWin");
    const playAgainButton = document.querySelector("#playAgain");
    //SOUNDS GLOBALS
    const bgSound = document.querySelector("[data-sound=bg-sound]");
    const audioUserChoice = document.querySelector("[data-sound=user-choice]");
    const audioYouWin = document.querySelector("[data-sound=you-win]");
    const audioYouLose = document.querySelector("[data-sound=you-lose]");
    const audioDraw = document.querySelector("[data-sound=draw]");

    let scoreTotal = 0;

    // START PLAY
    const handleClick = (event) => {
        audioUserChoice.play();
        document.body.classList.toggle("result")
        userIcon.classList.remove(...allChoices);
        houseIcon.classList.remove(...allChoices);
        playAgainButton.style.display = "none";
        messageWhoWin.style.display = "none";
        houseIcon.style.display = "none";

        const userPlayerChoice = event.target.dataset.choice;
        const housePlayerIndex = Math.floor(Math.random() * 5);
        const housePlayerChoice = allChoices[housePlayerIndex];

        startPage.style.display = "none";
        resultPage.style.display = "flex";
        userIcon.classList.add(userPlayerChoice);
        houseIcon.classList.add(housePlayerChoice);
        houseIcon.style.display = "block";

        setTimeout(() => {
            document.body.classList.toggle("result")
            const result = getResult(userPlayerChoice, housePlayerChoice);
            displayResult(result, userPlayerChoice, housePlayerChoice);
            startPage.style.display = "flex";
            resultPage.style.display = "none";
        }, 2000);
    };

    arrChoices.forEach(choice => {
        choice.addEventListener("click", handleClick);
    });

    // GET RESULT
    const getResult = (userChoice, houseChoice) => {
        if (userChoice === houseChoice) return "draw";
        switch (userChoice) {
            case "rock":
                return houseChoice === "scissors" || houseChoice === "lizard" ? "win" : "lose";
            case "paper":
                return houseChoice === "rock" || houseChoice === "spock" ? "win" : "lose";
            case "scissors":
                return houseChoice === "paper" || houseChoice === "lizard" ? "win" : "lose";
            case "lizard":
                return houseChoice === "paper" || houseChoice === "spock" ? "win" : "lose";
            case "spock":
                return houseChoice === "rock" || houseChoice === "scissors" ? "win" : "lose";
        }
    };

    // DISPLAY RESULT
    const displayResult = (result, userChoice, houseChoice) => {
        audioUserChoice.pause();
        switch (result) {
            case "win":
                audioYouWin.play();
                messageWhoWin.textContent = "You win!";
                messageWhoWin.style.color = "#4caf50";
                scoreTotal++;
                break;
            case "lose":
                audioYouLose.play();
                messageWhoWin.textContent = "You lose!";
                messageWhoWin.style.color = "#f44336";
                scoreTotal--;
                break;
            case "draw":
                audioDraw.play();
                messageWhoWin.textContent = "It's a draw!";
                messageWhoWin.style.color = "#2196F3";
                break;
        }
        score.textContent = scoreTotal;
        playAgainButton.style.display = "block";
        messageWhoWin.style.display = "block";
    };

    // PLAY AGAIN
    playAgainButton.addEventListener("click", () => {
        audioYouWin.pause();
        audioYouLose.pause();
        audioDraw.pause();
    });

    // TOGGLE SOUND
    const btnSwitch = document.querySelector("#switch");
    btnSwitch.addEventListener("click", () => {
        const sounds = document.querySelectorAll("audio");
        sounds.forEach(sound => sound.muted = !sound.muted);
        btnSwitch.textContent = bgSound.muted ? "Sound ON" : "Sound OFF";
    });
});
