// script.js
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Fetch questions from the server
async function loadQuestions() {
    const response = await fetch('/api/questions');
    questions = await response.json();
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        document.getElementById('result').textContent = `Quiz Completed! Your score is ${score}/${questions.length}`;
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('next-button').style.display = 'none';
        return;
    }
    
    const questionObj = questions[currentQuestionIndex];
    document.getElementById('question').textContent = questionObj.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    questionObj.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    showQuestion();
}

function nextQuestion() {
    showQuestion();
}

loadQuestions();
