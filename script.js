// list all memory-card elements and store them inside the constant named cards.
const cards = document.querySelectorAll('.memory-card');

function flipCard(){
  // access the class list off the memory-card and toggle the flip class. if the flip class is present, remove it. if it's not, add it.
  this.classList.toggle('flip');

  /* console.log('I was clicked!'); // check to make sure function works
  // the 'this' keyword represents the element that fired the click event
  console.log(this); */
}

// loop through the list and for each of the cards listen for a click, when that card is clicked execute the flipCard function
cards.forEach(cards => cards.addEventListener('click', flipCard));