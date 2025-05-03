const questions = [
    { question: "What does HTML stand for?", a: "Hyper Text Markup Language", b: "Hyper Transfer Markup Language", c: "High Text Markup Language", d: "Home Tool Markup Language", correct: "a" },
    { question: "Which of the following is NOT a programming language?", a: "JavaScript", b: "Python", c: "HTML", d: "Java", correct: "c" },
    { question: "What is CSS used for?", a: "Adding interactivity to a website", b: "Defining the structure of a webpage", c: "Styling the visual layout of a webpage", d: "Managing server-side operations", correct: "c" },
    { question: "What is JavaScript primarily used for?", a: "Creating server-side applications", b: "Adding dynamic behavior to websites", c: "Defining the structure of a webpage", d: "Styling the visual layout of a webpage", correct: "b" },
    { question: "Which of the following is a JavaScript framework?", a: "HTML", b: "CSS", c: "React", d: "Java", correct: "c" },
    { question: "What is the purpose of a version control system like Git?", a: "To manage databases", b: "To track changes to code over time", c: "To design user interfaces", d: "To deploy websites to servers", correct: "b" },
    { question: "What does the acronym API stand for?", a: "Advanced Programming Interface", b: "Application Programming Interface", c: "Automated Programming Interface", d: "Abstract Programming Interface", correct: "b" },
    { question: "Which of the following is a popular front-end library?", a: "Node.js", b: "Express.js", c: "Angular", d: "MongoDB", correct: "c" },
    { question: "What is the purpose of responsive web design?", a: "To make websites load faster", b: "To ensure websites are accessible to people with disabilities", c: "To optimize websites for different screen sizes and devices", d: "To improve website security", correct: "c" },
    { question: "What is the role of a web server?", a: "To store website files", b: "To process user requests and deliver web pages", c: "To design user interfaces", d: "To manage databases", correct: "b" },
    { question: "What is the purpose of a database in web development?", a: "To store and manage website content and data", b: "To handle user authentication", c: "To style the visual layout of a webpage", d: "To add dynamic behavior to websites", correct: "a" },
    { question: "Which of the following is a popular back-end programming language?", a: "HTML", b: "CSS", c: "JavaScript", d: "PHP", correct: "d" },
    { question: "What is the purpose of testing in web development?", a: "To make websites look more visually appealing", b: "To ensure websites function correctly and meet user requirements", c: "To optimize websites for search engines", d: "To improve website security", correct: "b" },
    { question: "What is the role of a web browser?", a: "To store website files", b: "To display web pages and interact with web applications", c: "To manage databases", d: "To process user requests on the server", correct: "b" },
    { question: "What is the purpose of a domain name?", a: "To store website files", b: "To identify a website on the internet", c: "To design user interfaces", d: "To manage databases", correct: "b" }
]

questions.forEach(e => {
    const quizContainer = document.getElementById('quiz-container');
    const quizCard = document.createElement('div');
    quizCard.classList.add('quiz_card');

    const questionHeader = document.createElement('h3');
    questionHeader.textContent = e.question;
    quizCard.appendChild(questionHeader);

    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options');

    const labels = ['a', 'b', 'c', 'd'];
    labels.forEach(label => {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `q${questions.indexOf(e)}`;
        input.value = label;
        input.id = `${questions.indexOf(e)}${label}`

        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', `${questions.indexOf(e)}${label}`);
        labelElement.textContent = `${label}) ${e[label]}`;
        
        optionsDiv.appendChild(input);
        optionsDiv.appendChild(labelElement);
        // optionsDiv.appendChild(document.createElement('br'));
    });

    quizCard.appendChild(optionsDiv);
    quizContainer.appendChild(quizCard);
});

const submitButton = document.getElementById('submit-quiz');
submitButton.addEventListener('click', () => {
    let score = 0;
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === question.correct) {
                const correctLabel = document.querySelector(`label[for="${index}${question.correct}"]`);
                correctLabel.style.backgroundColor = 'springGreen';
                correctLabel.style.padding = '10px';
                correctLabel.style.borderRadius = '10px';
                score++;
            } else {
                const selectedLabel = document.querySelector(`label[for="${index}${selectedOption.value}"]`);
                selectedLabel.style.backgroundColor = 'Tomato';
                selectedLabel.style.padding = '10px';
                selectedLabel.style.borderRadius = '10px';
                const correctLabel = document.querySelector(`label[for="${index}${question.correct}"]`);
                correctLabel.style.backgroundColor = 'springGreen';
                correctLabel.style.padding = '10px';
                correctLabel.style.borderRadius = '10px';   
            }
        }
    });

    // document.getElementById('quiz-container').style.display = 'none';
    // document.getElementById('submit-quiz').style.display = 'none';
    document.getElementById('results-section').style.display = 'flex';

    const resultsContainer = document.getElementById('results-container');
    resultsContainer.style.padding = '10px'
    resultsContainer.innerHTML = `You scored ${score} out of ${questions.length}!`;
});

document.getElementById('retry-quiz').addEventListener('click', () => {
    // document.getElementById('quiz-container').style.display = 'block';
    // document.getElementById('submit-quiz').style.display = 'block';
    document.getElementById('results-section').style.display = 'none';
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        label.style.backgroundColor = '';
    });

    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
});