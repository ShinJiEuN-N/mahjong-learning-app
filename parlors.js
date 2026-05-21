/** 지역 필터 (id는 mahjongParlors[].region 과 맞춥니다) */
const parlorRegions = [
  { id: "all", name: "전국" },
  { id: "seoul", name: "서울" },
  { id: "gyeonggi", name: "경기" },
  { id: "incheon", name: "인천" },
  { id: "busan", name: "부산" },
  { id: "daegu", name: "대구" },
  { id: "daejeon", name: "대전" },
  { id: "gwangju", name: "광주" },
  { id: "other", name: "기타" },
];

const SOURCE_NOTE =
  "출처: 나무위키 「마장(마작)/대한민국」(2025년 기준). 폐업·룰 변경이 있을 수 있으니 방문 전에 확인하세요.";

/**
 * 전국 마장·마작 가능 보드카페
 * region: parlorRegions 의 id (all 제외)
 * source: "namu-dedicated" | "namu-cafe" (전용 마장 vs 보드카페 겸업)
 */
const mahjongParlors = [
  {
    id: "seoul-isu",
    region: "seoul",
    name: "이수보드게임카페 & 이수마장",
    district: "서울 동작구",
    address: "서울특별시 동작구 동작대로27가길 6-4 3층 (이수역 12·13번 출구)",
    hours: "12:00–23:00",
    phone: "",
    url: "",
    tags: ["리치마작", "공탁", "전탁", "KML"],
    note: `2003년부터 운영된 1세대 마장. JP-EX·렉스·점수표시탁 다수. 마블리(일본룰)·마그마(국제룰) 동호회. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "seoul-genima",
    region: "seoul",
    name: "마작카페 제니랜드 (신림마장)",
    district: "서울 관악구",
    address: "서울특별시 관악구 신림동길 20 지하1층",
    hours: "평일 12:00–23:00 / 공휴일 11:00–23:00",
    phone: "",
    url: "https://cafe.naver.com/genima",
    tags: ["리치마작", "공탁", "대탁", "렉스탁"],
    note: `점수표시·렉스탁 보유. 자체 점수 기록. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "seoul-mahjongcafe-gwanak",
    region: "seoul",
    name: "마작카페 (관악)",
    district: "서울 관악구",
    address: "서울특별시 관악구 관악로 146 3층",
    hours: "13:00–23:00",
    phone: "",
    url: "",
    tags: ["대탁 전용", "3마 가능", "예약"],
    note: `전석 대탁·네이버 예약. 오픈톡으로 인원 모집. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "seoul-dialogue",
    region: "seoul",
    name: "디아날로그 보드게임&마작",
    district: "서울 영등포구",
    address: "서울 영등포구 영신로40길 5 성진빌딩 지하1층",
    hours: "15:00–23:00",
    phone: "",
    url: "",
    tags: ["리치마작", "점수표시탁", "무제한 요금"],
    note: `평일·주말 무제한권 운영. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "seoul-gg",
    region: "seoul",
    name: "GG보드게임카페 (까치산마장)",
    district: "서울 강서구",
    address: "서울특별시 강서구 강서로 24 4층",
    hours: "15:00–02:00",
    phone: "",
    url: "",
    tags: ["대탁", "오픈톡 예약", "KML"],
    note: `오픈톡으로 시간 약속 후 대탁. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "seoul-minimi",
    region: "seoul",
    name: "미니미보드게임룸카페 (성신마장)",
    district: "서울 성북구",
    address: "서울특별시 성북구 동소문로22길 43 4·5층 (성신여대입구역)",
    hours: "평일 13:00–23:00 / 주말 12:00–23:00",
    phone: "",
    url: "",
    tags: ["리치마작", "공탁", "대탁", "KML"],
    note: `REXX-III·JP-EX COLOR. 새벽 공탁·대탁 요금 별도. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "seoul-soso",
    region: "seoul",
    name: "마작카페 소소마장",
    district: "서울 노원구",
    address: "서울특별시 노원구 석계로7길 18 3층 (석계역 인근)",
    hours: "24시간",
    phone: "",
    url: "https://cafe.naver.com/sosomahjong",
    tags: ["공탁", "대탁", "초보 환영", "KML"],
    note: `2023년 오픈. 원데이 클래스·오픈톡 모집. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "seoul-sinchon-gallery",
    region: "seoul",
    name: "신촌 마작 갤러리",
    district: "서울 서대문구",
    address: "서울특별시 서대문구 명물길 70 지하1층",
    hours: "13:00–23:00",
    phone: "",
    url: "",
    tags: ["대탁", "예약"],
    note: `현재 대탁 위주. 오픈톡 구인. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "seoul-jongno-flex",
    region: "seoul",
    name: "종로 플렉스보드게임카페",
    district: "서울 종로구",
    address: "서울특별시 종로구 종로3가 13-4 3층 (종로3가역 1번 출구)",
    hours: "평일·주말 13:00–23:00",
    phone: "",
    url: "https://open.kakao.com/o/gf8YRslg",
    tags: ["공탁", "대탁", "렉스3", "M리그"],
    note: `렉스3 5대. 공탁은 M리그 룰. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "seoul-juki",
    region: "seoul",
    name: "주키의 아지트",
    district: "서울 영등포구",
    address: "서울 영등포구 영등포동 618-215 4층",
    hours: "종일·밤샘 이용 (오픈톡 문의)",
    phone: "",
    url: "",
    tags: ["아지트", "점수표시탁", "KML"],
    note: `점수표시 전탁 2대. 종일 1만 원·밤샘 별도. 오픈톡 「주키의 아지트」. ${SOURCE_NOTE}`,
    source: "namu-cafe",
  },
  {
    id: "seoul-cottage",
    region: "seoul",
    name: "코티지가든",
    district: "서울 마포구",
    address: "서울 마포구 양화로6길 57 지하1층",
    hours: "모임 일정에 따름 (사전 연락)",
    phone: "",
    url: "http://cottagegarden.kr/",
    tags: ["보드카페", "마백룰", "전탁 2대"],
    note: `크라임씬 카페 겸업. 마마모 모임·소모임 가입 후 이용. ${SOURCE_NOTE}`,
    source: "namu-cafe",
  },
  {
    id: "seoul-boardcave",
    region: "seoul",
    name: "보드케이브",
    district: "서울 관악구",
    address: "서울 관악구 신림동 (난곡사거리 부근)",
    hours: "보드카페 영업시간 (방문 전 확인)",
    phone: "",
    url: "https://boardcave.modoo.at/",
    tags: ["마백룰", "전탁 2대"],
    note: `리치+국표 일부 역. ${SOURCE_NOTE}`,
    source: "namu-cafe",
  },
  {
    id: "gyeonggi-yeokgok",
    region: "gyeonggi",
    name: "마작스쿨 역곡마장",
    district: "경기 부천시",
    address: "경기도 부천시 경인로 505(역곡하이뷰) 6층 601호",
    hours: "평일 14:00–23:00 / 주말 13:00–23:00",
    phone: "",
    url: "https://cafe.naver.com/ygmajang",
    tags: ["리치마작", "공탁", "초보 교실", "KML"],
    note: `역곡역 도보 1분. JP-EX 8대. 주차 5시간 무료. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "gyeonggi-hong",
    region: "gyeonggi",
    name: "홍 보드게임 카페 (분당마장)",
    district: "경기 성남시 분당구",
    address: "경기도 성남시 분당구 백현로101번길 16 대덕프라자 4층 408호",
    hours: "24시간 (직원 12:00–23:00)",
    phone: "",
    url: "https://naver.me/F0cZM3xu",
    tags: ["공탁", "대탁", "렉스3", "초보 교육"],
    note: `수내역 로데오거리. REXX3·JP-COLOR. 격주 일요일 왕초보·오프뉴비 교육. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "gyeonggi-ron",
    region: "gyeonggi",
    name: "마작카페 론",
    district: "경기 하남시",
    address: "경기도 하남시 망월동 1111 신성프라자1 304호",
    hours: "10:00–23:00 (밤샘 인원 시 연장 가능)",
    phone: "",
    url: "",
    tags: ["공탁", "대탁", "2024 오픈"],
    note: `2024년 10월 오픈. JP-EX·렉스3. 오픈톡 모집. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "gyeonggi-masulsa",
    region: "gyeonggi",
    name: "마술사",
    district: "경기 부천시",
    address: "경기도 부천시 부일로 416 지하1층 (부천역 인근)",
    hours: "오픈톡 일정 (평일·주말 밤샘 다수)",
    phone: "",
    url: "",
    tags: ["아지트", "음주 마작", "성인"],
    note: `전탁 3대(닌자탁·JP-EX·일반). 월·일 회비제. 오픈톡 「마술사」. ${SOURCE_NOTE}`,
    source: "namu-cafe",
  },
  {
    id: "gyeonggi-junscafe",
    region: "gyeonggi",
    name: "준스카페",
    district: "경기 포천시",
    address: "경기 포천시 소흘읍 송우로 73 1층 101호",
    hours: "오픈톡 일정",
    phone: "",
    url: "https://open.kakao.com/o/g8kURm7b",
    tags: ["28mm 전탁", "보드게임 요금"],
    note: `중국식 전탁 1대. 단톡에서 일정 후 참여. ${SOURCE_NOTE}`,
    source: "namu-cafe",
  },
  {
    id: "incheon-witchesbrew",
    region: "incheon",
    name: "위치스브루 보드게임카페",
    district: "인천 계양구",
    address: "인천광역시 계양구 계양대로 166 정우빌딩 2층 (경인교대역 인근)",
    hours: "보드카페 영업시간 (마작은 예약 필수)",
    phone: "",
    url: "",
    tags: ["전탁 1대", "예약 필수"],
    note: `전탁 1대·보드게임 요금으로 이용. ${SOURCE_NOTE}`,
    source: "namu-cafe",
  },
  {
    id: "busan-darak",
    region: "busan",
    name: "다락",
    district: "부산 금정구",
    address: "부산광역시 금정구 금정로60번길 6 4층 (부산대역 도보 5분)",
    hours: "24시간 (주 이용 14:00–24:00 전후, 밤샘은 사전 문의)",
    phone: "",
    url: "https://cafe.naver.com/daracmajang",
    tags: ["KML", "손탁·전탁", "연중무휴"],
    note: `부산대 인근. KML 룰·오픈리치 허용 등. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "busan-fortune",
    region: "busan",
    name: "포춘팩토리",
    district: "부산 남구",
    address: "부산광역시 남구 대연동 68-10 지하1층 (경성대·부경대역 도보 3분)",
    hours: "평일 13:00–24:00 / 주말·공휴일 12:00–24:00",
    phone: "",
    url: "https://open.kakao.com/o/gsBeKQSc",
    tags: ["공탁", "대탁", "KML", "리그"],
    note: `지방권 활성 마장. 렉스·JP 시리즈 다수. 스케줄 오픈톡. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "daejeon-bgm",
    region: "daejeon",
    name: "BGM아지트",
    district: "대전 서구",
    address: "대전광역시 서구 문정로62 프라임빌딩 3층 (탄방역 4번 출구)",
    hours: "평일·주말 13:00–24:00 (공탁은 금·토 연장)",
    phone: "",
    url: "https://bgmagit.co.kr/",
    tags: ["일무권", "렉스3", "초보 환영", "KML"],
    note: `일 1만 원 무제한·월패스 12만 원. 2025년 홈페이지 오픈. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "daejeon-exsol",
    region: "daejeon",
    name: "엑솔마장",
    district: "대전 유성구",
    address: "대전광역시 유성구 온천로 59 동아벤처타워 612호 (유성온천역)",
    hours: "24시간 (대국 사전예약·투표 일정)",
    phone: "",
    url: "https://cafe.naver.com/mahjongdj",
    tags: ["리치마작", "약식배패", "국표 가능", "KML"],
    note: `2025년 확장 이전. 공탁 투표·대탁 문의. 카드·간편결제. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "daegu-bookbird",
    region: "daegu",
    name: "소소한 북새통 (마작하작)",
    district: "대구 남구",
    address: "대구광역시 남구 명덕로68길 22 202호 (대봉교역 인근)",
    hours: "평일 11:00–23:00 / 주말 10:00–23:00",
    phone: "",
    url: "https://blog.naver.com/comgea",
    tags: ["동호회 마장", "점수표시탁", "KML"],
    note: `대구리치마작모임 운영. AMOS JP-C 3대. 오픈톡 방문 권장. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "daegu-bart",
    region: "daegu",
    name: "바트마작",
    district: "대구 중구",
    address: "대구 중구 동성로 73 3층",
    hours: "평일 13:00–23:00 / 주말 12:00–23:00",
    phone: "",
    url: "",
    tags: ["2024 오픈", "홀덤·보드 겸업", "오픈톡"],
    note: `2025년 10월 동성로 이전 재개장. 대기 인원 오픈톡 공지. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "other-cheongan-tree",
    region: "other",
    name: "천안 트리하우스",
    district: "충남 천안시",
    address: "충청남도 천안시 서북구 쌍용17길 60-6 1층 (쌍용역)",
    hours: "24시간 (무인·카드 개방)",
    phone: "",
    url: "",
    tags: ["무인", "일 5,000원", "렉스3"],
    note: `마작·보드게임 일일 5,000원. 오픈톡에서 인원 확인 후 방문. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "other-cheongju",
    region: "other",
    name: "청주매일마작",
    district: "충북 청주시",
    address: "충청북도 청주시 서원구 사창동 152-3 지하1층 (충북대 정문 근처)",
    hours: "24시간",
    phone: "",
    url: "",
    tags: ["2025 오픈", "오픈리치", "로컬룰"],
    note: `2025년 10월 오픈. 일 8,000원 무제한. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "other-changwon",
    region: "other",
    name: "창원 다같이",
    district: "경남 창원시",
    address: "경상남도 창원시 봉곡로123번길 16 지하",
    hours: "오픈톡 일정",
    phone: "",
    url: "https://open.kakao.com/o/gFt8D54e",
    tags: ["동호회", "렉스3", "보드게임"],
    note: `보드게임·마작 겸업 동호회 공간. 입문 설명 지원. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
  {
    id: "other-jeonju",
    region: "other",
    name: "전주 마인 보드박스",
    district: "전북 전주시",
    address: "전라북도 전주시 덕진구 권삼득로 307-1 (전북대 구정문 앞)",
    hours: "화–금 14:00–03:00 / 토·공휴일 13:00–03:00 / 일 13:00–24:00 (월 휴무)",
    phone: "",
    url: "",
    tags: ["오픈톡 모집", "전탁 5대"],
    note: `「전주 리치마작」 오픈톡 검색. 식사 메뉴·공영주차장 이용. ${SOURCE_NOTE}`,
    source: "namu-dedicated",
  },
];
