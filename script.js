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
let wrongGuess = 0;
let guessedWord = []
const maxMistakes = 6 

function startGame(level){
    selectWord = getRandomWord(level);

    //hide diff sleect and show game area

    //hide diff
    document.getElementById('difficulty-selection').classList.add('d-none')

    //remove d-npne from difficulty box and game area
    document.getElementById('game').classList.remove('d-none')
    document.getElementById('difficulty-selection').classList.add('d-none')
    //add d-block to #difficultybox
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