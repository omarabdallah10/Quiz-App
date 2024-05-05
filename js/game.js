let question = document.getElementById("question");
let choices = Array.from(document.getElementsByClassName("choice-text"));
let progressText = document.getElementById("progressText");
let scoreText = document.getElementById("score");
let progressBarFull = document.getElementById("progressBarFull");
console.log(choices);

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is 2 + 2?",
    choice1: "2",
    choice2: "4",
    choice3: "21",
    choice4: "5",
    answer: 2,
  },
  {
    question: "What is 2 * 2?",
    choice1: "2",
    choice2: "4",
    choice3: "21",
    choice4: "5",
    answer: 2,
  },
  {
    question: "What is 2 / 2?",
    choice1: "2",
    choice2: "4",
    choice3: "1",
    choice4: "5",
    answer: 3,
  },
  {
    question: "What is 2 - 2?",
    choice1: "2",
    choice2: "4",
    choice3: "0",
    choice4: "5",
    answer: 3,
  },
  {
    question: "What is 2 ^ 2?",
    choice1: "2",
    choice2: "4",
    choice3: "21",
    choice4: "5",
    answer: 2,
  },
];

// Constants
const correct_bonus = 10;
const max_questions = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  // console.log(availableQuestions);
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= max_questions) {
    localStorage.setItem("mostRecentScore", score);
    // go to the end page
    return window.location.assign("../pages/end.html");
  }

  questionCounter++;

  progressText.innerText = `Question ${questionCounter}/${max_questions}`;
  // Update the progress bar
  progressBarFull.style.width = `${(questionCounter / max_questions) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  // console.log(availableQuestions);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(correct_bonus);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
    //console.log(classToApply);

    //console.log(selectedAnswer, currentQuestion.answer);
    //console.log(selectedAnswer == currentQuestion.answer);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
