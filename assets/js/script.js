//Variables
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("answer-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

//Fetch
fetch("assets/js/easyquestions.json")
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        console.log(loadedQuestions);
        startGame();
    });

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

//Start Game
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    console.log(availableQuestions);
};

//Questions
getNewQuestion = () => {

    questionCounter++;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

startGame();

