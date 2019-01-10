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
    console.log(firstCard.dataset.matchnumber);
    console.log(secondCard.dataset.matchnumber);
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));