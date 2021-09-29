var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var allQuestion=document.getElementById("allQuestion")
var startQuizButton = document.getElementById("startbtn");
var main=document.getElementById("main")

var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var playAgain = document.getElementById("playAgain");
var highscoreInputName = document.getElementById("initials");
var clearHighscore = document.getElementById("clearHighscore");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("startPageHighscore");
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
    correctAnswer: "C"},

    {

    question: "Which of the following best describes JavaScript?",
    choiceA: "a low-level programming language.",
    choiceB: "a scripting language precompiled in the browser.",
    choiceC: "a compiled scripting language.",
    choiceD: "an object-oriented scripting language.",
    correctAnswer: "D"},

    {

    question: " Why do JavaScript and Java have a similar name?",
    choiceA: "They both originated on the island of Java",
    choiceB: "JavaScript is a stripped-down version of Java",
    choiceC: "JavaScript's syntax is loosely based on Java's",
    choiceD: "None of the above",
    correctAnswer: "C"},  

    ];
    startQuizButton.addEventListener("click", startQuiz);

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
let questionCount = 0;
var timerInterval;
var score = 0;
var correctAnswer = 0
var correct;
var scorePer = 0
function home() {
    startQuizDiv.style.display = "block";
    quizBody.style.display = "none";
    gameoverDiv.style.display="none";
    highscoreContainer.style.display="none"
    
}
window.onload = home;


// Quiz start
startQuizButton.addEventListener("click",startQuiz);
function startQuiz() {
    startQuizDiv.style.display = "none";
    quizBody.style.display = "block";
    gameoverDiv.style.display="none";
    highscoreContainer.style.display="none"
    questionCount = 0;
    setTime();
    generateQuizQuestion(questionCount);
}
// Timer count
function setTime() {
    let timerInterval = setInterval(function () {
        timeLeft--;
        quizTimer.textContent = `Time:${timeLeft}s`;

        if (timeLeft === 0 || questionCount === quizQuestions.length) {
            clearInterval(timerInterval);
            quizBody.style.display = "none";
            
            gameoverDiv.style.display = "block";
            finalScoreEl.style.display = "block";
            highscoreContainer.style.display="none"
            quizTimer.textContent = timeLeft;
        }
    }, 1000);
    
}

// Set Questions
function generateQuizQuestion(id) {
    if (id < quizQuestions.length) {
        questionsEl.textContent = quizQuestions[id].question;
        buttonA.textContent = quizQuestions[id].choiceA;
        buttonB.textContent = quizQuestions[id].choiceB;
        buttonC.textContent = quizQuestions[id].choiceC;
        buttonD.textContent = quizQuestions[id].choiceD;
    }else{
        gameOver()
    }
}

//Check Answer
function checkAnswer(answer){
    resultsEl.style.display = "block";
    let p = document.createElement("p");
    resultsEl.appendChild(p);

    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    correct = quizQuestions[questionCount].correctAnswer;

    if (quizQuestions[questionCount].correctAnswer === answer) {
        p.textContent = "Correct!";
        correctAnswer=correctAnswer + 1
    }else if (answer !== quizQuestions[questionCount].correctAnswer && currentQuestionIndex !== finalQuestionIndex){
        timeLeft = timeLeft - 10;
        p.textContent = "Wrong!";
        }

    if (questionCount < quizQuestions.length) {
        questionCount++;
    }
    if(questionCount > quizQuestions.length){
        gameoverDiv.style.display = "block";
        finalScoreEl.style.display = "block";
        gameOver();
    }
    generateQuizQuestion(questionCount);

}


//Quiz complete
function gameOver() {
    
    scorePer=(correctAnswer/quizQuestions.length)*100
    finalScoreEl.textContent = `Score: ${scorePer}`;
   
  }

  //Save Score
var score_list=[]
  submitScoreBtn.addEventListener("click",saveScore);
  function saveScore(){
    let scoreWithName = highscoreInputName.value.toUpperCase();
    score_list = JSON.parse(localStorage.getItem("score_list"));
    if(score_list==null){
        score_list=[]
        score_list.push({ name: scoreWithName, score: scorePer });
    }else{
    score_list.push({ name: scoreWithName, score: scorePer });
    }
    storeScores()
  }

  //Store Score in local Storage
  function storeScores() {
    
    localStorage.setItem("score_list", JSON.stringify(score_list));
    showHighscore()
}

//Display all score
highscoreDisplayScore.addEventListener("click",showHighscore);
function showHighscore(){
    gameoverDiv.style.display = "none";
    finalScoreEl.style.display = "none";
    startQuizDiv.style.display = "none";
    highscoreContainer.style.display="block";
    var temp=[]
    let storedScoreList =[]
     storedScoreList = JSON.parse(localStorage.getItem("score_list"));

      console.log(storedScoreList)
      storedScoreList.sort(function (a, b) {return b.score - a.score;});
      document.getElementById("name").textContent=''
      document.getElementById("name-score").textContent=''
if(storedScoreList.length>10){
    for(i=0; i < 10; i++){
        div=document.createElement("div")   
        div1=document.createElement("div")   
        div.innerHTML=  storedScoreList[i].name
        div1.innerHTML=  storedScoreList[i].score
        document.getElementById("name").appendChild(div)
        document.getElementById("name-score").appendChild(div1)
      }
}else if(storedScoreList.length<10)
{
    for(i=0; i < storedScoreList.length; i++){
        div=document.createElement("div")   
        div1=document.createElement("div")   
        div.innerHTML=  storedScoreList[i].name
        div1.innerHTML=  storedScoreList[i].score
        document.getElementById("name").appendChild(div)
        document.getElementById("name-score").appendChild(div1)
      }
}
    
}


//Remove all score
clearHighscore.addEventListener("click",clearAllScore);
function clearAllScore(){
    localStorage.removeItem('score_list')
    document.getElementById("name").textContent=''
    document.getElementById("name-score").textContent=''

}

//Play again
playAgain.addEventListener("click",playagain)

function playagain(){
finalQuestionIndex = quizQuestions.length;
 currentQuestionIndex = 0;
 timeLeft = 75;
 questionCount = 0;
 scorePer = 0;
 score = 0;
 startQuiz()
}

//Quit
document.getElementById("goBack").addEventListener("click",home);