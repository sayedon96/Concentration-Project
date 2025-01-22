/*-------------- Constants -------------*/

/*---------- Variables (state) ---------*/
let previousCard = '';
let score = 0;
let timeLeft = 60;
let timerInterval;

/*----- Cached Element References  -----*/
const scoreBoard = document.querySelector('#score-board');
const cardsElement = document.querySelectorAll('.cards');
const timerElement = document.querySelector('#timer');
const startButton = document.querySelector('#start-btn');
const startGameWindow = document.querySelector('#start-game-window');
const endGameWindow = document.querySelector('#end-game-window');
const endGameMessage = document.querySelector('#end-game-message');
const playAgainButton = document.querySelector('#play-again-btn');

/*-------------- Functions -------------*/
const hideAllCards = () => {
    cardsElement.forEach(card => {
        card.classList.add('hidden');
    });
};

const shuffleCards = () => {
    const cardsArray = Array.from(cardsElement);
    for (let i = cardsArray.length - 1; i > 0; i--) {
        const mixing = Math.floor(Math.random() * (i + 1));
        cardsArray[i].parentNode.insertBefore(cardsArray[mixing], cardsArray[i].nextSibling);
    }
};

const showStartGameWindow = () => {
    startGameWindow.style.display = 'block';
};

const hideStartGameWindow = () => {
    startGameWindow.style.display = 'none';
};

const showEndGameWindow = (message) => {
    endGameMessage.textContent = message;
    document.querySelector('#final-score').textContent = score;
    endGameWindow.style.display = 'block';
};

const hideEndGameWindow = () => {
    endGameWindow.style.display = 'none';
};

const startGame = () => {
    hideStartGameWindow();
    score = 0;
    timeLeft = 40;
    previousCard = '';
    scoreBoard.textContent = `Score: ${score}`;
    timerElement.textContent = `Time: ${timeLeft}s`;

    const difficulty = document.querySelector('#difficulty').value;
    cardsElement.forEach(card => {
        if (card.dataset.difficulty.includes(difficulty)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });

    setTimeout(hideAllCards, 2500); 
    startTimer();
};

const resetGame = () => {
    hideEndGameWindow();
    window.location.reload();
};

const checkWin = () => {
    if (Array.from(cardsElement).filter(card => card.style.display === 'flex').every(card => !card.classList.contains('hidden'))) {
        showEndGameWindow('You Win! All cards matched!');
        clearInterval(timerInterval);
    } else if (timeLeft === 0) {
        showEndGameWindow('Time Up, You Lose');
        document.getElementById("end-game-message").style.color = 'red';
    }
};

const clickedCards = (event) => {
    if (timeLeft > 0 && event.target.classList.contains('hidden')) {
        event.target.classList.remove('hidden');
        if (previousCard === '') {
            previousCard = event.target;
        } else if (previousCard.textContent === event.target.textContent) {
            score += 50;
            scoreBoard.textContent = `Score: ${score}`;
            previousCard = '';
            checkWin();
        } else {
            setTimeout(() => {
                if (previousCard !== event.target.textContent) {
                    score -= 5;
                    scoreBoard.textContent = `Score: ${score}`;
                }
                previousCard.classList.add('hidden');
                event.target.classList.add('hidden');
                previousCard = '';
            }, 150);
        }
    }
};

const startTimer = () => {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft -= 1;
            timerElement.textContent = `Time: ${timeLeft}s`;
        } else {
            clearInterval(timerInterval);
            checkWin();
        }
    }, 1000);
};

/*----------- Event Listeners ----------*/
startButton.addEventListener('click', startGame);
cardsElement.forEach(card => {
    card.addEventListener('click', clickedCards);
});
window.addEventListener('load', shuffleCards);
playAgainButton.addEventListener('click', resetGame);
window.addEventListener('load', showStartGameWindow);
