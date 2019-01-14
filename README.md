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