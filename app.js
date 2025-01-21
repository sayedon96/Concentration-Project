/*-------------- Constants -------------*/

/*---------- Variables (state) ---------*/
let previousCard = '';
let score = 0;
let timeLeft = 60; 
let timerInterval; // Move timerInterval to the top to make it accessible in all functions
/*----- Cached Element References  -----*/
// const card1Element = document.querySelector('#card1');
// const card2Element = document.querySelector('#card2');
// const card3Element = document.querySelector('#card3');
// const card4Element = document.querySelector('#card4');
// const card5Element = document.querySelector('#card5');
// const card6Element = document.querySelector('#card6');
// const card7Element = document.querySelector('#card7');
// const card8Element = document.querySelector('#card8');
// const card9Element = document.querySelector('#card9');
// const card10Element = document.querySelector('#card10');
// const card11Element = document.querySelector('#card11');
// const card12Element = document.querySelector('#card12');
// const card13Element = document.querySelector('#card13');
// const card14Element = document.querySelector('#card14');
// const card15Element = document.querySelector('#card15');
// const card16Element = document.querySelector('#card16');
// const card17Element = document.querySelector('#card17');
// const card18Element = document.querySelector('#card18');
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
    timeLeft = 60;
    previousCard = '';
    scoreBoard.textContent = `Score: ${score}`;
    h2Element.classList.add('hidden');
    timerElement.textContent = `Time: ${timeLeft}s`;
    startTimer();
};

const resetGame = () => {
    window.location.reload();

}

const checkWin = () => {
    if (Array.from(cardsElement).every(card => !card.classList.contains('hidden'))) {
        h2Element.textContent = 'You Win! All cards matched!';
        h2Element.classList.remove('hidden');
        clearInterval(timerInterval); 
    } else if (timeLeft === 0) {
        h2Element.textContent = 'Time Up, You Lose';
        h2Element.classList.remove('hidden');
    }
};

const clickedCards = (event) => {
    if (timeLeft > 0 && event.target.classList.contains('hidden')) {
        event.target.classList.remove('hidden');
        if (previousCard === '') {
            previousCard = event.target;
        } else if (previousCard.textContent === event.target.textContent) {
            score += 2;
            scoreBoard.textContent = `Score: ${score}`;
            previousCard = '';
            checkWin();
        } else {
            setTimeout(() => {
                previousCard.classList.add('hidden');
                event.target.classList.add('hidden');
                previousCard = '';
            }, 1000);
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
