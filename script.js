const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
  if (lockBoard) return;

  this.classList.add('flip');

  if (!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
    return;
  } 

  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

cards.forEach(card => card.addEventListener('click', flipCard));

function checkForMatch(){
  let isMatch = firstCard.dataset.matchnumber === secondCard.dataset.matchnumber;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    lockBoard = false;
  }, 1500);
}