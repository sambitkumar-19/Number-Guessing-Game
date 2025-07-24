let randomNumber = Math.floor(Math.random() * 10) + 1;
let guesses = [];
let maxGuesses = 10;

const guessField = document.getElementById("guessInput");
const submitBtn = document.getElementById("subt");
const restartBtn = document.getElementById("restartBtn");
const endBtn = document.getElementById("endBtn");

const guessesDisplay = document.querySelector(".guesses");
const remainingDisplay = document.querySelector(".LastResult");
const resultMessage = document.querySelector(".LoOrHi");
const finalMessage = document.querySelector(".finalMessage"); // NEW

function resetGame() {
  randomNumber = Math.floor(Math.random() * 10) + 1;
  guesses = [];
  remainingDisplay.textContent = maxGuesses;
  guessesDisplay.textContent = "";
  resultMessage.textContent = "";
  finalMessage.textContent = ""; // Reset final message
  resultMessage.className = "";
  guessField.disabled = false;
  submitBtn.disabled = false;
  guessField.value = "";
}

function endGame(message, isWin = false) {
  resultMessage.textContent = message;
  resultMessage.className = isWin ? "win" : "lose";
  guessField.disabled = true;
  submitBtn.disabled = true;

  finalMessage.textContent = isWin
    ? "🎊 Congratulations! You won the game!"
    : "💔 Bad luck! Try again next time.";
}

submitBtn.addEventListener("click", function () {
  const userGuess = Number(guessField.value);

  if (!userGuess || userGuess < 1 || userGuess > 10) {
    alert("Please enter a valid number between 1 and 10!");
    return;
  }

  guesses.push(userGuess);
  guessesDisplay.textContent = guesses.join(", ");
  remainingDisplay.textContent = maxGuesses - guesses.length;

  if (userGuess === randomNumber) {
    endGame("🎉 Congratulations! You guessed it right!", true);
  } else if (guesses.length >= maxGuesses) {
    endGame(`❌ You lost! The number was ${randomNumber}`, false);
  } else {
    resultMessage.textContent = userGuess < randomNumber ? "📉 Too low!" : "📈 Too high!";
    resultMessage.className = "";
  }

  guessField.value = "";
});

restartBtn.addEventListener("click", resetGame);
endBtn.addEventListener("click", () => endGame("Game has been ended manually.", false));
