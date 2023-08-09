const questions = [
    {
      question: "Inside which HTML element do we put the JavaScript?",
      choices: ["<js>", "<script>", "<link>", "<div>"],
      correctAnswer: "<script>"
    },
    {
      question: "How does a FOR loop start?",
      choices: ["for (i = 0; i <= 5", "for (i <= 5; i++", "for i = 1 to 5", "for (i = 0; i <= 5; i++)"],
      correctAnswer: "for (i = 0; i <= 5; i++)"
    },
    {
      question: "What does 'JS' stand for?",
      choices: ["Java Source", "JavaScript", "JSON", "JavaServer"],
      correctAnswer: "JavaScript"
    }
  ];
 
  const startBtn = document.getElementById("start-btn");
  const quizScreen = document.getElementById("quiz");
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const endScreen = document.getElementById("end-screen");
  const scoreElement = document.getElementById("score");
  const initialsInput = document.getElementById("initials");
  const saveBtn = document.getElementById("save-btn");
 
  let timerInterval;
  let currentQuestionIndex = 0;
  let time = 60;
  let score = 0;
 
  startBtn.addEventListener("click", startQuiz);
  choicesElement.addEventListener("click", checkAnswer);
  saveBtn.addEventListener("click", saveScore);
 
  function startQuiz() {
    document.getElementById("start-screen").style.display = "none";
    quizScreen.style.display = "block";
    showQuestion();
    startTimer();
  }
 
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
 
    currentQuestion.choices.forEach(choice => {
      const button = document.createElement("button");
      button.textContent = choice;
      choicesElement.appendChild(button);
    });
  }
 
  function checkAnswer(event) {
    const selectedChoice = event.target.textContent;
    const currentQuestion = questions[currentQuestionIndex];
 
    if (selectedChoice === currentQuestion.correctAnswer) {
      score++;
    } else {
      time -= 5; // Subtract 5 seconds for incorrect answers
      if (time < 0) time = 0;
    }
 
    currentQuestionIndex++;
 
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      clearInterval(timerInterval); // Clear the timer interval when all questions are answered
      
      
      if (time <= 0) {
        document.getElementById("timer-count").innerHTML = "OUT OF TIME";
      } else {
        endQuiz();
      }
    }
  }
 
  function startTimer() {
    const timerCountElement = document.getElementById("timer-count");

    timerInterval = setInterval(() => {
      time--;
      if (time <= 0) {
        clearInterval(timerInterval);
        endQuiz();
        document.getElementById("timer-count").innerHTML = "OUT OF TIME";
      } else {
        timerCountElement.textContent = time; // Update timer count on screen
      }
    }, 1000);
  }
 
  function endQuiz() {
    quizScreen.style.display = "none";
    endScreen.style.display = "block";

    scoreElement.textContent = `Your Score: ${score} / ${questions.length}`;
  }

 
  function saveScore(event) {
    event.preventDefault();
    const initials = initialsInput.value.toUpperCase();


    localStorage.setItem('initials', initials);
    localStorage.setItem('score', score);
 
    alert(`Score saved: ${initials} - ${score}`);
  }
