const board = document.querySelector('#memory-board');
const message =  document.querySelector('#message');
const resetBtn = document.querySelector('.reset-game');
let isFlipped = false; // player has not clicked any card at first
let lockBoard = false; // lock the Board before cards finish un-flipping and stop flipping another cards (because there is a timer function set to 1500 milliseconds)
let firstCard, secondCard;
let animals = ['duck', 'duck', 'cat', 'cat', 'cow', 'cow', 'dog', 'dog', 'flamingo', 'flamingo', 'fox', 'fox', 'frog', 'frog', 'lizard', 'lizard', 'panda', 'panda', 'tiger', 'tiger'];

function renderCard(animal) {
    let card = document.createElement('div');
    card.classList.add('memory-card');
    card.setAttribute('data-animal', animal);
    board.appendChild(card);
    let frontFaceImg = document.createElement('img');
    frontFaceImg.classList.add('front-face');
    frontFaceImg.setAttribute('src', `images/${animal}.jpg`);
    frontFaceImg.setAttribute('alt', `${animal}`);
    card.appendChild(frontFaceImg);
    let backfaceImg = document.createElement('img');
    backfaceImg.classList.add('back-face')
    backfaceImg.setAttribute('src', 'images/colors.jpg');
    backfaceImg.setAttribute('alt', 'back-face image colors');
    card.appendChild(backfaceImg);
    return card;
};

animals.forEach(animal => {
    renderCard(animal); // render all cards
});


const cards = Array.from(document.querySelectorAll(".memory-card"));

function flipCard () {
    if (lockBoard) return; // if it's true, return from the function and stop executing flipping cards
    if (this === firstCard) return; // to disable double click on the same card 
    // console.log(this); // test
    // this.classList.toggle('flip'); // this is for testing purpose
    this.classList.add('flip');

    if (!isFlipped) {
        // on first click
        isFlipped = true;
        firstCard = this;
        return; // if this condition is true, function stops executing. If not, function continues executing
    };       
    // on second click -> isFlipped = false;
    secondCard = this;
    checkForMatch(); // invoke
    checkAllFlipped(); // invoke
};

function checkForMatch() {
    // do they match ?
    let matched = (firstCard.dataset.animal === secondCard.dataset.animal);
    matched ? disableCards() : unFlipCards();
};

function disableCards() {
    // disabling matched cards to be clicked again
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard(); // invoke
};

function unFlipCards() {
    lockBoard = true; // lock the Board and prevent other cards to be flipped over 
    setTimeout(function(){
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard(); // invoke
     }, 1500);
    //  lockBoard = false;  // unlock the Board and enable other cards to be flipped 
};

function resetBoard() {
    [isFlipped, lockBoard] = [false, false]; //  ES6 destructuring
    [firstCard, secondCard] = [null, null];
};

function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 20);
        card.style.order = randomPosition;
    });
}; 
shuffle();
// function wrapped in () and then followed by (), means that, that is immediately invoked function, after it's definition

function checkAllFlipped() {
    setTimeout(function(){
        // every() - Returns true if all the elements in the array pass the test, otherwise it returns false
    const checkIfAll = cards.every( card => card.classList.contains('flip')); 
    if (checkIfAll) {
        message.style.transform = "scale(1)";
    };
    }, 1000); 
};

function resetGame() {
    cards.forEach(card => card.classList.remove('flip'));
    shuffle(); // invoke
    cards.forEach(card => card.addEventListener('click', flipCard));
    message.style.transform = "scale(0)";
    resetBoard(); // invoke
};

// Adding eventListeners
resetBtn.addEventListener('click', resetGame);
cards.forEach(card => card.addEventListener('click', flipCard));