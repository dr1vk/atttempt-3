// Define the quiz questions and options
const quizData = [
  {
    question: "What's my favorite color?",
    options: ["Red", "Blue", "Green", "Yellow"],
  },
  {
    question: "What's my favorite food?",
    options: ["Pizza", "Sushi", "Burger", "Salad"],
  },
  {
    question: "What's my favorite hobby?",
    options: ["Reading", "Traveling", "Gaming", "Cooking"],
  },
  {
    question: "Surprise! Will you be my valentine?",
    options: ["Yes", "No"],
  },
];

let currentQuestion = 0;

// Function to render the current question and its options
function renderQuestion() {
  const quizContent = document.getElementById("quiz-content");
  quizContent.innerHTML = ""; // Clear previous content

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
      btn.addEventListener("click", () => handleAnswer(option));
      optionsContainer.appendChild(btn);
    });

    quizContent.appendChild(optionsContainer);
  } else {
    // Fallback message if needed (not used in this example)
    quizContent.innerHTML = "<h2>Thanks for playing!</h2>";
  }
}

// Function to handle answer selection
function handleAnswer(selectedOption) {
  // If we're at the last question (the valentine question)
  if (currentQuestion === quizData.length - 1) {
    const quizContent = document.getElementById("quiz-content");
    if (selectedOption === "Yes") {
      quizContent.innerHTML =
        "<h2>You made my day! Happy Valentine's Day!</h2>";
    } else {
      quizContent.innerHTML =
        "<h2>No worries—thanks for taking the quiz!</h2>";
    }
  } else {
    // For regular quiz questions, move on to the next question
    currentQuestion++;
    renderQuestion();
  }
}

// Start the quiz by rendering the first question
renderQuestion();
