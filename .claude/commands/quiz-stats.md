# Quiz Stats - 퀴즈 통계 관리

퀴즈 게임의 다양한 통계를 분석하고 관리합니다.

## 입력 파라미터

- **통계 유형**: $ARGUMENTS
- 유형: `questions`, `categories`, `difficulty`, `all`
- 미지정 시 전체 통계(`all`) 출력

## 통계 유형

### 1. questions - 문제 통계
- 총 문제 수
- 파일별 문제 수
- 카테고리별 문제 수

### 2. categories - 카테고리 통계
- 카테고리별 문제 분포
- 카테고리별 정답 분포
- 카테고리별 평균 문제 길이

### 3. difficulty - 난이도 통계
- 난이도별 문제 수 (datasci-trivia)
- 난이도별 평균 문제 길이
- 난이도별 전문 용어 사용 빈도

### 4. all - 전체 통계
- 위 모든 통계 종합

## 수행 작업

1. `quiz-master/questions.js`와 `datasci-trivia/questions.js` 파일을 읽습니다.
2. 요청된 통계 유형에 따라 데이터를 분석합니다.
3. 시각적으로 보기 좋은 형식으로 출력합니다.

## 출력 형식

```
## 퀴즈 통계 리포트

### 전체 요약
| 항목 | 값 |
|-----|---|
| 총 문제 수 | N개 |
| quiz-master | N개 |
| datasci-trivia | N개 |

### 카테고리별 분포

#### quiz-master
| 카테고리 | 문제 수 | 비율 |
|---------|--------|-----|
| general | 10 | 25% |
| science | 10 | 25% |
| history | 10 | 25% |
| geography | 10 | 25% |

#### datasci-trivia
| 카테고리 | easy | medium | hard | 합계 |
|---------|------|--------|------|-----|
| ml | 5 | 5 | 5 | 15 |
| stats | 5 | 5 | 5 | 15 |
| python | 5 | 5 | 5 | 15 |
| data | 5 | 5 | 5 | 15 |

### 정답 분포
| 정답 위치 | quiz-master | datasci-trivia | 전체 |
|----------|-------------|----------------|-----|
| 0 | N (N%) | N (N%) | N (N%) |
| 1 | N (N%) | N (N%) | N (N%) |
| 2 | N (N%) | N (N%) | N (N%) |
| 3 | N (N%) | N (N%) | N (N%) |

### 문제 길이 분석
| 구분 | 최소 | 최대 | 평균 |
|-----|-----|-----|-----|
| quiz-master | N자 | N자 | N자 |
| datasci-trivia | N자 | N자 | N자 |

### 권장 사항
- [불균형한 부분에 대한 개선 제안]
```

## 사용 예시

```
/project:quiz-stats              # 전체 통계
/project:quiz-stats questions    # 문제 수 통계만
/project:quiz-stats categories   # 카테고리 통계만
/project:quiz-stats difficulty   # 난이도 통계만
```

## 활용 방안

- 문제 추가 시 부족한 카테고리 파악
- 정답 분포 불균형 확인
- 난이도 조절 필요 영역 식별
- 전체 퀴즈 품질 모니터링
