/*jshint esversion: 11 */
//Variables
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("answer-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let url = window.location.href;
let params = new URLSearchParams(window.location.search);
let level = params.get("level");

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

// Used James Q Quick video on YouTube for reference-link can be found in credits section of README file

if (level === "easy"){
    questions = easyquestions;
    startGame();
} else if (level === "hard"){
    questions = hardquestions;
    startGame();
}

//Start Game
function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

// Countdown timer for quiz
var timeLeft = 45;
var timer = setInterval(function() {
timeLeft--;
document.getElementById('timer').textContent = timeLeft;
if (timeLeft <= 0) {
clearInterval(timer);
alert('Time is up! The quiz will now restart!');
window.location = 'index.html';
window.location.reload();
}
var setTimer = true;
if (setTimer) {
    true > timer;
} else ( timeLeft = 0); 
}, 1000);

//Questions
function getNewQuestion(){
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // Saves to local storage
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
        }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

//Setting choices
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

// Goes through all choices and attaching a click event to them
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        // Applies css styling for right or wrong answers choosen 
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        selectedChoice.closest(".answer-container").classList.add(classToApply);

        // Increments players score for choosing the right answers
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        setTimeout(() => {
            selectedChoice.closest(".answer-container").classList.remove(classToApply);
            getNewQuestion();
        }, 1500);
    });
});   

function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}