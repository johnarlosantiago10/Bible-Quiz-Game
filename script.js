const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Who was the first king of Israel?",
    answers: [
      { text: "David", correct: false },
      { text: "Solomon", correct: false },
      { text: "Saul", correct: true },
      { text: "Samuel", correct: false },
    ],
  },
  {
    question: "Which prophet was taken up to heaven in a whirlwind?",
    answers: [
      { text: "Isaiah", correct: false },
      { text: "Elijah", correct: true },
      { text: "Jeremiah", correct: false },
      { text: "Elisha", correct: false },
    ],
  },
  {
    question: "What was the name of Moses' sister?",
    answers: [
      { text: "Deborah", correct: false },
      { text: "Rachel", correct: false },
      { text: "Hannah", correct: false },
      { text: "Miriam", correct: true },
    ],
  },
  {
    question: "Who interpreted Pharaoh's dreams in Egypt?",
    answers: [
      { text: "Daniel", correct: false },
      { text: "Joseph", correct: true },
      { text: "Joshua", correct: false },
      { text: "Aaron", correct: false },
    ],
  },
  {
    question: "Which judge of Israel was known for his extraordinary strength?",
    answers: [
      { text: "Gideon", correct: false },
      { text: "Jephthah", correct: false },
      { text: "Samson", correct: true },
      { text: "Ehud", correct: false },
    ],
  },
];

// QUIZ STATE VARS

let currentQuestionIndex = 0;
let score = 0;
let answerDisable = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}
function showQuestion() {
  answerDisable = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectedAnswer);

    answersContainer.appendChild(button);
  });
}

function selectedAnswer(event) {
  if (answerDisable) return;

  answerDisable = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else showResult();
  }, 1000);
}
function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = `🎉 PERFECT SCORE! 🎉
Amazing! You got all 5 questions correct! 📖✨
Keep learning and growing in God’s Word! 🙏`;
  } else {
    resultMessage.textContent = `📖 GOOD JOB!
You did your best! Keep studying the Bible and try again. 🙏✨
Every question is an opportunity to learn something new!`;
  }

  finalScoreSpan.textContent = score;
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}

restartButton.addEventListener("click", restartQuiz);
