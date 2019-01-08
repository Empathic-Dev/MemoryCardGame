# MemoryCardGame
Memory Card Game - JavaScript Tutorial via FreeCodeCamp/CodeSketch

## JavaScript Notes

```javascript
// makes a list of all card elements and store them in a constant:
const cards = document.querySelectorAll('.memory-card');

// 
function flipCard(){

// the 'this' keyword is dynamically set according to the context. in this context this = the card element that was clicked. so what this function does is accessed the 'classList' from the memory card and toggle the 'flip' class:
this.classList.toggle('flip');
}

// loops through the list of cards and listens for a click event that runs the flipCard function
cards.forEach(card => card.addEventListener('click', flipCard));

```

### CSS Notes

```css
/*when the flip class is present, rotate the element 180 deg*/
.memory-card.flip{
  transform: rotateY(180deg);
}
```