// Define the quiz questions, options, and correct answers
const quizData = [
  {
    question: "What's my favorite color?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: "Blue"
  },
  {
    question: "What's my favorite food?",
    options: ["Pizza", "Sushi", "Burger", "Salad"],
    correctAnswer: "Pizza"
  },
  {
    question: "What's my favorite hobby?",
    options: ["Reading", "Traveling", "Gaming", "Cooking"],
    correctAnswer: "Reading"
  },
  {
    question: "Surprise! Will you be my valentine?",
    options: ["Yes", "No"],
    correctAnswer: "Yes"
  },
];

let currentQuestion = 0;

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} The shuffled array.
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] with the element at random index
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to render the current question and its options
function renderQuestion() {
  const quizContent = document.getElementById("quiz-content");
  quizContent.innerHTML = ""; // Clear previous content

  // If it's the final (valentine) question, add the hearts background
  if (currentQuestion === quizData.length - 1) {
    document.body.classList.add("hearts-background");
  } else {
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

    // Determine the order of options:
    // Randomize options if it's not the final (valentine) question.
    const options =
      currentQuestion !== quizData.length - 1
        ? shuffleArray(qData.options.slice())
        : qData.options;

    // Create a button for each option
    options.forEach((option) => {
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
