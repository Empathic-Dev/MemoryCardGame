// list all memory-card elements and store them inside the constant named cards.
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard(){
  // access the class list off the memory-card and add the flip class. if the flip class is present, remove it. if it's not, add it.
  this.classList.toggle('flip');

  // if hasFlippedCard is false this means that this is the first time the player has clicked a card, if its true that means the player clicked the second card
  if (!hasFlippedCard){
    // first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // second click
    hasFlippedCard = false;
    secondCard = this;

  // do cards match?
  }

  /* console.log('I was clicked!'); // check to make sure function works
  // the 'this' keyword represents the element that fired the click event
  console.log(this); */
}

// loop through the list and for each of the cards listen for a click, when that card is clicked execute the flipCard function
cards.forEach(cards => cards.addEventListener('click', flipCard));