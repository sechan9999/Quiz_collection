/**
 * Trivia Quiz Game
 * 메인 앱 로직
 */

(function () {
  'use strict';

  // ===== 게임 상태 =====
  let currentCategory = 'ml';
  let currentDifficulty = 'easy';
  let questions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 15;
  let timerInterval = null;
  let answeredTimes = [];
  let isAnswered = false;

  // ===== DOM 요소 =====
  const screens = {
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen')
  };

  const elements = {
    categorySelect: document.getElementById('category'),
    difficultyBtns: document.querySelectorAll('.diff-btn'),
    startBtn: document.getElementById('start-btn'),
    questionCount: document.getElementById('question-count'),
    scoreDisplay: document.getElementById('score-display'),
    progressFill: document.getElementById('progress-fill'),
    timer: document.getElementById('timer'),
    currentCategory: document.getElementById('current-category'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options'),
    nextBtn: document.getElementById('next-btn'),
    resultEmoji: document.getElementById('result-emoji'),
    resultTitle: document.getElementById('result-title'),
    resultScore: document.getElementById('result-score'),
    resultPercent: document.getElementById('result-percent'),
    correctCount: document.getElementById('correct-count'),
    wrongCount: document.getElementById('wrong-count'),
    avgTime: document.getElementById('avg-time'),
    retryBtn: document.getElementById('retry-btn'),
    homeBtn: document.getElementById('home-btn')
  };

  // ===== 초기화 =====
  function init() {
    setupEventListeners();
  }

  // ===== 이벤트 리스너 설정 =====
  function setupEventListeners() {
    // 난이도 선택
    elements.difficultyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.difficultyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDifficulty = btn.dataset.diff;
      });
    });

    // 게임 시작
    elements.startBtn.addEventListener('click', startGame);

    // 다음 문제
    elements.nextBtn.addEventListener('click', nextQuestion);

    // 다시하기
    elements.retryBtn.addEventListener('click', startGame);

    // 홈으로
    elements.homeBtn.addEventListener('click', goHome);

    // 선택지 클릭 (이벤트 위임)
    elements.optionsContainer.addEventListener('click', (e) => {
      const optionBtn = e.target.closest('.option-btn');
      if (optionBtn && !isAnswered) {
        const selectedIndex = parseInt(optionBtn.dataset.index);
        checkAnswer(selectedIndex);
      }
    });
  }

  // ===== 화면 전환 =====
  function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
  }

  // ===== 게임 시작 =====
  function startGame() {
    currentCategory = elements.categorySelect.value;
    questions = getRandomQuestions(currentCategory, currentDifficulty, 10);
    currentQuestionIndex = 0;
    score = 0;
    answeredTimes = [];

    showScreen('quiz');
    showQuestion();
  }

  // ===== 랜덤 문제 추출 =====
  function getRandomQuestions(category, difficulty, count) {
    const pool = QUIZ_DATA[category][difficulty];
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  // ===== 문제 표시 =====
  function showQuestion() {
    isAnswered = false;
    const question = questions[currentQuestionIndex];
    const categoryInfo = CATEGORY_INFO[currentCategory];

    // 헤더 업데이트
    elements.questionCount.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;
    elements.scoreDisplay.textContent = `점수: ${score}`;
    elements.progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    elements.currentCategory.textContent = `${categoryInfo.emoji} ${categoryInfo.label}`;

    // 문제 텍스트
    elements.questionText.textContent = question.question;

    // 선택지 생성
    const letters = ['A', 'B', 'C', 'D'];
    elements.optionsContainer.innerHTML = question.options.map((option, index) => `
      <button class="option-btn" data-index="${index}">
        <span class="option-letter">${letters[index]}</span>
        <span class="option-text">${option}</span>
      </button>
    `).join('');

    // 다음 버튼 숨김
    elements.nextBtn.classList.add('hidden');

    // 타이머 시작
    startTimer();
  }

  // ===== 타이머 =====
  function startTimer() {
    timeLeft = 15;
    updateTimerDisplay();

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timeUp();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    elements.timer.textContent = `⏱️ ${timeLeft}`;
    elements.timer.classList.remove('warning', 'danger');

    if (timeLeft <= 5) {
      elements.timer.classList.add('danger');
    } else if (timeLeft <= 10) {
      elements.timer.classList.add('warning');
    }
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // ===== 시간 초과 =====
  function timeUp() {
    isAnswered = true;
    answeredTimes.push(15);

    const question = questions[currentQuestionIndex];
    const optionBtns = elements.optionsContainer.querySelectorAll('.option-btn');

    // 정답 표시
    optionBtns.forEach((btn, index) => {
      btn.classList.add('disabled');
      if (index === question.answer) {
        btn.classList.add('correct');
      }
    });

    elements.nextBtn.classList.remove('hidden');
  }

  // ===== 정답 확인 =====
  function checkAnswer(selectedIndex) {
    isAnswered = true;
    stopTimer();

    const timeTaken = 15 - timeLeft;
    answeredTimes.push(timeTaken);

    const question = questions[currentQuestionIndex];
    const optionBtns = elements.optionsContainer.querySelectorAll('.option-btn');

    // 모든 버튼 비활성화
    optionBtns.forEach((btn, index) => {
      btn.classList.add('disabled');

      if (index === question.answer) {
        btn.classList.add('correct');
      } else if (index === selectedIndex) {
        btn.classList.add('wrong');
      }
    });

    // 점수 계산
    if (selectedIndex === question.answer) {
      score++;
      elements.scoreDisplay.textContent = `점수: ${score}`;
    }

    // 다음 버튼 표시
    elements.nextBtn.classList.remove('hidden');
  }

  // ===== 다음 문제 =====
  function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
      showResults();
    } else {
      showQuestion();
    }
  }

  // ===== 결과 화면 =====
  function showResults() {
    stopTimer();
    showScreen('result');

    const percent = Math.round((score / questions.length) * 100);
    const avgTime = answeredTimes.length > 0
      ? (answeredTimes.reduce((a, b) => a + b, 0) / answeredTimes.length).toFixed(1)
      : 0;

    // 결과에 따른 이모지와 메시지
    let emoji, title;
    if (percent >= 90) {
      emoji = '🏆';
      title = '완벽해요!';
    } else if (percent >= 70) {
      emoji = '🎉';
      title = '훌륭해요!';
    } else if (percent >= 50) {
      emoji = '👍';
      title = '잘했어요!';
    } else if (percent >= 30) {
      emoji = '💪';
      title = '조금 더 노력해봐요!';
    } else {
      emoji = '📚';
      title = '다시 도전해봐요!';
    }

    elements.resultEmoji.textContent = emoji;
    elements.resultTitle.textContent = title;
    elements.resultScore.textContent = `${score} / ${questions.length}`;
    elements.resultPercent.textContent = `정답률: ${percent}%`;
    elements.correctCount.textContent = score;
    elements.wrongCount.textContent = questions.length - score;
    elements.avgTime.textContent = `${avgTime}초`;
  }

  // ===== 홈으로 =====
  function goHome() {
    stopTimer();
    showScreen('start');
  }

  // ===== 앱 시작 =====
  document.addEventListener('DOMContentLoaded', init);

})();
