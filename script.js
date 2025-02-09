// Define the quiz questions, options, and correct answers
const quizData = [
  {
    question: "What's my favorite color?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: "Red"
  },
  {
    question: "What's my favorite food?",
    options: ["Steak", "Sushi", "Burger", "Wings"],
    correctAnswer: "Steak"
  },
  {
    question: "What's my favorite hobby?",
    options: ["Reading", "Traveling", "Gaming", "Cooking"],
    correctAnswer: "Gaming"
  },
  {
    question: "What's my favorite anime?",
    options: ["86", "High School DXD", "One Piece", "Bleach"],
    correctAnswer: "86"
  },
  {
    // Transition screen before the final question
    question: "Want a harder quiz?",
    options: ["Yes", "No"],
    special: true // flag to indicate this is a transition screen
  },
  {
    // Final valentine question
    question: "Surprise! Will you be my valentine?",
    options: ["Yes", "No"],
    correctAnswer: "Yes"
  },
];

let currentQuestion = 0;
let noCount = 0; // Counter for "No" clicks on the final question

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} The shuffled array.
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
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

    // For the final question and the special transition screen, do not shuffle the options
    const options =
      (currentQuestion !== quizData.length - 1 && !qData.special)
        ? shuffleArray(qData.options.slice())
        : qData.options;

    options.forEach((option) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.className = "option-btn";
      btn.addEventListener("click", (event) => handleAnswer(option, event.target));
      optionsContainer.appendChild(btn);
    });

    quizContent.appendChild(optionsContainer);
  } else {
    // Fallback message if needed (should not be reached in this quiz)
    quizContent.innerHTML = "<h2>Thanks for playing!</h2>";
  }
}

// Function to show a pop-out message
function showPopOutMessage(message) {
  const popOut = document.createElement("div");
  popOut.className = "popout-message";
  popOut.textContent = message;
  // Basic inline styling for the pop-out (you can move these to your CSS file)
  popOut.style.position = "fixed";
  popOut.style.top = "20px";
  popOut.style.left = "50%";
  popOut.style.transform = "translateX(-50%)";
  popOut.style.backgroundColor = "#333";
  popOut.style.color = "#fff";
  popOut.style.padding = "10px 20px";
  popOut.style.borderRadius = "5px";
  popOut.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
  document.body.appendChild(popOut);
  setTimeout(() => {
    popOut.remove();
  }, 1500);
}

// Function to update the final question's options to "Yes"
function updateFinalOptionsToYes() {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(button => {
    button.textContent = "Yes";
    // Override the click event so that it always submits "Yes"
    button.onclick = function(event) {
      handleAnswer("Yes", button);
    }
    button.disabled = false;
  });
}

// Function to handle answer selection with visual feedback
function handleAnswer(selectedOption, btn) {
  const currentData = quizData[currentQuestion];

  // Handle the special transition screen ("Want a harder quiz?")
  if (currentData.special) {
    btn.classList.add("selected");
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(button => button.disabled = true);
    setTimeout(() => {
      currentQuestion++;
      renderQuestion();
    }, 1000);
    return;
  }

  // Final Valentine Question logic
  if (currentQuestion === quizData.length - 1) {
    if (selectedOption === currentData.correctAnswer) {
      // Correct answer ("Yes")
      btn.classList.add("correct");
      const buttons = document.querySelectorAll(".option-btn");
      buttons.forEach(button => button.disabled = true);
      setTimeout(() => {
        const quizContent = document.getElementById("quiz-content");
        quizContent.innerHTML = "<h2>You made my day! Happy Valentine's Day!</h2>";
      }, 1000);
    } else {
      // Wrong answer ("No")
      noCount++;
      btn.classList.add("wrong");
      const buttons = document.querySelectorAll(".option-btn");
      buttons.forEach(button => button.disabled = true);
      showPopOutMessage("wrong answer, try again");
      setTimeout(() => {
        // Remove wrong styling and re-enable buttons for another try
        buttons.forEach(button => {
          button.classList.remove("wrong");
          button.disabled = false;
        });
        // After 5 wrong attempts, change both options to "Yes"
        if (noCount >= 5) {
          updateFinalOptionsToYes();
        }
      }, 1500);
    }
    return;
  }

  // For regular (non-final) questions
  if (selectedOption === currentData.correctAnswer) {
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
  }
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(button => button.disabled = true);
  setTimeout(() => {
    currentQuestion++;
    renderQuestion();
  }, 1000);
}

// Start the quiz by rendering the first question
renderQuestion();
