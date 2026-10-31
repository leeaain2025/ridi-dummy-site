/* ------------------------------------------------------------------
 * 더미 데이터
 * cover 가 비어 있으면 제목 기반 SVG 표지를 자동 생성합니다.
 * 실제 리디 표지를 쓰려면 tools/extract-books.js 로 뽑은 결과를
 * 여기 BOOKS 배열에 덮어쓰거나, 각 항목의 cover 에 URL 을 넣으세요.
 *   예) cover: "https://img.ridicdn.net/cover/1546000091/xxlarge"
 * ------------------------------------------------------------------ */
window.RIDI = window.RIDI || {};

RIDI.BOOKS = [
  { id: 1, title: "빨강의 자서전", author: "앤 카슨", rating: 4.6, count: 312, price: 11200, org: 16000, dc: 30, tag: "", pal: 0 },
  { id: 2, title: "남편의 아름다움", author: "앤 카슨", rating: 4.4, count: 128, price: 10500, org: 15000, dc: 30, tag: "", pal: 1 },
  { id: 3, title: "유리, 아이러니 그리고 신", author: "앤 카슨", rating: 4.5, count: 96, price: 9800, org: 14000, dc: 30, tag: "", pal: 2 },
  { id: 4, title: "녹스", author: "앤 카슨", rating: 4.7, count: 74, price: 13300, org: 19000, dc: 30, tag: "", pal: 3 },
  { id: 5, title: "홀리", author: "스티븐 킹", rating: 4.5, count: 1203, price: 15800, org: 17800, dc: 10, tag: "new", pal: 4 },
  { id: 6, title: "네버 플린치", author: "스티븐 킹", rating: 4.6, count: 288, price: 16200, org: 18000, dc: 10, tag: "new", pal: 5 },
  { id: 7, title: "미스터 메르세데스", author: "스티븐 킹", rating: 4.4, count: 2045, price: 12600, org: 14000, dc: 10, tag: "", pal: 6 },
  { id: 8, title: "파인더스 키퍼스", author: "스티븐 킹", rating: 4.3, count: 1120, price: 12600, org: 14000, dc: 10, tag: "", pal: 7 },
  { id: 9, title: "사조영웅전 합본", author: "김용", rating: 4.8, count: 3310, price: 24000, org: 48000, dc: 50, tag: "", pal: 8 },
  { id: 10, title: "신조협려 합본", author: "김용", rating: 4.8, count: 2890, price: 24000, org: 48000, dc: 50, tag: "", pal: 9 },
  { id: 11, title: "의천도룡기 합본", author: "김용", rating: 4.7, count: 2510, price: 24000, org: 48000, dc: 50, tag: "", pal: 10 },
  { id: 12, title: "불편한 편의점", author: "김호연", rating: 4.5, count: 15210, price: 9800, org: 14000, dc: 30, tag: "", pal: 11 },
  { id: 13, title: "작별하지 않는다", author: "한강", rating: 4.6, count: 8120, price: 10500, org: 15000, dc: 30, tag: "", pal: 0 },
  { id: 14, title: "소년이 온다", author: "한강", rating: 4.8, count: 21040, price: 9450, org: 13500, dc: 30, tag: "", pal: 1 },
  { id: 15, title: "채식주의자", author: "한강", rating: 4.5, count: 17330, price: 10500, org: 15000, dc: 30, tag: "", pal: 2 },
  { id: 16, title: "급류", author: "정대건", rating: 4.4, count: 1540, price: 10500, org: 15000, dc: 30, tag: "", pal: 3 },
  { id: 17, title: "이중 하나는 거짓말", author: "김애란", rating: 4.5, count: 3320, price: 11200, org: 16000, dc: 30, tag: "", pal: 4 },
  { id: 18, title: "구의 증명", author: "최진영", rating: 4.6, count: 6640, price: 7700, org: 11000, dc: 30, tag: "", pal: 5 },
  { id: 19, title: "뇌는 어떻게 자존감을 만드는가", author: "장동선", rating: 4.5, count: 920, price: 12600, org: 18000, dc: 30, tag: "", pal: 6 },
  { id: 20, title: "도파민네이션", author: "애나 렘키", rating: 4.5, count: 5480, price: 13300, org: 19000, dc: 30, tag: "", pal: 7 },
  { id: 21, title: "열두 발자국", author: "정재승", rating: 4.5, count: 4210, price: 12600, org: 18000, dc: 30, tag: "", pal: 8 },
  { id: 22, title: "운동의 뇌과학", author: "제니퍼 헤이스", rating: 4.3, count: 610, price: 12600, org: 18000, dc: 30, tag: "", pal: 9 },
  { id: 23, title: "방주", author: "유키 하루오", rating: 4.5, count: 4780, price: 11900, org: 17000, dc: 30, tag: "", pal: 10 },
  { id: 24, title: "십각관의 살인", author: "아야츠지 유키토", rating: 4.6, count: 3850, price: 10500, org: 15000, dc: 30, tag: "", pal: 11 },
  { id: 25, title: "이니시에이션 러브", author: "이누이 구루미", rating: 4.3, count: 2210, price: 9800, org: 14000, dc: 30, tag: "", pal: 0 },
  { id: 26, title: "흑뢰성", author: "요네자와 호노부", rating: 4.5, count: 1770, price: 12600, org: 18000, dc: 30, tag: "", pal: 1 },
  { id: 27, title: "SCP 재단: 격리 보고서", author: "SCP 재단", rating: 4.7, count: 980, price: 8400, org: 12000, dc: 30, tag: "only", pal: 2 },
  { id: 28, title: "SCP 재단: 이상 현상 백과", author: "SCP 재단", rating: 4.6, count: 760, price: 8400, org: 12000, dc: 30, tag: "only", pal: 3 },
  { id: 29, title: "세이노의 가르침", author: "세이노", rating: 4.5, count: 18400, price: 6480, org: 7200, dc: 10, tag: "", pal: 4 },
  { id: 30, title: "원씽", author: "게리 켈러", rating: 4.5, count: 9800, price: 11200, org: 16000, dc: 30, tag: "", pal: 5 },
  { id: 31, title: "역행자", author: "자청", rating: 4.2, count: 12300, price: 12600, org: 18000, dc: 30, tag: "", pal: 6 },
  { id: 32, title: "모든 삶은 흐른다", author: "로랑스 드빌레르", rating: 4.5, count: 2100, price: 11200, org: 16000, dc: 30, tag: "", pal: 7 },
  { id: 33, title: "총, 균, 쇠", author: "재레드 다이아몬드", rating: 4.6, count: 7700, price: 19600, org: 28000, dc: 30, tag: "", pal: 8 },
  { id: 34, title: "사피엔스", author: "유발 하라리", rating: 4.6, count: 14100, price: 15400, org: 22000, dc: 30, tag: "", pal: 9 },
  { id: 35, title: "넥서스", author: "유발 하라리", rating: 4.4, count: 2300, price: 19600, org: 28000, dc: 30, tag: "new", pal: 10 },
  { id: 36, title: "나는 메트로폴리탄 미술관의 경비원입니다", author: "패트릭 브링리", rating: 4.6, count: 5200, price: 12600, org: 18000, dc: 30, tag: "", pal: 11 },
  { id: 37, title: "트렌드 코리아 2026", author: "김난도 외", rating: 4.3, count: 1900, price: 13300, org: 19000, dc: 30, tag: "new", pal: 0 },
  { id: 38, title: "돈의 심리학", author: "모건 하우절", rating: 4.5, count: 11200, price: 12600, org: 18000, dc: 30, tag: "", pal: 1 },
  { id: 39, title: "부의 추월차선", author: "엠제이 드마코", rating: 4.4, count: 8800, price: 11900, org: 17000, dc: 30, tag: "", pal: 2 },
  { id: 40, title: "아주 작은 습관의 힘", author: "제임스 클리어", rating: 4.6, count: 16700, price: 11200, org: 16000, dc: 30, tag: "", pal: 3 },
  { id: 41, title: "제물", author: "장현", rating: 4.4, count: 430, price: 9100, org: 13000, dc: 30, tag: "only", pal: 4 },
  { id: 42, title: "밤의 여행자들", author: "윤고은", rating: 4.3, count: 1230, price: 9800, org: 14000, dc: 30, tag: "", pal: 5 },
  { id: 43, title: "파과", author: "구병모", rating: 4.5, count: 5600, price: 10500, org: 15000, dc: 30, tag: "", pal: 6 },
  { id: 44, title: "달러구트 꿈 백화점", author: "이미예", rating: 4.5, count: 19800, price: 9800, org: 13800, dc: 29, tag: "", pal: 7 },
  { id: 45, title: "어서 오세요, 휴남동 서점입니다", author: "황보름", rating: 4.5, count: 9300, price: 10500, org: 15000, dc: 30, tag: "", pal: 8 },
  { id: 46, title: "클루지", author: "개리 마커스", rating: 4.3, count: 2600, price: 11200, org: 16000, dc: 30, tag: "", pal: 9 },
  { id: 47, title: "이처럼 사소한 것들", author: "클레어 키건", rating: 4.6, count: 4400, price: 9100, org: 13000, dc: 30, tag: "", pal: 10 },
  { id: 48, title: "모순", author: "양귀자", rating: 4.7, count: 13300, price: 9100, org: 13000, dc: 30, tag: "", pal: 11 }
];
RIDI.BOOKS.forEach(function (b) { if (b.cover === undefined) b.cover = ""; });

