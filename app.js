/*-------------- Constants -------------*/

/*---------- Variables (state) ---------*/
let previousCard = '';
let score = 0;
let timeLeft = 60; 
let timerInterval; // Move timerInterval to the top to make it accessible in all functions
/*----- Cached Element References  -----*/

const scoreBoard = document.querySelector('#score-board');
const cardsElement = document.querySelectorAll('.cards');
const timerElement = document.querySelector('#timer');
const startButton = document.querySelector('#start-btn');
const h2Element = document.querySelector('#H2');
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


const startGame = () => {
    hideAllCards();
    score = 0;
    timeLeft = 45;
    previousCard = '';
    scoreBoard.textContent = `Score: ${score}`;
    h2Element.classList.add('hidden');
    timerElement.textContent = `Time: ${timeLeft}s`;
    startTimer();
    startButton.disabled = true;

};

const resetGame = () => {
    window.location.reload();

}

const checkWin = () => {
    if (Array.from(cardsElement).every(card => !card.classList.contains('hidden'))) {
        h2Element.textContent = 'You Win! All cards matched!';
        h2Element.classList.remove('hidden');
        document.getElementById("H2").style.color = "green";
        clearInterval(timerInterval); 
        setInterval(resetGame, 2500);
    } else if (timeLeft === 0) {
        h2Element.textContent = 'Time Up, You Lose';
        h2Element.classList.remove('hidden');
        setInterval(resetGame, 25000)
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
        }else {
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
