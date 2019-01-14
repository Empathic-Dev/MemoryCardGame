const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
  this.classList.add('flip');

  if (!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));

function checkForMatch() {
  if (firstCard.dataset.matchnumber === secondCard.dataset.matchnumber) {
    disableCards();
  }
  else {
    unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
  }, 1500);
}
}