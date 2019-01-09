const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

  // the 'this' keyword represents the element that fired the click event 
      //  console.log(this); returns the element that was clicked

function flipCard(){
  this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));