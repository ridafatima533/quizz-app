
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which is the capital of Pakistan?",
        answers: [
            { text: "Karachi", correct: false },
            { text: "Faisalabad", correct: false },
            { text: "Islamabad", correct: true },
            { text: "Lahore", correct: false }
        ]
    },
    {
        question: "Which is the national animal of Pakistan?",
        answers: [
            { text: "Lion", correct: false },
            { text: "Tiger", correct: false },
            { text: "Deer", correct: false },
            { text: "Markhor", correct: true }
        ]
    },
    {
        question: "Who is the founder of Pakistan?",
        answers: [
            { text: "Quaid-e-Azam", correct: true },
            { text: "Liaqat Ali Khan", correct: false },
            { text: "Imran Khan", correct: false },
            { text: "Zulfikar Ali Bhutto", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionElement.innerHTML = "Quiz finished!";
        answerButtons.innerHTML = "";
        nextButton.style.display = "none";
    }
});


window.onload = startQuiz;