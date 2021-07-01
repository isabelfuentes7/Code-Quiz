var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("quizQuestions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("A");
var buttonB = document.getElementById("B");
var buttonC = document.getElementById("C");
var buttonD = document.getElementById("D");

var quizQuestions = [{

    question: "Who created Javascript?",
    choiceA: "Robert Frost",
    choiceB: "Brendan Eich",
    choiceC: "Elon Musk",
    choiceD: "Dennis Ritchie",
    correctAnswer: "B"},

  {

    question: "Which of the following is a valid type of function javascript supports?",
    choiceA: "named function",
    choiceB: "anonymus function",
    choiceC: "both the above ",
    choiceD: "none of the above",
    correctAnswer: "C"},

   {

    question: " Inside which HTML element do we put the JavaScript?",
    choiceA: "<js>",
    choiceB: "<scripting>",
    choiceC: "<script>",
    choiceD: "<javascript>",
    correctAnswer: "C "},

    {

    question: "Which of the following best describes JavaScript?",
    choiceA: "a low-level programming language.",
    choiceB: "a scripting language precompiled in the browser.",
    choiceC: "a compiled scripting language.",
    choiceD: "an object-oriented scripting language.",
    correctAnswer: "D"},

    {

    question: " Why so JavaScript and Java have similar name?",
    choiceA: "They both originated on the island of Java",
    choiceB: "JavaScript is a stripped-down version of Java",
    choiceC: "JavaScript's syntax is loosely based on Java's",
    choiceD: "None of the above",
    correctAnswer: "C"},  

    ];


var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();

    } 

    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;

};

function startQuiz(){

    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();

        }

      }, 1000);

    quizBody.style.display = "block";

}

function showScore(){

    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";

}

submitScoreBtn.addEventListener("click", function highscore(){

    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;

    }else{

        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score

        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

function generateHighscores(){

    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];

    for (i=0; i<highscores.length; i++){

        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);

    }

}

function showHighscore(){

    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();

}

function clearScore(){

    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";

}

function replayQuiz(){

    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;

}
function checkAnswer(answer){

    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){

        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();

    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){

        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();

    }else{

        showScore();

    }

}

startQuizButton.addEventListener("click",startQuiz);