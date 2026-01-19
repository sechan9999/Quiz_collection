// Quiz App - Main Application Logic
class QuizApp {
    constructor() {
        this.currentCategory = 'general';
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.timePerQuestion = 30;
        this.timeLeft = this.timePerQuestion;
        this.totalTime = 0;
        this.answered = false;

        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        // Screens
        this.startScreen = document.getElementById('start-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultScreen = document.getElementById('result-screen');

        // Start Screen Elements
        this.categoryBtns = document.querySelectorAll('.category-btn');
        this.startBtn = document.getElementById('start-btn');

        // Quiz Screen Elements
        this.questionCounter = document.getElementById('question-counter');
        this.timer = document.getElementById('timer');
        this.progressFill = document.getElementById('progress-fill');
        this.currentScore = document.getElementById('current-score');
        this.questionCategory = document.getElementById('question-category');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.feedbackContainer = document.getElementById('feedback-container');
        this.feedbackMessage = document.getElementById('feedback-message');
        this.explanation = document.getElementById('explanation');
        this.nextBtn = document.getElementById('next-btn');

        // Result Screen Elements
        this.resultIcon = document.getElementById('result-icon');
        this.resultTitle = document.getElementById('result-title');
        this.resultMessage = document.getElementById('result-message');
        this.finalScore = document.getElementById('final-score');
        this.scoreRingProgress = document.getElementById('score-ring-progress');
        this.correctCount = document.getElementById('correct-count');
        this.wrongCount = document.getElementById('wrong-count');
        this.totalTimeEl = document.getElementById('total-time');
        this.retryBtn = document.getElementById('retry-btn');
        this.homeBtn = document.getElementById('home-btn');
    }

    bindEvents() {
        // Category selection
        this.categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => this.selectCategory(btn));
        });

        // Start quiz
        this.startBtn.addEventListener('click', () => this.startQuiz());

        // Next question
        this.nextBtn.addEventListener('click', () => this.nextQuestion());

        // Result actions
        this.retryBtn.addEventListener('click', () => this.retryQuiz());
        this.homeBtn.addEventListener('click', () => this.goHome());
    }

    selectCategory(btn) {
        this.categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.dataset.category;
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    startQuiz() {
        // Get questions for selected category and shuffle
        this.questions = this.shuffleArray(quizQuestions[this.currentCategory]).slice(0, 10);
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.startTime = Date.now();
        this.totalTime = 0;

        // Update UI
        this.currentScore.textContent = '0';

        // Switch screens
        this.showScreen('quiz');

        // Load first question
        this.loadQuestion();
    }

    loadQuestion() {
        this.answered = false;
        const question = this.questions[this.currentQuestionIndex];

        // Update progress
        this.questionCounter.textContent = `문제 ${this.currentQuestionIndex + 1} / ${this.questions.length}`;
        const progress = ((this.currentQuestionIndex) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;

        // Update category badge
        const catInfo = categoryInfo[this.currentCategory];
        this.questionCategory.innerHTML = `<span class="category-badge">${catInfo.icon} ${catInfo.name}</span>`;

        // Update question text with animation
        this.questionText.style.opacity = '0';
        setTimeout(() => {
            this.questionText.textContent = question.question;
            this.questionText.style.opacity = '1';
        }, 150);

        // Generate options
        this.renderOptions(question);

        // Hide feedback and next button
        this.feedbackContainer.classList.add('hidden');
        this.nextBtn.classList.add('hidden');

        // Start timer
        this.startTimer();
    }

    renderOptions(question) {
        const labels = ['A', 'B', 'C', 'D'];
        this.optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.innerHTML = `
                <span class="option-label">${labels[index]}</span>
                <span class="option-text">${option}</span>
            `;
            button.addEventListener('click', () => this.selectAnswer(index));

            // Staggered animation
            button.style.opacity = '0';
            button.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                button.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                button.style.opacity = '1';
                button.style.transform = 'translateX(0)';
            }, 100 + index * 100);

            this.optionsContainer.appendChild(button);
        });
    }

    startTimer() {
        this.timeLeft = this.timePerQuestion;
        this.updateTimerDisplay();
        this.timer.classList.remove('warning');

        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();

            if (this.timeLeft <= 10) {
                this.timer.classList.add('warning');
            }

            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        this.timer.textContent = `⏱️ ${this.timeLeft}s`;
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    timeUp() {
        if (!this.answered) {
            this.stopTimer();
            this.answered = true;
            this.wrongAnswers++;

            const question = this.questions[this.currentQuestionIndex];
            const optionBtns = this.optionsContainer.querySelectorAll('.option-btn');

            // Disable all buttons
            optionBtns.forEach((btn, idx) => {
                btn.disabled = true;
                if (idx === question.correct) {
                    btn.classList.add('correct');
                }
            });

            this.showFeedback(false, question.explanation, true);
        }
    }

    selectAnswer(selectedIndex) {
        if (this.answered) return;

        this.answered = true;
        this.stopTimer();

        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;
        const optionBtns = this.optionsContainer.querySelectorAll('.option-btn');

        // Disable all buttons
        optionBtns.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === question.correct) {
                btn.classList.add('correct');
            } else if (idx === selectedIndex && !isCorrect) {
                btn.classList.add('wrong');
            }
        });

        // Update score
        if (isCorrect) {
            this.correctAnswers++;
            const timeBonus = Math.floor(this.timeLeft / 3);
            const questionScore = 10 + timeBonus;
            this.score += questionScore;
            this.currentScore.textContent = this.score;
        } else {
            this.wrongAnswers++;
        }

        this.showFeedback(isCorrect, question.explanation);
    }

    showFeedback(isCorrect, explanation, isTimeUp = false) {
        this.feedbackContainer.classList.remove('hidden');
        this.feedbackMessage.className = `feedback-message ${isCorrect ? 'correct' : 'wrong'}`;

        if (isTimeUp) {
            this.feedbackMessage.textContent = '⏰ 시간 초과!';
        } else if (isCorrect) {
            this.feedbackMessage.textContent = '🎉 정답입니다!';
        } else {
            this.feedbackMessage.textContent = '❌ 틀렸습니다!';
        }

        this.explanation.textContent = explanation;
        this.nextBtn.classList.remove('hidden');

        // Update next button text for last question
        if (this.currentQuestionIndex === this.questions.length - 1) {
            this.nextBtn.innerHTML = `결과 보기 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
        }
    }

    nextQuestion() {
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
        } else {
            this.nextBtn.innerHTML = `다음 문제 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
            this.loadQuestion();
        }
    }

    showResults() {
        this.stopTimer();
        this.totalTime = Math.floor((Date.now() - this.startTime) / 1000);

        // Calculate final score (out of 100)
        const maxPossibleScore = this.questions.length * 20; // 10 base + 10 max time bonus
        const percentScore = Math.round((this.score / maxPossibleScore) * 100);

        // Update result screen
        this.correctCount.textContent = this.correctAnswers;
        this.wrongCount.textContent = this.wrongAnswers;
        this.totalTimeEl.textContent = `${this.totalTime}s`;

        // Set result message based on score
        if (percentScore >= 80) {
            this.resultIcon.textContent = '🏆';
            this.resultTitle.textContent = '훌륭합니다!';
            this.resultMessage.textContent = '당신은 진정한 퀴즈 마스터입니다!';
        } else if (percentScore >= 60) {
            this.resultIcon.textContent = '🎉';
            this.resultTitle.textContent = '잘했어요!';
            this.resultMessage.textContent = '좋은 점수를 받았습니다!';
        } else if (percentScore >= 40) {
            this.resultIcon.textContent = '👍';
            this.resultTitle.textContent = '괜찮아요!';
            this.resultMessage.textContent = '조금 더 노력하면 더 좋은 점수를 받을 수 있어요!';
        } else {
            this.resultIcon.textContent = '💪';
            this.resultTitle.textContent = '다시 도전하세요!';
            this.resultMessage.textContent = '연습하면 더 잘할 수 있어요!';
        }

        // Switch to result screen
        this.showScreen('result');

        // Animate score
        this.animateScore(percentScore);
    }

    animateScore(targetScore) {
        const duration = 1500;
        const startTime = Date.now();
        const circumference = 2 * Math.PI * 54; // radius = 54

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

            const currentScore = Math.round(targetScore * easeProgress);
            this.finalScore.textContent = currentScore;

            // Animate ring
            const offset = circumference - (circumference * currentScore / 100);
            this.scoreRingProgress.style.strokeDashoffset = offset;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        // Set initial state
        this.scoreRingProgress.style.strokeDasharray = circumference;
        this.scoreRingProgress.style.strokeDashoffset = circumference;

        requestAnimationFrame(animate);
    }

    retryQuiz() {
        this.startQuiz();
    }

    goHome() {
        this.showScreen('start');
    }

    showScreen(screen) {
        this.startScreen.classList.remove('active');
        this.quizScreen.classList.remove('active');
        this.resultScreen.classList.remove('active');

        switch (screen) {
            case 'start':
                this.startScreen.classList.add('active');
                break;
            case 'quiz':
                this.quizScreen.classList.add('active');
                break;
            case 'result':
                this.resultScreen.classList.add('active');
                break;
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});
