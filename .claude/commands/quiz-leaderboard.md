# Quiz Leaderboard - 순위 시스템 관리

퀴즈 게임의 리더보드(순위표) 시스템을 관리합니다.

## 입력 파라미터

- **명령**: $1 (첫 번째 인자)
- **추가 인자**: $2, $3 (명령에 따라)
- 입력 형식: `$ARGUMENTS` = "명령 [인자...]"

## 사용 가능한 명령

| 명령 | 설명 | 형식 |
|-----|------|-----|
| `view` | 순위표 조회 | `view [카테고리]` |
| `design` | 순위 시스템 설계 | `design` |
| `schema` | 데이터 스키마 확인 | `schema` |
| `rules` | 점수 규칙 관리 | `rules [set/view]` |
| `reset` | 순위 초기화 가이드 | `reset [카테고리]` |

## 순위 시스템 구조

### 점수 계산 방식

#### quiz-master
```
기본 점수: 100점/문제
시간 보너스: (30 - 소요시간) × 3점
최종 점수: 기본점수 + 시간보너스
```

#### datasci-trivia
```
난이도별 점수:
- easy: 100점
- medium: 150점
- hard: 200점

시간 보너스: (15 - 소요시간) × 5점
```

### 리더보드 스키마

```javascript
// 권장 localStorage 스키마
const leaderboardSchema = {
  quizMaster: {
    [category]: [
      {
        rank: 1,
        name: "플레이어명",
        score: 1000,
        correctCount: 10,
        totalQuestions: 10,
        avgTime: 5.2,
        date: "2024-01-01"
      }
    ]
  },
  datasciTrivia: {
    [category]: {
      [difficulty]: [
        // 같은 구조
      ]
    }
  }
};
```

## 수행 작업

### view - 순위표 조회
1. 현재 앱의 리더보드 구현 상태를 확인합니다.
2. 저장된 순위 데이터 구조를 분석합니다.
3. 순위표를 보기 좋게 출력합니다.

### design - 시스템 설계
1. 현재 구현된 순위 시스템을 분석합니다.
2. 개선이 필요한 부분을 식별합니다.
3. 새로운 기능 제안을 제공합니다.

### schema - 스키마 확인
1. app.js 파일들의 리더보드 관련 코드를 분석합니다.
2. 데이터 저장 구조를 문서화합니다.

### rules - 점수 규칙
1. 현재 점수 계산 로직을 확인합니다.
2. 규칙 수정 제안을 받습니다.

## 출력 형식

```
## 리더보드 관리

### 현재 상태
**quiz-master**: [구현됨/미구현]
**datasci-trivia**: [구현됨/미구현]

### 순위표 (예시)

#### Quiz Master - General
| 순위 | 이름 | 점수 | 정답률 | 평균시간 | 날짜 |
|-----|-----|-----|-------|---------|-----|
| 🥇 1 | Player1 | 1250 | 100% | 4.2s | 2024-01-01 |
| 🥈 2 | Player2 | 1100 | 90% | 5.1s | 2024-01-02 |
| 🥉 3 | Player3 | 980 | 80% | 6.3s | 2024-01-03 |

### 점수 규칙
- 기본 점수: N점/문제
- 시간 보너스: 공식
- 연속 정답 보너스: (있는 경우)

### 개선 제안
- [현재 시스템의 개선점]
```

## 사용 예시

```
/project:quiz-leaderboard view           # 전체 순위표 조회
/project:quiz-leaderboard view general   # general 카테고리 순위
/project:quiz-leaderboard design         # 시스템 설계 분석
/project:quiz-leaderboard schema         # 데이터 스키마 확인
/project:quiz-leaderboard rules view     # 점수 규칙 조회
/project:quiz-leaderboard rules set      # 점수 규칙 수정
/project:quiz-leaderboard reset          # 초기화 가이드
```

## 기능 확장 제안

### 추가 가능한 기능
1. **글로벌 리더보드**: 서버 기반 순위 시스템
2. **주간/월간 순위**: 기간별 순위 관리
3. **업적 시스템**: 특정 조건 달성 시 뱃지 부여
4. **친구 대결**: 특정 사용자와 점수 비교

### 구현 시 고려사항
- localStorage 용량 제한 (5MB)
- 데이터 무결성 검증
- 부정 행위 방지
