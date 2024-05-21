const imagesFolder = 'images/';
const imageFiles = [
    'cat.jpg', 'dog.jpg', 'fish.jpg', 'bird.jpg',
    'lion.jpg', 'elephant.jpg', 'monkey.jpg', 'tiger.jpg','cat.jpg', 'dog.jpg', 'fish.jpg', 'bird.jpg',
    'lion.jpg', 'elephant.jpg', 'monkey.jpg', 'tiger.jpg'
];


let cardsArray = [];

// Generate card objects based on image files
imageFiles.forEach((fileName, index) => {
    const name = fileName.split('.')[0]; // Extract name without extension
    cardsArray.push({ name: name, img: imagesFolder + fileName });
});

let chosenCards = [];
let matchedCards = [];

function createBoard() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';
    cardsArray.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', index);
        cardElement.addEventListener('click', flipCard);
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', card.img);
        imgElement.setAttribute('data-name', card.name);
        cardElement.appendChild(imgElement);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (chosenCards.length === 2) return;
    this.classList.add('flipped');
    chosenCards.push(this);
    if (chosenCards.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = chosenCards;
    const firstImg = firstCard.querySelector('img');
    const secondImg = secondCard.querySelector('img');
    if (firstImg.getAttribute('data-name') === secondImg.getAttribute('data-name')) {
        matchedCards.push(firstCard, secondCard);
        chosenCards = [];
        if (matchedCards.length === cardsArray.length) {
            alert('Congratulations! You won the game!');
        }
    } else {
        chosenCards.forEach(card => card.classList.remove('flipped'));
        chosenCards = [];
    }
}

function resetGame() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.remove('flipped'));
    chosenCards = [];
    matchedCards = [];
    setTimeout(createBoard, 200);
}

window.onload = createBoard;
