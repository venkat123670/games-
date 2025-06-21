let ready = false;
let tapped = false;

function startDuel() {
  const screen = document.getElementById("screen");
  const label = document.getElementById("label");
  const result = document.getElementById("result");

  // Reset
  screen.classList.remove("green");
  label.textContent = "Wait...";
  result.textContent = "";
  ready = false;
  tapped = false;

  // Random delay between 2–5 seconds
  const delay = Math.random() * 3000 + 2000;

  setTimeout(() => {
    screen.classList.add("green");
    label.textContent = "TAP NOW!";
    ready = true;
  }, delay);
}

function handleTap(e) {
  const result = document.getElementById("result");

  if (!ready) {
    result.textContent = "Too early! ❌";
    return;
  }

  if (!tapped) {
    tapped = true;
    result.textContent = "🎉 Player Wins!";
  }
}
