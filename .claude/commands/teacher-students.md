# Teacher Students - 학생 관리

학생 정보를 등록, 조회, 수정, 삭제하는 기능을 제공합니다.

## 입력 파라미터

- **명령**: $1 (첫 번째 인자)
- **추가 인자**: $2, $3... (명령에 따라)
- 입력 형식: `$ARGUMENTS` = "명령 [인자...]"

## 사용 가능한 명령

| 명령 | 설명 | 형식 |
|-----|------|-----|
| `list` | 전체 학생 목록 조회 | `list [반]` |
| `add` | 새 학생 등록 | `add 이름 반` |
| `remove` | 학생 삭제 | `remove 학생ID` |
| `info` | 학생 상세 정보 | `info 학생ID` |
| `search` | 학생 검색 | `search 검색어` |
| `import` | 학생 일괄 등록 | `import` |
| `export` | 학생 목록 내보내기 | `export` |

## 데이터 스키마

### 학생 데이터 구조 (권장)
```javascript
// students.json 또는 localStorage
const studentsData = {
  students: [
    {
      id: "STU001",
      name: "홍길동",
      class: "1반",
      enrolledAt: "2024-01-15",
      status: "active",  // active, inactive, graduated
      email: "student@example.com",  // 선택
      memo: ""  // 선택
    }
  ],
  classes: ["1반", "2반", "3반"],
  lastUpdated: "2024-01-15T10:00:00Z"
};
```

## 수행 작업

### list - 학생 목록 조회
```
[학생 목록]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
반: 전체 (또는 특정 반)
총 학생 수: N명

| ID | 이름 | 반 | 상태 | 등록일 |
|----|-----|----|----|-------|
| STU001 | 홍길동 | 1반 | 활성 | 2024-01-15 |
| STU002 | 김철수 | 1반 | 활성 | 2024-01-16 |
```

### add - 학생 등록
```
[학생 등록]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
이름: 홍길동
반: 1반
생성된 ID: STU003
등록 완료: ✅
```

### info - 학생 상세 정보
```
[학생 상세 정보]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ID: STU001
이름: 홍길동
반: 1반
상태: 활성
등록일: 2024-01-15

📊 퀴즈 참여 현황:
- 총 참여: N회
- 평균 점수: N점
- 최고 점수: N점
- 최근 참여: 2024-01-20
```

### import - 일괄 등록
CSV 또는 JSON 형식으로 여러 학생을 한 번에 등록합니다.

```csv
이름,반,이메일
홍길동,1반,hong@example.com
김철수,2반,kim@example.com
```

## 사용 예시

```
/project:teacher-students list           # 전체 학생 목록
/project:teacher-students list 1반       # 1반 학생만
/project:teacher-students add 홍길동 1반  # 새 학생 등록
/project:teacher-students info STU001    # 학생 상세 정보
/project:teacher-students search 홍      # 이름에 '홍' 포함된 학생
/project:teacher-students remove STU001  # 학생 삭제
```

## 주의사항

- 학생 삭제 시 관련 성적 데이터 처리 방법 확인 필요
- ID는 자동 생성되며 중복 불가
- 반 정보는 미리 정의된 목록에서 선택 권장
