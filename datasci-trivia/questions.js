/**
 * DataSciTrivia Quiz Game
 * 데이터 사이언스 퀴즈 문제 데이터베이스
 * 카테고리: ml(머신러닝), stats(통계), python(파이썬), data(데이터분석)
 * 난이도: easy, medium, hard
 */

const QUIZ_DATA = {
  ml: {
    easy: [
      {
        question: "지도 학습(Supervised Learning)에서 사용되는 것은?",
        options: ["레이블이 있는 데이터", "레이블이 없는 데이터", "강화 신호", "보상 함수"],
        answer: 0
      },
      {
        question: "선형 회귀(Linear Regression)는 어떤 유형의 문제를 해결하나요?",
        options: ["분류", "회귀", "클러스터링", "차원 축소"],
        answer: 1
      },
      {
        question: "과적합(Overfitting)을 방지하는 방법이 아닌 것은?",
        options: ["정규화", "드롭아웃", "더 많은 데이터", "모델 복잡도 증가"],
        answer: 3
      },
      {
        question: "K-Means는 어떤 유형의 학습인가요?",
        options: ["지도 학습", "비지도 학습", "강화 학습", "준지도 학습"],
        answer: 1
      },
      {
        question: "신경망에서 활성화 함수의 역할은?",
        options: ["비선형성 추가", "가중치 초기화", "데이터 정규화", "손실 계산"],
        answer: 0
      }
    ],
    medium: [
      {
        question: "Gradient Descent에서 학습률(Learning Rate)이 너무 크면?",
        options: ["수렴이 느림", "발산할 수 있음", "최적해 도달", "과적합 발생"],
        answer: 1
      },
      {
        question: "Random Forest는 어떤 앙상블 기법을 사용하나요?",
        options: ["Boosting", "Bagging", "Stacking", "Voting"],
        answer: 1
      },
      {
        question: "ReLU 함수의 수식은?",
        options: ["max(0, x)", "1/(1+e^-x)", "tanh(x)", "e^x/(Σe^x)"],
        answer: 0
      },
      {
        question: "교차 검증(Cross-Validation)의 목적은?",
        options: ["학습 속도 향상", "모델 일반화 성능 평가", "데이터 증강", "특성 선택"],
        answer: 1
      },
      {
        question: "L1 정규화(Lasso)의 특징은?",
        options: ["가중치를 0으로 만들 수 있음", "가중치를 작게만 만듦", "드롭아웃과 동일", "배치 정규화와 동일"],
        answer: 0
      }
    ],
    hard: [
      {
        question: "XGBoost의 특징이 아닌 것은?",
        options: ["Regularization 지원", "병렬 처리", "Bootstrap Aggregating", "Gradient Boosting 기반"],
        answer: 2
      },
      {
        question: "Transformer 모델의 핵심 메커니즘은?",
        options: ["Recurrence", "Self-Attention", "Convolution", "Pooling"],
        answer: 1
      },
      {
        question: "SHAP 값의 기반이 되는 이론은?",
        options: ["게임 이론", "정보 이론", "확률 이론", "그래프 이론"],
        answer: 0
      },
      {
        question: "GPT 모델에서 사용하는 학습 방식은?",
        options: ["Masked Language Model", "Autoregressive", "Encoder-Decoder", "Contrastive Learning"],
        answer: 1
      },
      {
        question: "Knowledge Distillation에서 Teacher 모델의 역할은?",
        options: ["경량화된 추론", "소프트 레이블 제공", "하드 레이블 제공", "데이터 증강"],
        answer: 1
      }
    ]
  },
  stats: {
    easy: [
      {
        question: "평균(Mean)과 중앙값(Median)이 같은 분포는?",
        options: ["정규 분포", "지수 분포", "포아송 분포", "감마 분포"],
        answer: 0
      },
      {
        question: "표준편차의 제곱은 무엇인가요?",
        options: ["평균", "분산", "중앙값", "최빈값"],
        answer: 1
      },
      {
        question: "상관계수의 범위는?",
        options: ["0 ~ 1", "-1 ~ 1", "-∞ ~ ∞", "0 ~ 100"],
        answer: 1
      },
      {
        question: "p-value가 0.05보다 작으면?",
        options: ["귀무가설 기각", "귀무가설 채택", "검정력 증가", "표본 크기 부족"],
        answer: 0
      },
      {
        question: "이상치(Outlier) 탐지에 사용되는 것은?",
        options: ["IQR", "평균", "최빈값", "공분산"],
        answer: 0
      }
    ],
    medium: [
      {
        question: "베이즈 정리에서 사후확률을 계산할 때 필요한 것이 아닌 것은?",
        options: ["사전확률", "가능도", "증거", "표본평균"],
        answer: 3
      },
      {
        question: "중심극한정리(CLT)에 따르면, 표본 크기가 커질수록?",
        options: ["분포가 균등해짐", "분포가 정규분포에 가까워짐", "분산이 증가", "평균이 증가"],
        answer: 1
      },
      {
        question: "회귀분석에서 결정계수(R²)가 0.85라면?",
        options: ["85% 설명력", "15% 설명력", "85% 오차", "회귀 불가"],
        answer: 0
      },
      {
        question: "Type I Error(1종 오류)는 무엇인가요?",
        options: ["거짓 양성", "거짓 음성", "참 양성", "참 음성"],
        answer: 0
      },
      {
        question: "A/B 테스트에서 통계적 유의성을 판단하는 기준은?",
        options: ["표본 크기", "p-value", "평균 차이", "표준편차"],
        answer: 1
      }
    ],
    hard: [
      {
        question: "다중공선성(Multicollinearity)을 진단하는 지표는?",
        options: ["VIF", "R²", "MSE", "AIC"],
        answer: 0
      },
      {
        question: "Maximum Likelihood Estimation(MLE)의 목적은?",
        options: ["사후확률 최대화", "가능도 함수 최대화", "사전확률 최대화", "오차 최소화"],
        answer: 1
      },
      {
        question: "Bayesian 추론에서 사용하는 MCMC 알고리즘이 아닌 것은?",
        options: ["Metropolis-Hastings", "Gibbs Sampling", "Newton-Raphson", "Hamiltonian MC"],
        answer: 2
      },
      {
        question: "카이제곱 검정은 어떤 유형의 데이터에 적합한가요?",
        options: ["연속형 데이터", "범주형 데이터", "시계열 데이터", "이미지 데이터"],
        answer: 1
      },
      {
        question: "Bootstrap 방법의 핵심 아이디어는?",
        options: ["모수 추정", "복원 추출", "비복원 추출", "층화 추출"],
        answer: 1
      }
    ]
  },
  python: {
    easy: [
      {
        question: "Pandas에서 DataFrame을 읽는 함수는?",
        options: ["pd.load_csv()", "pd.read_csv()", "pd.open_csv()", "pd.import_csv()"],
        answer: 1
      },
      {
        question: "NumPy 배열의 shape 속성은 무엇을 반환하나요?",
        options: ["데이터 타입", "배열 차원", "원소 개수", "메모리 크기"],
        answer: 1
      },
      {
        question: "Python에서 리스트 컴프리헨션의 형식은?",
        options: ["[x for x in list]", "{x for x in list}", "(x for x in list)", "<x for x in list>"],
        answer: 0
      },
      {
        question: "Scikit-learn에서 모델 학습에 사용하는 메서드는?",
        options: ["train()", "fit()", "learn()", "build()"],
        answer: 1
      },
      {
        question: "Matplotlib에서 그래프를 그리는 기본 함수는?",
        options: ["draw()", "show()", "plot()", "graph()"],
        answer: 2
      }
    ],
    medium: [
      {
        question: "Pandas에서 결측치를 처리하는 메서드가 아닌 것은?",
        options: ["fillna()", "dropna()", "isna()", "removena()"],
        answer: 3
      },
      {
        question: "NumPy에서 행렬 곱을 수행하는 함수는?",
        options: ["np.multiply()", "np.dot()", "np.product()", "np.times()"],
        answer: 1
      },
      {
        question: "Python의 lambda 함수의 특징은?",
        options: ["클래스 선언", "익명 함수", "비동기 함수", "제너레이터"],
        answer: 1
      },
      {
        question: "Seaborn에서 상관관계 히트맵을 그리는 함수는?",
        options: ["heatmap()", "corr_plot()", "correlation()", "matrix_plot()"],
        answer: 0
      },
      {
        question: "Pandas의 groupby() 이후 사용할 수 없는 것은?",
        options: ["agg()", "transform()", "apply()", "reshape()"],
        answer: 3
      }
    ],
    hard: [
      {
        question: "Python에서 GIL(Global Interpreter Lock)의 영향은?",
        options: ["메모리 효율 향상", "멀티스레드 병렬 처리 제한", "타입 체크 강화", "가비지 컬렉션 최적화"],
        answer: 1
      },
      {
        question: "Pandas의 .loc과 .iloc의 차이점은?",
        options: ["속도 차이", "레이블 vs 정수 인덱싱", "행 vs 열 선택", "복사 vs 뷰"],
        answer: 1
      },
      {
        question: "NumPy의 브로드캐스팅 규칙에서 호환되는 조건은?",
        options: ["차원이 같거나 1일 때", "차원이 같을 때만", "항상 호환", "명시적 변환 필요"],
        answer: 0
      },
      {
        question: "Python에서 @property 데코레이터의 용도는?",
        options: ["클래스 메서드 정의", "getter/setter 구현", "정적 메서드 정의", "추상 메서드 정의"],
        answer: 1
      },
      {
        question: "Dask가 Pandas보다 유리한 경우는?",
        options: ["작은 데이터셋", "메모리보다 큰 데이터셋", "실시간 처리", "시각화"],
        answer: 1
      }
    ]
  },
  data: {
    easy: [
      {
        question: "ETL은 무엇의 약자인가요?",
        options: ["Extract, Transform, Load", "Enter, Test, Leave", "Edit, Transfer, Link", "Examine, Train, Learn"],
        answer: 0
      },
      {
        question: "데이터 시각화에 적합하지 않은 차트는?",
        options: ["막대 그래프", "파이 차트", "산점도", "해시 테이블"],
        answer: 3
      },
      {
        question: "Feature Engineering의 목적은?",
        options: ["데이터 수집", "모델 성능 향상", "데이터 저장", "모델 배포"],
        answer: 1
      },
      {
        question: "정규화(Normalization)의 목적은?",
        options: ["데이터 삭제", "스케일 조정", "레이블 생성", "차원 증가"],
        answer: 1
      },
      {
        question: "데이터 레이크(Data Lake)의 특징은?",
        options: ["구조화된 데이터만 저장", "비정형 데이터도 저장", "실시간 처리 전용", "소량 데이터 전용"],
        answer: 1
      }
    ],
    medium: [
      {
        question: "원-핫 인코딩(One-Hot Encoding)은 어떤 데이터에 적용하나요?",
        options: ["연속형 데이터", "범주형 데이터", "시계열 데이터", "텍스트 데이터"],
        answer: 1
      },
      {
        question: "주성분 분석(PCA)의 목적은?",
        options: ["분류", "차원 축소", "클러스터링", "이상치 탐지"],
        answer: 1
      },
      {
        question: "SMOTE는 어떤 문제를 해결하나요?",
        options: ["과적합", "불균형 데이터", "결측치", "다중공선성"],
        answer: 1
      },
      {
        question: "데이터 파이프라인에서 Airflow의 역할은?",
        options: ["데이터 저장", "워크플로우 오케스트레이션", "데이터 시각화", "모델 학습"],
        answer: 1
      },
      {
        question: "Feature Selection과 Feature Extraction의 차이는?",
        options: ["동일한 개념", "선택 vs 변환", "지도 vs 비지도", "전처리 vs 후처리"],
        answer: 1
      }
    ],
    hard: [
      {
        question: "Data Drift를 탐지하는 방법이 아닌 것은?",
        options: ["PSI", "KS 검정", "Chi-squared 검정", "Cross-validation"],
        answer: 3
      },
      {
        question: "MLOps에서 Model Registry의 역할은?",
        options: ["데이터 저장", "모델 버전 관리", "하이퍼파라미터 튜닝", "피처 엔지니어링"],
        answer: 1
      },
      {
        question: "Target Leakage가 발생하는 상황은?",
        options: ["테스트 데이터 부족", "학습 시 미래 정보 포함", "모델 저장 실패", "하이퍼파라미터 오류"],
        answer: 1
      },
      {
        question: "시계열 데이터에서 정상성(Stationarity)을 검정하는 방법은?",
        options: ["t-test", "ADF 검정", "ANOVA", "Chi-squared"],
        answer: 1
      },
      {
        question: "데이터 품질 측정 지표가 아닌 것은?",
        options: ["완전성", "정확성", "일관성", "확장성"],
        answer: 3
      }
    ]
  }
};

// 카테고리 정보
const CATEGORY_INFO = {
  ml: { label: "머신러닝", emoji: "🤖" },
  stats: { label: "통계학", emoji: "📊" },
  python: { label: "Python", emoji: "🐍" },
  data: { label: "데이터분석", emoji: "📈" }
};
