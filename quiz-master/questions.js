const quizQuestions = {
    general: [
        { question: "세계에서 가장 큰 대양은?", options: ["대서양", "인도양", "태평양", "북극해"], correct: 2, explanation: "태평양은 지구 표면의 약 30%를 차지합니다." },
        { question: "피아노의 건반은 총 몇 개?", options: ["76개", "88개", "92개", "100개"], correct: 1, explanation: "표준 피아노에는 88개의 건반이 있습니다." },
        { question: "빛의 3원색이 아닌 것은?", options: ["빨강", "초록", "파랑", "노랑"], correct: 3, explanation: "빛의 3원색은 빨강, 초록, 파랑입니다." },
        { question: "올림픽 오륜기의 고리 개수는?", options: ["4개", "5개", "6개", "7개"], correct: 1, explanation: "5개 고리는 5개 대륙을 상징합니다." },
        { question: "다음 중 포유류가 아닌 것은?", options: ["돌고래", "박쥐", "고래", "펭귄"], correct: 3, explanation: "펭귄은 조류입니다." },
        { question: "다이아몬드의 모스 경도는?", options: ["8", "9", "10", "12"], correct: 2, explanation: "다이아몬드는 최고 경도 10입니다." },
        { question: "한글 창제 연도는?", options: ["1392년", "1443년", "1592년", "1776년"], correct: 1, explanation: "세종대왕이 1443년 창제했습니다." },
        { question: "인체에서 가장 큰 장기는?", options: ["간", "폐", "피부", "소장"], correct: 2, explanation: "피부는 약 2㎡의 면적을 가집니다." },
        { question: "세계에서 가장 긴 강이 있는 대륙은?", options: ["아시아", "남미", "아프리카", "북미"], correct: 2, explanation: "나일강은 아프리카에 있습니다." },
        { question: "지구에서 달까지의 거리는?", options: ["38만km", "150만km", "384만km", "1억km"], correct: 0, explanation: "약 38만 4천km입니다." }
    ],
    science: [
        { question: "물의 화학식은?", options: ["CO2", "H2O", "O2", "NaCl"], correct: 1, explanation: "수소 2개, 산소 1개입니다." },
        { question: "빛의 속도는 초당?", options: ["30만km", "15만km", "100만km", "1만km"], correct: 0, explanation: "진공에서 약 30만km/s입니다." },
        { question: "DNA 이중나선 발견자는?", options: ["아인슈타인", "뉴턴", "왓슨과 크릭", "다윈"], correct: 2, explanation: "1953년 발견했습니다." },
        { question: "태양계 최대 행성은?", options: ["토성", "해왕성", "목성", "천왕성"], correct: 2, explanation: "목성은 지구의 약 1300배입니다." },
        { question: "절대영도는 섭씨 몇 도?", options: ["-100°C", "-273°C", "-459°C", "0°C"], correct: 1, explanation: "-273.15°C입니다." },
        { question: "인간의 염색체는 몇 쌍?", options: ["21쌍", "23쌍", "25쌍", "46쌍"], correct: 1, explanation: "23쌍, 총 46개입니다." },
        { question: "대기에서 가장 많은 기체는?", options: ["산소", "이산화탄소", "질소", "아르곤"], correct: 2, explanation: "질소가 약 78%입니다." },
        { question: "전기저항의 단위는?", options: ["볼트", "암페어", "와트", "옴"], correct: 3, explanation: "옴(Ω)입니다." },
        { question: "광합성에서 생성되는 기체는?", options: ["이산화탄소", "질소", "산소", "수소"], correct: 2, explanation: "산소가 생성됩니다." },
        { question: "원자의 중심부를 무엇이라 하나?", options: ["전자", "원자핵", "쿼크", "이온"], correct: 1, explanation: "양성자와 중성자로 구성됩니다." }
    ],
    history: [
        { question: "2차 세계대전 종료 연도는?", options: ["1943년", "1944년", "1945년", "1946년"], correct: 2, explanation: "1945년 9월 공식 종료되었습니다." },
        { question: "임시정부 수립 도시는?", options: ["베이징", "도쿄", "상하이", "홍콩"], correct: 2, explanation: "1919년 상하이에서 수립되었습니다." },
        { question: "피라미드 건설 문명은?", options: ["로마", "그리스", "이집트", "메소포타미아"], correct: 2, explanation: "약 4500년 전 이집트입니다." },
        { question: "프랑스 혁명 연도는?", options: ["1776년", "1789년", "1799년", "1812년"], correct: 1, explanation: "1789년 7월 14일입니다." },
        { question: "콜럼버스 아메리카 도착 연도는?", options: ["1492년", "1500년", "1520년", "1550년"], correct: 0, explanation: "1492년 10월 12일입니다." },
        { question: "고조선 건국자는?", options: ["박혁거세", "단군왕검", "주몽", "온조"], correct: 1, explanation: "기원전 2333년입니다." },
        { question: "임진왜란 발발 연도는?", options: ["1592년", "1597년", "1600년", "1636년"], correct: 0, explanation: "1592년입니다." },
        { question: "베를린 장벽 붕괴 연도는?", options: ["1985년", "1987년", "1989년", "1991년"], correct: 2, explanation: "1989년 11월 9일입니다." },
        { question: "조선 건국자는?", options: ["이방원", "이성계", "정도전", "최영"], correct: 1, explanation: "1392년 태조로 즉위했습니다." },
        { question: "6.25 전쟁 발발 연도는?", options: ["1945년", "1948년", "1950년", "1953년"], correct: 2, explanation: "1950년 6월 25일입니다." }
    ],
    geography: [
        { question: "세계 최고봉은?", options: ["K2", "칸첸중가", "에베레스트", "로체"], correct: 2, explanation: "8,848m입니다." },
        { question: "세계에서 가장 작은 나라는?", options: ["모나코", "산마리노", "바티칸", "리히텐슈타인"], correct: 2, explanation: "면적 0.44㎢입니다." },
        { question: "호주의 수도는?", options: ["시드니", "멜버른", "브리즈번", "캔버라"], correct: 3, explanation: "캔버라입니다." },
        { question: "아마존 강 주요 국가는?", options: ["아르헨티나", "브라질", "칠레", "콜롬비아"], correct: 1, explanation: "대부분 브라질을 통과합니다." },
        { question: "적도가 통과하지 않는 대륙은?", options: ["아프리카", "아시아", "유럽", "남미"], correct: 2, explanation: "유럽은 적도 북쪽입니다." },
        { question: "인구가 가장 많은 나라는?", options: ["미국", "인도", "중국", "인도네시아"], correct: 1, explanation: "2023년 기준 인도입니다." },
        { question: "사하라 사막 대륙은?", options: ["아시아", "호주", "아프리카", "남미"], correct: 2, explanation: "아프리카 북부입니다." },
        { question: "일본 최대 섬은?", options: ["홋카이도", "혼슈", "규슈", "시코쿠"], correct: 1, explanation: "혼슈입니다." },
        { question: "독도가 속한 해역은?", options: ["황해", "동해", "남해", "태평양"], correct: 1, explanation: "동해입니다." },
        { question: "알프스 산맥 대륙은?", options: ["아시아", "유럽", "북미", "남미"], correct: 1, explanation: "유럽 중앙부입니다." }
    ]
};

const categoryInfo = {
    general: { icon: "📚", name: "일반 상식" },
    science: { icon: "🔬", name: "과학" },
    history: { icon: "🏛️", name: "역사" },
    geography: { icon: "🌍", name: "지리" }
};
