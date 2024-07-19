/*jshint esversion: 11 */
//Variables
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");



finalScore.innerText = mostRecentScore;

