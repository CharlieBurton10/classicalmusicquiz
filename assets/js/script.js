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