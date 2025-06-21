const board = document.getElementById("game-board");
const statusText = document.getElementById("status");

let emojis = ["🍕", "🚀", "🐱", "🎵", "⚽", "💡", "🧠", "🕹️"];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  board.innerHTML = "";
  statusText.textContent = "";
  matchedPairs = 0;
  lockBoard = false;
  firstCard = null;
  secondCard = null;

  const doubled = shuffle([...emojis, ...emojis]);
  cards = [];

  doubled.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.textContent = emoji;
    card.addEventListener("click", handleFlip);
    board.appendChild(card);
    cards.push(card);
  });
}

function handleFlip(e) {
  const clicked = e.target;
  if (lockBoard || clicked.classList.contains("revealed")) return;

  clicked.classList.add("revealed");

  if (!firstCard) {
    firstCard = clicked;
    return;
  }

  secondCard = clicked;
  lockBoard = true;

  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    matchedPairs++;
    resetCards(true);
    if (matchedPairs === emojis.length) {
      statusText.textContent = "🎉 You matched all pairs!";
    }
  } else {
    setTimeout(() => resetCards(false), 1000);
  }
}

function resetCards(match) {
  if (!match) {
    firstCard.classList.remove("revealed");
    secondCard.classList.remove("revealed");
  }
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

startGame();
