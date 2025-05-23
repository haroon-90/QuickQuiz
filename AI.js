const apiKey = "AIzaSyAp1Zebu2JWNd5obad4XgD63WUFf1J9Wpk";

async function run(userInput) {
    const url = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + apiKey;
    const requestBody = {
        contents: [{
            parts: [{
                text: `Response in json object form and don't add any other data in your response and create 15 different MCQs on the given topic in the format just like as:
                    [{ question: "Question 1?", a: "option 1", b: "option 2", c: "option 3", d: "option 4", correct: "a" }, {question: "Question 2?", a: "option 1", b: "option 2", c: "option 3", d: "option 4", correct: "c" }]
                The topic is : ${userInput}`
            }]
        }]
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        console.log(data);
        return data?.candidates[0]?.content?.parts[0]?.text;
    } catch (error) {
        console.error("An error occurred:", error);
        alert("Sorry, we couldn't generate your quiz at this time due to technical error. Please try again in a moment.");
        is_generating = false;
        updateLoadingAnimation();
        return null;
    }
}
let questions = [];
let input;
let is_generating = false;
let response = "";
let loading = document.querySelector('.generating');

function updateLoadingAnimation() {
    if (is_generating) {
        loading.style.display = 'block';
    } else {
        loading.style.display = 'none';
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const topicNameElement = document.querySelector(".topic_name");
    const quizContainer = document.getElementById('quiz-container');

    document.getElementById("generate_btn").addEventListener("click", async function () {
        input = document.getElementById("topic_input").value;
        if (input == "")
            alert("Please enter a topic to generate quiz")
        else {
            document.getElementById('quiz-container').style.display = 'block';
            submitButton.disabled = false;
            document.getElementById('quiz-container').innerHTML = '';
            topicNameElement.innerHTML = `Topic: ${input}`;
            is_generating = true;
            updateLoadingAnimation()
            response = await run(input);
            const jsonString = response.trim();
            const cleanResponse = jsonString.startsWith('```json') ? jsonString.slice(7, -3) : jsonString;
            questions = JSON.parse(cleanResponse);
            is_generating = false;
            updateLoadingAnimation()
            renderQuizCards(questions, quizContainer);
        }
    });
});
function renderQuizCards(questions, quizContainer) {
    quizContainer.innerHTML = '';

    questions.forEach(e => {
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz_card');

        const Qno = document.createElement('h1');
        Qno.textContent = "Question: " + (questions.indexOf(e) + 1);
        quizCard.appendChild(Qno);

        const questionHeader = document.createElement('h3');
        questionHeader.textContent = e.question;
        quizCard.appendChild(questionHeader);

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');

        const labels = ['a', 'b', 'c', 'd'];
        labels.forEach(label => {
            const optionContainer = document.createElement('div');
            optionContainer.style.display = 'flex';
            optionContainer.style.alignItems = 'center';
            optionContainer.style.marginBottom = '8px';
            optionContainer.style.gap = '8px';

            const inputElement = document.createElement('input');
            inputElement.type = 'radio';
            inputElement.name = `q${questions.indexOf(e)}`;
            inputElement.value = label;
            inputElement.id = `${questions.indexOf(e)}${label}`;

            const labelElement = document.createElement('label');
            labelElement.setAttribute('for', `${questions.indexOf(e)}${label}`);
            labelElement.textContent = `${label}) ${e[label]}`;

            optionContainer.appendChild(inputElement);
            optionContainer.appendChild(labelElement);
            optionsDiv.appendChild(optionContainer);
        });

        quizCard.appendChild(optionsDiv);
        quizContainer.appendChild(quizCard);
    });
}
const submitButton = document.getElementById('submit-quiz');
submitButton.addEventListener('click', () => {
    let score = 0;
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === question.correct) {
                const correctLabel = document.querySelector(`label[for="${index}${question.correct}"]`);
                if (correctLabel) {
                    correctLabel.style.backgroundColor = 'springGreen';
                    correctLabel.style.padding = '10px';
                    correctLabel.style.borderRadius = '10px';
                }
                score++;
            } else {
                const selectedLabel = document.querySelector(`label[for="${index}${selectedOption.value}"]`);
                if (selectedLabel) {
                    selectedLabel.style.backgroundColor = 'tomato';
                    selectedLabel.style.padding = '10px';
                    selectedLabel.style.borderRadius = '10px';
                }
                const correctLabel = document.querySelector(`label[for="${index}${question.correct}"]`);
                if (correctLabel) {
                    correctLabel.style.backgroundColor = 'springGreen';
                    correctLabel.style.padding = '10px';
                    correctLabel.style.borderRadius = '10px';
                }
            }
        }
    });
    document.getElementById('results-section').style.display = 'flex';
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.style.padding = '10px'
    resultsContainer.innerHTML = `You scored ${score} out of ${questions.length}!`;
    submitButton.disabled = true;
});
document.getElementById('retry-quiz').addEventListener('click', () => {
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'none';
    response = "";
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        label.style.backgroundColor = '';
    });
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    submitButton.disabled = false;
});
const about = document.querySelector('.about');

const aboutModal = document.createElement('div');
aboutModal.classList.add('aboutmodal');

const aboutContent = document.createElement('div');
aboutContent.classList.add('aboutContent');
aboutContent.innerHTML = `
    <h2>About QuickQuiz</h2>
    <p>Developed by: Muhammad Haroon Nawaz</p>
    <p>
        QuickQuiz is an AI-powered quiz generator that creates multiple-choice questions on any topic you enter<br>
        Enter a topic, generate a quiz, and test your knowledge instantly!
    </p>
        <div>Powered by Google Gemini AI Model</div>
        <div>All quizzes are generated in real-time</div>
        <div>No data is stored or shared</div>
        <p>QuickQuiz v1.0</p>
    <button id="close-about-modal">Close</button>
`;

aboutModal.appendChild(aboutContent);
document.body.appendChild(aboutModal);

about.addEventListener('click', () => {
    aboutModal.style.display = 'flex';
});

aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
        aboutModal.style.display = 'none';
    }
});
document.getElementById('close-about-modal').addEventListener('click', () => {
    aboutModal.style.display = 'none';
});