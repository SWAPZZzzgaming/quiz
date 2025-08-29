let currentCategory = '';
        let currentQuestionIndex = 0;
        let score = 0;
        let selectedOption = null;
        let timeLeft = 30;
        let timerInterval = null;

        const quizData = {
            programming: [
                {
                    question: "Which programming language is known as the 'mother of all languages'?",
                    options: ["C", "Java", "Assembly", "Fortran"],
                    correct: 0
                },
                {
                    question: "What does HTML stand for?",
                    options: [
                        "Hyper Text Markup Language",
                        "High Tech Modern Language",
                        "Hyper Transfer Markup Language",
                        "Home Tool Markup Language"
                    ],
                    correct: 0
                },
                {
                    question: "Which data structure uses LIFO (Last In First Out) principle?",
                    options: ["Queue", "Stack", "Linked List", "Tree"],
                    correct: 1
                },
                {
                    question: "What is the time complexity of binary search?",
                    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
                    correct: 2
                },
                {
                    question: "Which keyword is used to define a constant in JavaScript?",
                    options: ["const", "let", "var", "constant"],
                    correct: 0
                }
            ],
            history: [
                {
                    question: "Who was the first Emperor of the Maurya Empire?",
                    options: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Samudragupta"],
                    correct: 1
                },
                {
                    question: "In which year did India gain independence?",
                    options: ["1942", "1947", "1950", "1935"],
                    correct: 1
                },
                {
                    question: "Who is known as the 'Father of the Indian Constitution'?",
                    options: [
                        "Mahatma Gandhi",
                        "Jawaharlal Nehru",
                        "B.R. Ambedkar",
                        "Sardar Patel"
                    ],
                    correct: 2
                },
                {
                    question: "The Battle of Plassey was fought in which year?",
                    options: ["1757", "1857", "1764", "1748"],
                    correct: 0
                },
                {
                    question: "Who built the Taj Mahal?",
                    options: [
                        "Akbar",
                        "Shah Jahan",
                        "Jahangir",
                        "Aurangzeb"
                    ],
                    correct: 1
                }
            ],
            general: [
                {
                    question: "Which planet is known as the Red Planet?",
                    options: ["Venus", "Mars", "Jupiter", "Saturn"],
                    correct: 1
                },
                {
                    question: "What is the capital of Australia?",
                    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
                    correct: 2
                },
                {
                    question: "Which element has the chemical symbol 'O'?",
                    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
                    correct: 1
                },
                {
                    question: "Who painted the Mona Lisa?",
                    options: [
                        "Vincent van Gogh",
                        "Pablo Picasso",
                        "Leonardo da Vinci",
                        "Michelangelo"
                    ],
                    correct: 2
                },
                {
                    question: "What is the largest ocean on Earth?",
                    options: [
                        "Atlantic Ocean",
                        "Indian Ocean",
                        "Arctic Ocean",
                        "Pacific Ocean"
                    ],
                    correct: 3
                }
            ],
            math: [
                {
                    question: "What is the value of π (pi) approximately?",
                    options: ["3.14", "2.71", "1.61", "4.67"],
                    correct: 0
                },
                {
                    question: "Solve: 2 + 2 × 2",
                    options: ["6", "8", "4", "10"],
                    correct: 0
                },
                {
                    question: "What is the square root of 144?",
                    options: ["12", "14", "16", "18"],
                    correct: 0
                },
                {
                    question: "If x = 5 and y = 3, what is x² + y²?",
                    options: ["34", "25", "16", "64"],
                    correct: 0
                },
                {
                    question: "What is 25% of 200?",
                    options: ["25", "50", "75", "100"],
                    correct: 1
                }
            ]
        };

        function startQuiz(category) {
            currentCategory = category;
            currentQuestionIndex = 0;
            score = 0;
            
            document.querySelector('.home-screen').style.display = 'none';
            document.getElementById('quizContainer').style.display = 'block';
            document.getElementById('resultsContainer').style.display = 'none';
            
            updateQuestion();
            startTimer();
        }

        function updateQuestion() {
            const question = quizData[currentCategory][currentQuestionIndex];
            document.getElementById('questionText').textContent = question.question;
            document.getElementById('questionCounter').textContent = `Question ${currentQuestionIndex + 1} of ${quizData[currentCategory].length}`;
            document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
            
            const optionsGrid = document.getElementById('optionsGrid');
            optionsGrid.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.textContent = option;
                optionElement.onclick = () => selectOption(index);
                optionsGrid.appendChild(optionElement);
            });
            
            document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
            document.getElementById('nextBtn').textContent = currentQuestionIndex === quizData[currentCategory].length - 1 ? 'Finish' : 'Next';
            
            selectedOption = null;
        }

        function selectOption(index) {
            const options = document.querySelectorAll('.option');
            options.forEach(opt => opt.classList.remove('selected'));
            options[index].classList.add('selected');
            selectedOption = index;
        }

        function nextQuestion() {
            if (selectedOption !== null) {
                if (selectedOption === quizData[currentCategory][currentQuestionIndex].correct) {
                    score++;
                    document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
                }
                
                if (currentQuestionIndex < quizData[currentCategory].length - 1) {
                    currentQuestionIndex++;
                    resetTimer();
                    updateQuestion();
                } else {
                    finishQuiz();
                }
            } else {
                alert('Please select an option before proceeding.');
            }
        }

        function previousQuestion() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                resetTimer();
                updateQuestion();
            }
        }

        function startTimer() {
            clearInterval(timerInterval);
            timeLeft = 30;
            updateTimerDisplay();
            timerInterval = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    nextQuestion();
                }
            }, 1000);
        }

        function resetTimer() {
            clearInterval(timerInterval);
            startTimer();
        }

        function updateTimerDisplay() {
            document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
        }

        function finishQuiz() {
            clearInterval(timerInterval);
            document.getElementById('quizContainer').style.display = 'none';
            document.getElementById('resultsContainer').style.display = 'block';
            
            const finalScoreElement = document.getElementById('finalScore');
            const resultMessageElement = document.getElementById('resultMessage');
            const resultDetailsElement = document.getElementById('resultDetails');
            
            finalScoreElement.textContent = `${score}/${quizData[currentCategory].length}`;
            resultDetailsElement.textContent = `You answered ${score} out of ${quizData[currentCategory].length} questions correctly`;
            
            const percentage = (score / quizData[currentCategory].length) * 100;
            if (percentage >= 80) {
                resultMessageElement.textContent = 'Excellent! You are a quiz master!';
                resultMessageElement.style.color = '#4CAF50';
            } else if (percentage >= 60) {
                resultMessageElement.textContent = 'Great job! Keep learning!';
                resultMessageElement.style.color = '#FFC107';
            } else if (percentage >= 40) {
                resultMessageElement.textContent = 'Good effort! Try again!';
                resultMessageElement.style.color = '#FF9800';
            } else {
                resultMessageElement.textContent = 'Keep practicing! You can do better!';
                resultMessageElement.style.color = '#F44336';
            }
        }

        function restartQuiz() {
            document.getElementById('resultsContainer').style.display = 'none';
            document.querySelector('.home-screen').style.display = 'block';
            clearInterval(timerInterval);
        }

        // Add some interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.category-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.style.opacity = '0';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            });
        });

        // Add keypress events for better UX
        document.addEventListener('keydown', function(e) {
            if (document.getElementById('quizContainer').style.display === 'block') {
                if (e.key >= '1' && e.key <= '4') {
                    const optionIndex = parseInt(e.key) - 1;
                    if (optionIndex < document.querySelectorAll('.option').length) {
                        selectOption(optionIndex);
                    }
                } else if (e.key === 'Enter') {
                    nextQuestion();
                } else if (e.key === 'ArrowLeft') {
                    previousQuestion();
                } else if (e.key === 'ArrowRight') {
                    nextQuestion();
                }
            }
        });

        // Add CSS animation for fadeInUp
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
