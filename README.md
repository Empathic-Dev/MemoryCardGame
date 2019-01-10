# MemoryCardGame
Memory Card Game - JavaScript Tutorial via FreeCodeCamp/CodeSketch

## JavaScript Notes

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

### CSS Notes

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