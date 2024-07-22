/*jshint esversion: 11 */
//Variables
let url = window.location.href;
let params = new URLSearchParams(window.location.search);
let level = params.get("level");

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
    setTimer = true;
};