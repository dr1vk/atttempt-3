// Define the quiz questions, options, and correct answers
const quizData = [
  {
    question: "What's my favorite color?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: "Red"
  },
  {
    question: "What's my favorite food?",
    options: ["Steak", "Wings", "Burger", "Salad"],
    correctAnswer: "Steak"
  },
  {
    question: "What's my favorite hobby?",
    options: ["Reading", "Traveling", "Gaming", "Cooking"],
    correctAnswer: "Gaming"
  },
  {
    question: "Surprise! Will you be my valentine?",
    options: ["Yes", "No"],
    correctAnswer: "Yes"
  },
];

let currentQuestion = 0;

// Function to render the current question and its options
function renderQuestion() {
  const quizContent = document.getElementById("quiz-content");
  quizContent.innerHTML = ""; // Clear previous content

  // If it's the final (valentine) question, add the hearts background
  if (currentQuestion === quizData.length - 1) {
    document.body.classList.add("hearts-background");
  } else {
    // Otherwise, ensure the hearts background is removed
    document.body.classList.remove("hearts-background");
  }

  if (currentQuestion < quizData.length) {
    const qData = quizData[currentQuestion];

    // Create and append the question element
    const questionEl = document.createElement("h2");
    questionEl.textContent = qData.question;
    quizContent.appendChild(questionEl);

    // Create a container for the options/buttons
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "options-container";

    // Create a button for each option
    qData.options.forEach((option) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.className = "option-btn";
      // Pass the button element into handleAnswer so we can add a class later
      btn.addEventListener("click", (event) => handleAnswer(option, event.target));
      optionsContainer.appendChild(btn);
    });

    quizContent.appendChild(optionsContainer);
  } else {
    // Fallback message if needed (not used in this example)
    quizContent.innerHTML = "<h2>Thanks for playing!</h2>";
  }
}

// Function to handle answer selection with visual feedback
function handleAnswer(selectedOption, btn) {
  const currentData = quizData[currentQuestion];

  // Check if the answer is correct and add visual feedback
  if (selectedOption === currentData.correctAnswer) {
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
  }

  // Disable all option buttons to prevent multiple clicks
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(button => button.disabled = true);

  // Wait a short time to let the user see the glow, then proceed
  setTimeout(() => {
    // If it's the final question, display a final message
    if (currentQuestion === quizData.length - 1) {
      const quizContent = document.getElementById("quiz-content");
      if (selectedOption === currentData.correctAnswer) {
        quizContent.innerHTML = "<h2>You made my day! Happy Valentine's Day!</h2>";
      } else {
        quizContent.innerHTML = "<h2>No worries—thanks for taking the quiz!</h2>";
      }
    } else {
      // For regular questions, move to the next question
      currentQuestion++;
      renderQuestion();
    }
  }, 1000);
}

// Start the quiz by rendering the first question
renderQuestion();
