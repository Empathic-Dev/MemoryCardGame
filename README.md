# MemoryCardGame
Memory Card Game - JavaScript Tutorial via FreeCodeCamp/CodeSketch

## Flip Card Logic Notes

```javascript
// makes a list of all card elements and store them in a constant:
const cards = document.querySelectorAll('.memory-card');

// the 'this' keyword is dynamically set according to the context. in this context this = the card element that was clicked. so what this function does is accessed the 'classList' from the memory card and toggle the 'flip' class:
function flipCard(){
  this.classList.toggle('flip');
}

// loops through the list of card elements and listens for a click event that runs the flipCard function
cards.forEach(card => card.addEventListener('click', flipCard));

```

### 3D Effect & CSS Perspective Notes

```css
/*when the flip class is present, rotate the element 180 deg*/
memory-card.flip{
  transform: rotateY(180deg);
}

/*the perspective property is what transforms container elements into a 3D space and the transform-style property is what allows nested elements to render in 3D space:*/
memory-game{
  perspective: 1000px; /*creates the 3d space for the cards*/
}
memory-card{
  transform-style: perspective-3d; /*renders the card in the 3d space*/
}
/*when you click on the card it flips but shows the mirrored version of itself. thats because every element has a front face and back face and there is a css property to hide it:*/
front-face, .back-face{
  backface-visibility: hidden; 
}
/*in order to see the front of the card we'll have to rotate it:*/
front-face{
  transform: rotateY(180deg);
}
```

## Store Card Logic Notes

```javascript
/*when a player clicks a card we have to know if its the first or the second card they clicked so we can perform the matching logic*/
let hasFlippedCard = false; 
let firstCard, secondCard;

function flipCard(){
  this.classList.add('flip');

// if hasFlippedCard is false, this is the first card the player clicked. if true this is the second card the player clicked
  if (!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this; // this in this context represents the first card
  } else {
    hasFlippedCard = false;
    secondCard = this; // this in this context represents the second card
  }
}
```

Now that we have the clicked cards stored in a variable, we have to check is they match. To do that we can make use of a the "data-". Its a handy HTML attribute that allows you to store any kind of information you want:

```html
<!--you can name your data anything you want. however everything has to be lowercase or it wont work.-->
<div class="memory-card" data-matchnumber="firstmatch">
  <img src="/imgs/front-face1.png" alt="" class="front-face">
  <img src="/imgs/back-face.png" alt="" class="back-face">
</div>
```

In order to access the data values we set in the HTML we have to use the .dataset object:

```javascript
//after you click the second card the console will return the value of matchnumber, the data attribute you set:
    console.log(firstCard.dataset.matchnumber);
    console.log(secondCard.dataset.matchnumber);
```

## Match Card Logic Notes

Now that we can identify the cards we have to check if the dataset.matchnumber from the first and second card are the same.

```javascript
  if (firstCard.dataset.matchnumber === secondCard.dataset.matchnumber){
// if they are the same, remove the event listener and flipCard function to prevent them from being clicked and flipped back:
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  } else {
//if not matching, remove the flip class so they flip back. Because this happens so fast we have to wrap it in a timer method:
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
    }, 1500);
  }
```

## Refactoring Notes

Nesting functions is hard to read so before we move on we're going to separate these functions:

```javascript
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
```

Now that the functions are separated theres an even shorter way to shorten our code using a ternary operator:

```javascript
function flipCard(){
  this.classList.add('flip');

  if (!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
    return; // instead of an else statement we can just use the return statement so it exits the function
  }

  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}


function checkForMatch() {
  if (firstCard.dataset.matchnumber === secondCard.dataset.matchnumber){
    disableCards();
  }
  else {
    unflipCards();
}
```

## Lock Board Notes

Right now a player can flip all the cards without having to wait for the unflip logic to run. We can lock the board so the player has to wait for the cards to flip back:

```javascript
// first we create a boolean named lockBoard
let lockBoard = false;

// inside flipCard(), if lockBoard is true, return from the function. this stops the other cards from flipping
  if (lockBoard) return;

// incase the first two cards are not a match lock the board and only unlock it if the other cards have been flipped. We unlock the board in unflipCards()
  lockBoard = true;

```

## Card Double Click Notes

When a player clicks twice over the same card isMatch is going to set itself to true and disable the cards by removing it's event listener. we have to add a condition to the beginning of flipCard() to avoid that.

```javascript
// so if it's the first card click then the 'this' var holds the first card but the firstCard var is still unset. So the condition is going to evaluate to false and the function will be executed normally. if it's the second card click then the 'this' var holds the second card. Incase that equals firstCard then it will return from the function
  if (this === firstCard) return;

// in order for the condition to work after each round, we have to set firstCard and secondCard to null and extract that into its own method.
function resetBoard(){
  [hasFlippedCard, lockBoard] = [false, false];
// this is an es6 destructuring assignment which keeps our code short
  [firstCard, secondCard] = [null, null];
}
```

## Shuffling Notes

The last thing we have to do is shuffle the cards. We do this by using a flexbox property, order. Its a flex items property and it's default is 0. Which means that ever flex item belongs to the same group and they're grouped by src order. If you assign a different integer to the order property, the items will be ordered first by ascending order then my src order.

So in order for us to shuffle our cards we're going to randomly generate a number between 0-11 and assign it to each of the cards. To generate a random whole number we use Math.random() wrapped in Math.floor().

Math.random() returns a number between 0 and 1, excluding 1. Since we want a number between 0 and 11 we multiple Math.random by 12. 

```javascript

function shuffle(){
  cards.forEach(card => {
    let ransomPos = Math.floor(Math.random() * 12);
  });
}

```

Now that we have the random number we can apply it to the order property

```javascript

function shuffle(){
  cards.forEach(card => {
    let ransomPos = Math.floor(Math.random() * 12);
    card.style.order = ransomPos;
  });
}

```

The cards to be shuffled before the player starts the game. So instead of calling shuffle() we can wrap it inside ()'s then add another pair of ()'s at the end to convert it into an IIFE (Immediately Invoked Function Expression)

```javascript

(function shuffle(){
  cards.forEach(card => {
    let ransomPos = Math.floor(Math.random() * 12);
    card.style.order = ransomPos;
  });
})();

```

And the game is finally fucking finished!!! I'm so proud of myself for getting this done ^-^ 