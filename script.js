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

function wrongGuess(guessedLetter){
    // increment the number of wrong guesses 
    wrongGuesses++;

    // add guessed letter to the guessed Letters array
    document.getElementById('wrong-letters').textContent += `${guessedLetter}`

    document.getElementById('shamrock').src = `img/shamrock${6-wrongGuesses}.jpg` // remember to have photos with the same name and file type 

    if(wrongGuesses === maxMistakes){
        endGame(false)
    } // check to see if the number of wrong guesses === max mistakes
}


function correctGuess(guessedLetter){
    let newDisplayedWord = ''

    for (let i = 0; i < selectWord.length; i++) {
        if(selectWord[i] === guessedLetter){
            newDisplayedWord += guessedLetter ;
} else {
    newDisplayedWord += displayedWord[i];
}
}

displayedWord = newDisplayedWord;
document.getElementById('display-word').textContent = displayedWord;
.split('')
.join(' ')
}

function endGame(won){
    if (won === true){
      setTimeout(() => alert('yeay you won'), 100)
    }else {
    }
  }

  function restartGame(){
    location.reload()
  }