// 섹션 순서/제목은 실제 리디 도서 추천 페이지(views/35)에서 가져온 것입니다.
RIDI.SECTIONS = [
  { type: "ai", title: "고객님의 취향을 저격할 AI 추천", sub: "AI 추천! 구매 이력을 분석했어요", books: [12, 45, 44, 36, 47, 48, 18, 13, 40] },
  { type: "rank", title: "지금 많이 읽고 있는 작품", books: [14, 12, 29, 5, 48, 40, 34, 20, 13, 9] },
  { type: "hook", title: "오늘, 리디의 발견", book: 1, quote: "내 슬픔에 종착점이\n있기를 원치 않는다", meta: "2026 노벨문학상 수상 작가 앤 카슨, 『빨강의 자서전』" },
  { type: "events", title: "", items: [
    { t: "킹의 새로운 최애\n'홀리' 시리즈 신간", p: "스티븐 킹 신작 10% 할인", g: "linear-gradient(135deg,#3b1d2a,#8a2f3f)" },
    { t: "종이책 대비 50%▼\n김용 3부작 합본 오픈", p: "사조영웅전·신조협려·의천도룡기", g: "linear-gradient(135deg,#1f2f4a,#2c6f9e)" }
  ]},
  { type: "row", title: "새로 나온 작품", books: [5, 6, 35, 37, 17, 16, 41, 26, 23] },
  { type: "rank", title: "북스 베스트", books: [29, 14, 12, 40, 34, 48, 38, 20, 5, 47] },
  { type: "row", title: "2026 노벨문학상, 앤 카슨", sub: "시와 산문의 경계를 넘는 작가", books: [1, 2, 3, 4] },
  { type: "row", title: "서재를 풍성하게\n창비 한국소설", books: [14, 13, 15, 16, 17, 18, 43, 42] },
  { type: "row", title: "일상의 질문에\n뇌과학으로 답하다", books: [19, 20, 21, 22, 46] },
  { type: "row", title: "이토록 치밀한\n'본격 미스터리'라니", books: [24, 23, 25, 26, 7, 8] },
  { type: "row", title: "지금, 리디에서만 볼 수 있는 도서", badge: "ONLY", books: [27, 28, 41, 9, 10, 11] },
  { type: "hook", title: "지금, 리디에서만! 선 출간 신작", book: 41, quote: "...... 고객님은,\n제물이 되었습니다.", meta: "리디 선출간 · 장현 『제물』" },
  { type: "row", title: "SCP 재단 세계관\n평점 합산 TOP 10", books: [27, 28] },
  { type: "keywords", title: "키워드로 찾기", items: ["#노벨문학상", "#뇌과학", "#본격미스터리", "#무협합본", "#자기계발", "#한국소설", "#리디ONLY", "#신간", "#에세이", "#경제경영", "#역사", "#SF"] },
  { type: "multi", title: "지금 이 책 어때요?", books: [30, 31, 32, 33, 39, 36, 37, 38, 43, 44, 45, 46] }
];

RIDI.PALETTES = [
  ["#1f3a5f", "#4a7ab8"], ["#6b2d3e", "#c75b7a"], ["#2d5a4a", "#6cb49a"], ["#3f3350", "#8a6fb3"],
  ["#1b1b1f", "#5a5a66"], ["#7a3b16", "#d58a4b"], ["#163a3f", "#3d8f99"], ["#4b1f1f", "#b04d3f"],
  ["#2b3a1d", "#7fa35a"], ["#1d2f55", "#6f86c7"], ["#5a4a12", "#c7a545"], ["#3b1a3a", "#9b4f99"]
];

RIDI.USER_SEED = {
  id: "ridi_demo",
  password: "Demo1234!",
  name: "김리디",
  email: "ridi_demo@example.com",
  phone: "010-1234-5678",
  joined: "2021.03.14",
  cash: 12500,
  point: 3200,
  coupons: 4,
  shelf: [14, 12, 40, 5, 29]
};
