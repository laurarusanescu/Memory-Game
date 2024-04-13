const images = [
  { front: "pic1.jpg", back: "back.jpg" },
  { front: "pic2.jpg", back: "back.jpg" },
  { front: "pic3.jpg", back: "back.jpg" },
  { front: "pic4.jpg", back: "back.jpg" },
  { front: "pic5.jpg", back: "back.jpg" },
  { front: "pic6.jpg", back: "back.jpg" },
  { front: "pic7.jpg", back: "back.jpg" },
  { front: "pic8.jpg", back: "back.jpg" },
];

let timeLeft = 60; // Adjust the initial time (in seconds)
let timerInterval;
const timerElement = document.getElementById('timer'); // Assuming you have an element with id="timer"

function showhelp() {
  const helpText = "Welcome to the Memory Game! Your objective is to match all pairs of cards. Click on two cards to reveal their symbols. If the symbols match, the cards will stay face up. If not, they will flip back. Keep flipping cards until all pairs are matched. Good luck!";
  alert(helpText);
}

function assignImages() {
  const shuffledIndices = createPairsAndShuffle();
  const cards = document.querySelectorAll('.card');

  // Loop through each card, assigning front and back images based on shuffledIndices
  cards.forEach((card, index) => {
    const imageIndex = shuffledIndices[index];
    card.style.backgroundImage = `url(${images[imageIndex].front})`; // Use front property for front image
  });
}

function createPairsAndShuffle() {
  const pairs = [];
  images.forEach(image => {
    pairs.push(image);
    pairs.push(image);
  });
  return shuffle(pairs);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let flippedCards = [];
function flipCard(cardIndex) {
  const card = document.querySelectorAll('.card')[cardIndex];

  if (flippedCards.includes(card) || card.classList.contains('matched')) {
    return;
  }

  card.classList.toggle('back-image');
  card.classList.toggle('front-image');

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const image1 = flippedCards[0].style.backgroundImage;
    const image2 = flippedCards[1].style.backgroundImage;

    // If the images match, mark the cards as matched
    if (image1 === image2) {
      flippedCards.forEach(item => item.classList.add('matched'));
      flippedCards = [];
      checkWin();
    } else {
      setTimeout(() => {
        flippedCards.forEach(item => {
          item.classList.toggle('back-image');
          item.classList.toggle('front-image');
        });
        flippedCards = [];
      }, 1000);
    }
  }
}

function checkWin() {
  const allCards = document.querySelectorAll('.card');
  if (allCards.length === document.querySelectorAll('.matched').length) {
    clearInterval(timerInterval);
    alert("Congratulations! You won the game in " + timeLeft + " seconds!");
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      alert("Time's up! You lose!");
    }
    // Update the timer element with the remaining time
    timerElement.textContent = "Time Left: " + timeLeft + " seconds";
  }, 1000);
}


function restart() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.remove('flipped', 'matched');
    card.classList.add('back-image');
  });

  // Reset timer values
  timeLeft = 60;
  clearInterval(timerInterval);

  assignImages();
  startTimer();
}

window.onload = () => {
  assignImages();}
