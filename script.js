const wordList = [
    // 4-letter words
    "word", "play", "game",
    // 5-7 letter words
    "apple", "banana", "cherry",
    // 8+ letter words
    "strawberry", "watermelon", "pineapple"
];

let selectWord = '';
let displayedWord = '';
let wrongGuesses = 0;
let guessLetters = []
const maxMistakes = 6 
let gameWonC= 0
let gameLostC = 0
function startGame(level){
    selectWord = getRandomWord(level);

    //update diff display div
    updateDifficultyDisplay(level)

    //create place holder for selected word 
    displayedWord = '_'.repeat(selectWord.length);
    document.getElementById('display-word').textContent = displayedWord.split('').join(' ');

    //hide diff select and show game area
    document.getElementById('difficulty-selection').classList.add('d-none')
    document.getElementById('game').classList.remove('d-none')
    document.getElementById('difficulty-box').classList.remove('d-none')
    document.getElementById('difficulty-selection').classList.add('d-none')
    document.getElementById('difficulty-selection').classList.add('d-none')
    document.getElementById('difficulty-box').classList.add('d-block')
}

function getRandomWord(level){
   let filWords = wordList.filter(word => {
    if (level === 'easy') return word.length <= 4;
    if (level === 'medium') return word.length >= 5 && word.length <= 7;
    if (level === 'hard') return word.length >= 8;
   }) 

   return filWords[Math.floor(Math.random() * filWords.length)];
}

function updateDifficultyDisplay(level){
    let diffbox = document.getElementById('difficulty-box')

    //remove difficulty class
    diffbox.classList.remove('easy', 'medium', 'hard')

    //set text and apply class dynamically using template literals
    diffbox.textContent = `${level.charAt(0).toUpperCase() + level.slice(1)} difficulty`;
    //apply the appropriate css style for chosen Difficulty
    diffbox.classList.add(level);
}

function updateUI() {
  document.getElementById('display-word').textContent = displayedWord.split('').join('  ') // Show word progress with spaces
}

function guessLetter(){
    let inputField = document.getElementById('letter-input');
    let guessLetter = inputField.value.toLowerCase();

    //check if value is between a-z
    if (!guessLetter.match(/^[a-z]$/) ){
         alert('Guess Between a-z')
         inputField.value = '';
         return
    }

    if (guessLetters.includes(guessLetter)){
        alert('You already guessed this letter');
        inputField.value = '';
        return
    } else {
        guessLetters.push(guessLetter);
        inputField.value = '';
    }

    if(selectWord.includes(guessLetter)){
        correctGuess(guessLetter)
    } else {
        wrongGuess(guessLetter)
    }

    inputField.value = '';
    inputField.focus()
}

function wrongGuess(guessLetter){ 
    wrongGuesses++
    document.getElementById('wrong-letters').textContent += ` ${guessLetter}`
    //document.getElementById('shamrock').src = `imgs/shamrock${6-wrongGuesses}.jpg`
  
    document.getElementById('shamrock').src = `imgs/shamrock${wrongGuesses}.jpg`

    if (wrongGuesses === maxMistakes){
      endGame(lost)
    }
  }
  
function correctGuess(guessLetter){

    let newDisplayedWord =''
  
    for (let i=0; i < selectWord.length; i++){
      if (selectWord[i] === guessLetter){
        newDisplayedWord += guessLetter // Replace underscore with correct letter
      }else{
      newDisplayedWord += displayedWord[i] // Keep existing correct letters
      }
    }
  
    displayedWord = newDisplayedWord
    updateUI()
  
    //  Check if the player has guessed all letters
    if (!displayedWord.includes('_')) {
      endGame(true)
    }
  
  }
  
  function endGame(won, lost){
    let message = won
    if (message === won){
      alert('you have won good job')
    } if (message ===lost){
      alert(`you have lost better luck next time the word was ${displayedWord}`)
    }
  setTimeout(() => alert(message), 100); // Display alert after short delay
  setTimeout(() => resetGame(), 500)
  }
  
  // Add event listener for letter input
  document.getElementById('letter-input').addEventListener('keydown', (e) => {
    // Check if the pressed key is a valid letter (a-z)
    if (e.key.match(/^[a-z]$/)) {
      e.preventDefault(); // Prevent the default action (e.g., typing the letter)
      guessLetter(); // Call the existing function to handle the guess
    }
  });

  // Reset Game - Resets all game variables and UI elements to return to home page
  function resetGame() {
    selectWord = '';
    displayedWord = '';
    wrongGuesses = 0;
    guessLetters = [];
    
    // Update the displayed word to show underscores
    document.getElementById('display-word').textContent = '_'.repeat(selectWord.length).split('').join(' ');

    // Clear wrong letters display
    document.getElementById('wrong-letters').textContent = '';
    document.getElementById('letter-input').value = '';
    document.getElementById('letter-input').focus();
    document.getElementById('game').classList.add('d-none');
    document.getElementById('difficulty-selection').classList.remove('d-none');
    document.getElementById('difficulty-box').classList.add('d-none')
  }

  function playcsound(correctGuess) {
    if (correctGuess) {
      let audio = new Audio('Correct Answer sound effect-yt.savetube.me.mp3');
      audio.play();
    }
  }

  function playwsound(wrongGuess) {
    if (wrongGuess) {
      let audio = new Audio('793222__cvltiv8r__monologue-with-dl4-split-474.wav');
      audio.play();
    }
  }