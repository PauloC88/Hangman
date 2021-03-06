function validateFormat(input) {
  return /^[A-Z]{4,15}$/.test(input);
}

let wordLength;

function startGame() {
  let word = document.getElementById("wordToGuess").value
  word = word.toUpperCase();
  wordLength = word.length;
  if (!validateFormat(word)) {
    let warningMessage = document.querySelector("warning_message");
    warningMessage.innerHTML = "&nbsp Word not accepted! Please read again the instructions above!";
  } else {
    let player1Area = document.getElementById("player1Area");
    player1Area.style.display="none";
    let player2Area = document.getElementById("player2Area");
    player2Area.style.display="block";
    insertUnderscores(word);
    createLettersGrid(); 
  }
}

function insertUnderscores(word) {
  let gridContainerWord = document.querySelector(".grid-container-word");
  let wordArray = Array.from(word);
  for (let wordLetter of wordArray) {
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid-item-word");
    gridItem.setAttribute("id", wordLetter);
    gridItem.innerHTML = "_";
    gridContainerWord.appendChild(gridItem);
  }
}

function createLettersGrid() {
  let gridContainerLetters = document.querySelector(".grid-container-letters");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let alphabetArray = Array.from(alphabet);
  for (let letter of alphabetArray) {
    let gridItem = document.createElement("BUTTON");
    gridItem.classList.add("grid-button-letters");
    gridItem.setAttribute("id", letter + letter);
    gridItem.setAttribute("type", "submit");
    gridItem.onclick = function() {chooseLetter(letter);};
    gridItem.innerHTML = letter;
    gridContainerLetters.appendChild(gridItem);
  }
}

let stage = 0;
let guessedLetters = 0;
let searchResult;

function chooseLetter(letter) {
  let wordLetter = document.getElementById(letter);
  let button = document.getElementById(letter + letter);
  searchResult = document.querySelector("searchResult");
  if (wordLetter === null) {
    searchResult.innerHTML = "<p style=\"color:red;\"><b>Sorry! Try again! Better luck next time!</b></p>";
    button.disabled = true;
    ++stage;
    let image = document.getElementById("stage_image");
    image.src = "StageImages\\Stage" + stage + ".png";
    image.alt = "Stage " + stage;
  } else {
    searchResult.innerHTML = "<p style=\"color:mediumblue;\"><b>Great! You guessed one! Choose one more!</b></p>";
    button.disabled = true;
    let gridItems = document.getElementsByClassName("grid-item-word");
    for(let i = 0; i < gridItems.length; ++i) {
      if (gridItems[i].id === letter) {
        gridItems[i].innerHTML = letter;
        ++guessedLetters;
      }
    }
  }
  announceWinner();
}

function announceWinner() {
  let announceWinner = document.querySelector("announceWinner");
  let newGame = document.querySelector("new_game");
  if (stage === 7) {
    searchResult.innerHTML = "";
    announceWinner.innerHTML = "<h2 style=\"color:fuchsia;\"><b> Player 1 wins the game! Congrats Player 1! </b></h2>";
    disableButtons();
    newGame.innerHTML = "<button type=\"submit\" class=\"btn btn-success\" onclick=\"window.location.reload();\">New Game</button>";
  } else if (guessedLetters === wordLength) {
    searchResult.innerHTML = "";
    announceWinner.innerHTML = "<h2 style=\"color:fuchsia;\"><b> Player 2 wins the game! Congrats Player 2! </b></h2>";
    disableButtons();
    newGame.innerHTML = "<button type=\"submit\" class=\"btn btn-success\" onclick=\"window.location.reload();\">New Game</button>";
  }
}

function disableButtons() {
  let allButtons = document.getElementsByClassName("grid-button-letters");
  for (let btn of allButtons) {
      btn.disabled = true;
  }
}
