const views = {
  dashboard: "오늘 학습",
  rules: "기본 규칙",
  tiles: "마작 패 소개",
  yaku: "심화 규칙",
  quiz: "퀴즈",
  score: "점수 계산기",
  play: "게임하기",
};

let activeParlorRegion = "all";

/** 상단 로고용 패 1장 (8삭) */
const appBarLogoTile = "s8";

const seatTerms = [
  {
    name: "친",
    reading: "오야 / dealer",
    short: "이번 국의 기준이 되는 사람",
    description:
      "친은 해당 국에서 점수가 더 크게 오가고, 친이 화료하거나 텐파이 유국하면 같은 친으로 연장될 수 있습니다.",
  },
  {
    name: "자",
    reading: "코 / non-dealer",
    short: "친이 아닌 나머지 세 사람",
    description: "친을 제외한 세 사람을 자라고 부릅니다. 점수 계산에서 친과 자는 다르게 적용됩니다.",
  },
  {
    name: "상가",
    reading: "카미차",
    short: "나보다 먼저 도는 사람",
    description: "보통 내 왼쪽에 있습니다. 치는 상가가 버린 패로만 슌쯔를 만들 수 있습니다.",
  },
  {
    name: "하가",
    reading: "시모차",
    short: "나보다 나중에 도는 사람",
    description: "보통 내 오른쪽에 있습니다. 내가 패를 버린 뒤 바로 다음 차례입니다.",
  },
  {
    name: "대면",
    reading: "토이멘",
    short: "내 맞은편 사람",
    description: "나와 마주 보고 있는 사람입니다. 상가나 하가와 달리 바로 앞뒤 차례는 아닙니다.",
  },
];

const ruleSteps = [
  {
    title: "마작의 목표",
    summary: "패 14장으로 완성형을 만들고 화료합니다.",
    detail:
      "대부분의 손패는 몸통 4개와 머리 1개로 완성됩니다. 단, 리치마작에서는 완성형만으로는 부족하고 최소 1개의 역이 필요합니다.",
    tiles: ["m2", "m3", "m4", "p5", "p6", "p7", "s6", "s7", "s8", "z5", "z5"],
    chips: ["4몸통 1머리", "역 필요", "화료"],
  },
  {
    title: "패를 뽑고 버리기",
    summary: "내 차례에는 하나를 뽑고 하나를 버립니다.",
    detail:
      "차례가 오면 산에서 패를 하나 가져오고, 손패에서 필요 없는 패 하나를 버립니다. 이 과정을 반복하며 완성형에 가까워집니다.",
    tiles: ["m2", "m3", "m4"],
    chips: ["쯔모", "타패", "차례"],
  },
  {
    title: "몸통과 머리",
    summary: "슌쯔, 커쯔, 머리를 구분합니다.",
    detail:
      "슌쯔는 수패만 가능하며 1-2-3처럼 이어진 3장이어야 합니다(9 다음 1로 넘어가는 형태는 없음). 커쯔는 같은 패 3장, 머리는 같은 패 2장입니다.",
    tiles: ["m2", "m3", "m4", "p7", "p7", "p7", "z5", "z5"],
    chips: ["슌쯔", "커쯔", "머리", "수패만"],
  },
  {
    title: "남의 패를 가져오기",
    summary: "치, 퐁, 깡, 론 — 동시에 가능하면 우선순위가 있습니다.",
    detail:
      "치는 상가 버림패로만 슌쯔를 만듭니다. 퐁·깡은 누구 패든 쓸 수 있고, 론은 버림패로 화료합니다. 동시에 가능하면 론 > 퐁·깡 > 치 순입니다.",
    tiles: ["p3", "p4", "p5", "z7", "z7", "z7"],
    chips: ["론 우선", "치=상가만", "퐁·깡"],
  },
  {
    title: "후로",
    summary: "치·퐁·깡으로 연 몸통은 열린(후로) 상태입니다.",
    detail:
      "후로를 하면 멘젠이 깨집니다. 리치·핑후·이페코처럼 멘젠 전용 역은 불가능해지고, 또이또이처럼 후로에서도 되는 역은 판수가 줄어드는 경우가 많습니다.",
    tiles: ["m3", "m3", "m3", "p4", "p5", "p6", "s7", "s8", "s9"],
    chips: ["후로", "멘젠 깨짐", "역 감소"],
  },
  {
    title: "론과 쯔모",
    summary: "남이 버린 패로 나면 론, 내가 뽑아서 나면 쯔모입니다.",
    detail:
      "론은 남의 버림패로 완성하는 것이고, 쯔모는 내가 직접 뽑은 패로 완성하는 것입니다. 단, 역이 없으면 완성형이어도 화료할 수 없습니다.",
    tiles: ["s6", "s7", "s8", "z7", "z7", "z7"],
    chips: ["론", "쯔모", "화료"],
  },
  {
    title: "멘젠",
    summary: "치, 퐁, 열린 깡을 하지 않은 상태입니다.",
    detail:
      "남의 패로 연 몸통(밍커)이 없어야 합니다. 안커·안깡만 있으면 멘젠이 유지됩니다. 리치, 핑후, 이페코, 멘젠쯔모는 멘젠이 전제입니다.",
    tiles: ["m3", "m4", "m5", "p6", "p7", "p8", "s2", "s3", "s4"],
    chips: ["멘젠", "안커 OK", "밍커 NO"],
  },
  {
    title: "특수 완성형",
    summary: "4몸통 1머리가 아닌 예외 형태도 있습니다.",
    detail:
      "치또이츠는 서로 다른 또이츠 7쌍, 국사무쌍은 1·9·자패 13종 + 1쌍입니다. 평소 형태와 다르지만 역이 있으면 화료할 수 있습니다.",
    tiles: ["m1", "m1", "p4", "p4", "s7", "s7", "z1", "z1", "z5", "z5", "z7", "z7"],
    chips: ["치또이츠", "국사무쌍", "예외"],
  },
];

const basicTerms = [
  {
    name: "요구패",
    description: "1, 9의 수패와 자패를 말합니다.",
  },
  {
    name: "중장패",
    description: "2부터 8까지의 수패를 말합니다.",
  },
  {
    name: "역",
    description: "화료하기 위해 필요한 조건입니다. 최소 1개가 있어야 화료할 수 있습니다.",
  },
  {
    name: "도라",
    description: "가지고 있으면 점수가 올라가는 보너스 패입니다. 단, 도라만으로는 화료할 수 없습니다.",
  },
  {
    name: "본장",
    description:
      "친이 텐파이 유국·화료하면 이어지고(+1), 친 노텐 유국도 +1. 자가 화료하면 0본장부터. 1본장마다 화료 점수 +300점입니다.",
  },
  {
    name: "호출 우선순위",
    description: "동시에 가능할 때 론 > 퐁·깡 > 치 순으로 처리합니다.",
  },
  {
    name: "안커 · 밍커",
    description: "안커는 자신의 패만으로 만든 커쯔, 밍커는 남의 버림패를 포함한 커쯔(퐁)입니다.",
  },
  {
    name: "일발",
    description: "리치 후 치·퐁·깡 없이 화료하면 +1판. 누군가 호출하면 성립하지 않습니다.",
  },
  {
    name: "동풍전",
    description: "동·남·서·북 순으로 친이 바뀌는 4국 묶음입니다. 온라인에서는 보통 1전(4국)으로 끝냅니다.",
  },
  {
    name: "국",
    description: "한 명이 친이 되어 네 사람이 한 바퀴 도는 단위입니다. 동국·남국·서국·북국이 있습니다.",
  },
  {
    name: "텐파이",
    description: "패 1장만 더 오면 완성형이 되는 상태입니다. 유국·노텐 벌점과 리치 선언의 기준이 됩니다.",
  },
  {
    name: "유국",
    description: "아무도 화료하지 못하고 판이 끝나는 것입니다. 텐파이 여부에 따라 점수가 오갑니다.",
  },
  {
    name: "후로",
    description: "치·퐁·열린 깡으로 공개된 몸통입니다. 멘젠이 깨지며 일부 역은 불가·감판됩니다.",
  },
  {
    name: "노텐",
    description: "유국 때 텐파이가 아니면 벌점을 냅니다. 리치·멘젠 텐파이 상태는 노텐 벌점 대상이 아닙니다.",
  },
  {
    name: "표시도라",
    description: "도라 표시패 다음 패가 도라입니다. 화료 시 손패·후로에 있는 도라 1장마다 +1판(도라)이 붙습니다.",
  },
  {
    name: "里도라",
    description: "리치 막대 아래를 뒤집어 추가 도라를 확인합니다. 표시도라와 합쳐 점수가 올라갑니다.",
  },
  {
    name: "쿠이탕",
    description: "탕야오에 ‘먹은 패(치·퐁) 허용’ 규칙입니다. 플랫폼·대회마다 다를 수 있어 확인이 필요합니다.",
  },
];

const ruleTipCards = [
  {
    eyebrow: "리치",
    title: "멘젠 텐파이 선언",
    body: "멘젠 텐파이에서 1,000점을 공탁하고 선언합니다. 선언 버림패는 가로로 둡니다. 리치 자체가 1판 역이며, 里도라를 공개할 수 있습니다.",
    chips: ["1,000점 공탁", "里도라", "가로 버림"],
  },
  {
    eyebrow: "리치 조건",
    title: "선언 · 제한",
    body: "남은 쯔모패가 4장 이상일 때만 선언할 수 있습니다. 보유 점수가 1,000점 미만이면 불가하며, 선언 후에는 손패를 바꿀 수 없습니다. 4명 모두 리치하면 유국됩니다.",
    chips: ["남은 패 4장+", "1,000점 이상", "4리치 유국"],
  },
  {
    eyebrow: "노텐",
    title: "유국 때 텐파이 벌점",
    body: "유국 시 텐파이가 아니면 노텐 벌점을 냅니다. 리치·멘젠 텐파이는 노텐 벌점을 내지 않습니다.",
    chips: ["유국", "텐파이", "벌점"],
  },
];

const doraGuide = {
  eyebrow: "도라",
  title: "표시도라 읽는 법",
  body: "도라 표시패 바로 다음 패가 도라입니다. 화료 시 손패·후로에 있는 도라 1장마다 +1판(도라)이 붙지만, 도라만으로는 화료할 수 없습니다.",
  examples: [
    { indicator: "3통", dora: "4통" },
    { indicator: "9삭", dora: "1삭" },
    { indicator: "서", dora: "북" },
    { indicator: "백", dora: "발" },
  ],
};

const ruleCoreNote = {
  eyebrow: "입문 핵심",
  title: "완성만으로는 부족합니다",
  body: "리치마작에서는 손패 모양을 완성해도 최소 1개의 역이 있어야 화료할 수 있습니다. 도라는 점수를 올려주는 보너스지만, 도라만으로는 역이 되지 않습니다.",
};

/** 기본 규칙 단원 목록 (버튼 → 상세) */
const ruleUnits = [
  {
    id: "seats",
    step: "1단원",
    title: "작탁 자리",
    short: "상가·하가·대면·친·자",
    intro: "나보다 먼저 도는 사람이 상가(보통 왼쪽), 나중에 도는 사람이 하가(보통 오른쪽), 맞은편이 대면입니다. 장풍은 반시계(동→남→서→북)로 바뀝니다.",
  },
  {
    id: "flow",
    step: "2단원",
    title: "한 판의 흐름",
    short: "뽑기·몸통·화료까지",
    intro: "패를 뽑고 버리며 완성형을 만들고, 치·퐁·론·쯔모로 마무리합니다.",
  },
  {
    id: "riichi",
    step: "3단원",
    title: "리치 · 노텐",
    short: "선언 조건과 벌점",
    intro: "멘젠 텐파이에서 리치를 걸고, 유국 시 텐파이 여부에 따라 점수가 오갑니다.",
  },
  {
    id: "dora",
    step: "4단원",
    title: "도라",
    short: "표시도라 · 里도라",
    intro: doraGuide.body,
  },
  {
    id: "terms",
    step: "5단원",
    title: "자주 나오는 용어",
    short: "패 분류·국·본장",
    intro: "요구패, 중장패, 텐파이, 동풍전 등 게임 중 자주 나오는 말을 정리했습니다.",
  },
  {
    id: "core",
    step: "핵심",
    title: "역과 화료",
    short: "완성만으로는 부족",
    intro: ruleCoreNote.body,
  },
];

let rulesUnitOpen = false;
let activeRuleUnitIndex = 0;
let yakuUnitOpen = false;
let activeYakuUnitIndex = 0;

const waitGuide = {
  eyebrow: "핑후 전에",
  title: "대기(待ち)란?",
  body: "텐파이일 때 ‘어떤 패가 오면 화료하는지’를 말합니다. 핑후(평화)는 아래 네 가지를 모두 만족해야 합니다.",
  items: [
    { name: "① 멘젠", short: "치·퐁·열린 깡 없이 지은 상태." },
    { name: "② 슌쯔만", short: "모든 몸통이 연속 숫자 3장(커쯔 없음)." },
    { name: "③ 양면 대기", short: "들어오는 패가 연속 숫자의 앞·뒤 양쪽." },
    { name: "④ 머리", short: "머리가 역패(자풍·장풍·삼원)가 아님." },
    { name: "단면 대기", short: "한 패만 기다리면 핑후가 되기 어렵습니다." },
  ],
};

const scoreGuides = [
  {
    eyebrow: "친 · 자",
    title: "같은 점수라도 받는 사람이 다릅니다",
    body: "기본점 = 부 × 2^(판+2) (최대 2000). 친 론은 ×6, 친 쯔모은 자 3명에게 ×2씩, 자 론은 ×4, 자 쯔모은 친 ×2·자 ×1씩 받습니다.",
    chips: ["친 론 ×6", "자 론 ×4", "쯔모 분담"],
  },
  {
    eyebrow: "본장 · 만관",
    title: "본장과 고정 점수",
    body: "1본장마다 화료 시 +300점(쯔모는 각 자가 +100). 기본점이 2,000점에 닿으면 만관(8,000점)부터 계산합니다.",
    chips: ["본장 +300", "만관 8000", "하네만 12000"],
  },
  {
    eyebrow: "도라",
    title: "표시도라와 里도라",
    body: "도라는 보너스 판이지 역이 아닙니다. 표시도라는 산 표시 기준, 里도라는 리치 후 막대에서 추가로 확인합니다.",
    chips: ["역 아님", "표시도라", "里도라", "적도라 +1판"],
  },
];

/** 날짜별로 고정되는 오늘의 14장 + 퀴즈 (인덱스 = 날짜 해시 % 길이) */
const DAILY_HAND_SETS = [
  {
    tiles: ["m2", "m3", "m4", "p3", "p4", "p5", "s6", "s7", "s8", "p2", "p2", "m6", "m7", "m8"],
    question: "이 14장에서 가장 먼저 떠오르는 역은?",
    answers: ["탕야오", "혼일색", "역패", "치또이츠"],
    correct: 0,
    explanation: "2~8 수패만 있어 탕야오 후보입니다.",
  },
  {
    tiles: ["z7", "z7", "z7", "p2", "p3", "p4", "m7", "m8", "m9", "s5", "s5", "m2", "m3", "m4"],
    question: "눈에 띄는 역은?",
    answers: ["역패", "탕야오", "리치", "청일색"],
    correct: 0,
    explanation: "중 3장이 커쯔 형태라 역패 1판입니다.",
  },
  {
    tiles: ["m1", "m1", "p4", "p4", "s7", "s7", "z1", "z1", "z5", "z5", "z7", "z7", "p9", "p9"],
    question: "이 손의 완성 형태는?",
    answers: ["치또이츠(짝 7쌍)", "4몸통 1머리", "국사무쌍", "또이또이"],
    correct: 0,
    explanation: "서로 다른 또이츠 7쌍이면 치또이츠 특수 형태입니다.",
  },
  {
    tiles: ["m3", "m4", "m5", "p6", "p7", "p8", "s2", "s3", "s4", "z2", "z2", "m2", "m3", "m4"],
    question: "멘젠 텐파이라면 선언할 수 있는 것은?",
    answers: ["리치", "역패", "또이또이", "혼노두"],
    correct: 0,
    explanation: "울지 않은 텐파이에서 리치를 선언할 수 있습니다.",
  },
  {
    tiles: ["m2", "m3", "m4", "m2", "m3", "m4", "p6", "p7", "p8", "s5", "s5", "p2", "p3", "p4"],
    question: "같은 슌쯔가 2개 보일 때 역 후보는?",
    answers: ["이페코", "삼색동순", "탕야오", "역패"],
    correct: 0,
    explanation: "같은 수패의 같은 슌쯔 2개는 이페코 후보입니다.",
  },
  {
    tiles: ["m3", "m4", "m5", "p3", "p4", "p5", "s3", "s4", "s5", "z5", "z5", "m7", "m8", "m9"],
    question: "만·통·삭에 같은 숫자 슌쯔가 있으면?",
    answers: ["삼색동순", "일기통관", "핑후", "치또이츠"],
    correct: 0,
    explanation: "세 색에 3-4-5가 있으면 삼색동순 후보입니다.",
  },
  {
    tiles: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "p5", "p5", "p6", "p7", "p8"],
    question: "한 종류 수패로 1~9가 이어지면?",
    answers: ["일기통관", "탕야오", "혼일색", "이페코"],
    correct: 0,
    explanation: "같은 수패로 1-2-3, 4-5-6, 7-8-9가 있으면 일기통관입니다.",
  },
  {
    tiles: ["m1", "m2", "m3", "m4", "m5", "m6", "z1", "z1", "z1", "z5", "z5", "m8", "m9", "p1"],
    question: "한 종류 수패 + 자패만 쓰였을 때 역은?",
    answers: ["혼일색", "청일색", "탕야오", "역패"],
    correct: 0,
    explanation: "만수패와 자패만 있으면 혼일색 후보입니다.",
  },
  {
    tiles: ["m3", "m3", "m3", "p7", "p7", "p7", "s2", "s2", "s2", "z6", "z6", "p4", "p5", "p6"],
    question: "커쯔가 많이 보이면 의심할 역은?",
    answers: ["또이또이", "핑후", "이페코", "멘젠쯔모"],
    correct: 0,
    explanation: "커쯔 4개 + 머리 형태면 또이또이 후보입니다.",
  },
  {
    tiles: ["m1", "m9", "p1", "p9", "s1", "s9", "z1", "z2", "z3", "z4", "z5", "z6", "z7", "m5"],
    question: "1·9·자패가 매우 많을 때 노릴 수 있는 특수 역은?",
    answers: ["국사무쌍", "탕야오", "삼색동순", "핑후"],
    correct: 0,
    explanation: "13종 + 1쌍 형태면 국사무쌍(역만) 후보입니다.",
  },
  {
    tiles: ["p1", "p2", "p3", "p3", "p4", "p5", "p5", "p6", "p7", "p8", "p8", "p9", "z5", "z5"],
    question: "통수패만으로 1~9가 이어지면?",
    answers: ["일기통관", "혼일색", "청일색", "역패"],
    correct: 0,
    explanation: "한 종류 수패로 1부터 9 슌쯔가 이어지면 일기통관입니다.",
  },
  {
    tiles: ["s2", "s3", "s4", "s5", "s5r", "s6", "s7", "s8", "m4", "m5", "m6", "p3", "p4", "p5"],
    question: "빨간 5(적도라)가 있으면 화료 시?",
    answers: ["보너스 1판", "역 1판", "화료 조건 충족", "멘젠 선언"],
    correct: 0,
    explanation: "적도라는 역이 아니라 보너스 1판입니다.",
  },
  {
    tiles: ["z1", "z1", "z1", "m4", "m5", "m6", "p2", "p3", "p4", "s7", "s8", "s9", "z5", "z5"],
    question: "동 3장이 보이면?",
    answers: ["역패(조건부)", "탕야오", "리치", "치또이츠"],
    correct: 0,
    explanation: "자신의 바람·장풍이면 역패, 아니면 상황에 따라 다릅니다. 입문에서는 ‘바람·삼원 커쯔 = 역패 후보’로 기억하세요.",
  },
  {
    tiles: ["m2", "m3", "m4", "p6", "p7", "p8", "s2", "s3", "s4", "z2", "z2", "z3", "z3", "z4"],
    question: "요구패(1·9·자패) 비중은?",
    answers: ["적음", "보통", "많음", "전부 요구패"],
    correct: 0,
    explanation: "2~8 수패가 대부분이라 요구패는 적습니다.",
  },
  {
    tiles: ["m1", "m1", "m9", "m9", "p1", "p1", "s9", "s9", "z1", "z1", "z7", "z7", "p9", "p9"],
    question: "1·9·자패만 많을 때 역 후보는?",
    answers: ["혼노두", "탕야오", "핑후", "삼색동순"],
    correct: 0,
    explanation: "끝패와 자패 위주면 혼노두 후보입니다.",
  },
  {
    tiles: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p2", "p3", "p4", "z6", "z6"],
    question: "한 종류 수패만 쓰였을 때 고타점 역은?",
    answers: ["청일색", "혼일색", "탕야오", "역패"],
    correct: 0,
    explanation: "자패 없이 한 색만이면 청일색 후보입니다.",
  },
  {
    tiles: ["m4", "m5", "m6", "p4", "p5", "p6", "s4", "s5", "s6", "z7", "z7", "m2", "m3", "m8"],
    question: "중장패(2~8)만 보면?",
    answers: ["탕야오 쪽", "혼노두 쪽", "역패 쪽", "국사무쌍 쪽"],
    correct: 0,
    explanation: "1·9·자패 없이 중장패만 있으면 탕야오 쪽입니다.",
  },
  {
    tiles: ["m5", "m6", "m7", "p5", "p6", "p7", "s5", "s6", "s7", "z5", "z5", "z6", "z6", "z7"],
    question: "삼원패(백발중)가 많을 때는?",
    answers: ["역패·고타점을 봄", "탕야오만 봄", "도라만 봄", "치만 가능"],
    correct: 0,
    explanation: "백·발·중 커쯔는 역패입니다. 손 전체 맥락도 함께 봅니다.",
  },
  {
    tiles: ["m2", "m3", "m4", "p2", "p3", "p4", "s2", "s3", "s4", "m6", "m7", "m8", "p6", "p7"],
    question: "모든 몸통이 슌쯔처럼 보이면 멘젠 시 역은?",
    answers: ["핑후 후보", "또이또이", "역패", "치또이츠"],
    correct: 0,
    explanation: "슌쯔만 있고 역패 머리·양면 대기면 핑후 후보입니다.",
  },
  {
    tiles: ["z2", "z2", "z3", "z3", "z4", "z4", "m3", "m4", "m5", "p7", "p8", "p9", "s1", "s2"],
    question: "자패는 슌쯔를 만들 수 있나요?",
    answers: ["아니요", "예, 항상 가능", "상가만 가능", "도라만 가능"],
    correct: 0,
    explanation: "자패(풍·삼원)는 숫자가 없어 슌쯔를 만들 수 없습니다.",
  },
  {
    tiles: ["m7", "m8", "m9", "p7", "p8", "p9", "s7", "s8", "s9", "z5", "z5", "m1", "p1", "s1"],
    question: "7·8·9 슌쯔가 세 색에 있으면?",
    answers: ["삼색동순(789)", "일기통관", "탕야오", "이페코"],
    correct: 0,
    explanation: "같은 숫자의 슌쯔가 만·통·삭에 있으면 삼색동순입니다.",
  },
  {
    tiles: ["m4", "m4", "p4", "p4", "s4", "s4", "m5", "m5", "p5", "p5", "s5", "s5", "z1", "z1"],
    question: "같은 숫자 4·5가 여러 색에 있으면?",
    answers: ["삼색·일통 후보를 봄", "역패만 봄", "치또이츠만 봄", "도라만 봄"],
    correct: 0,
    explanation: "숫자와 색 조합에 따라 삼색동순·일기통관 등을 짚어볼 수 있습니다.",
  },
  {
    tiles: ["m1", "m2", "m3", "p4", "p5", "p6", "s7", "s8", "s9", "z7", "z7", "z7", "m9", "p1"],
    question: "요구패 비중은?",
    answers: ["많음", "적음", "없음", "모름"],
    correct: 0,
    explanation: "1·9·자패가 여러 장 있어 요구패 비중이 큽니다.",
  },
  {
    tiles: ["m3", "m4", "m5", "p6", "p7", "p8", "s2", "s3", "s4", "z5", "z5", "z6", "z7", "z7"],
    question: "리치마작에서 화료에 꼭 필요한 것은?",
    answers: ["역 1개 이상", "도라 1개", "깡 1번", "자패 3종"],
    correct: 0,
    explanation: "완성형만으로는 부족하고 역이 최소 1개 필요합니다.",
  },
  {
    tiles: ["p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p2", "p3", "p4", "z5", "z5", "z6"],
    question: "통수패 비중이 높으면 의심할 역은?",
    answers: ["혼일색·일기통관", "국사무쌍만", "역패만", "리치만"],
    correct: 0,
    explanation: "한 색이 몰리면 혼일색·일기통관 등을 먼저 봅니다.",
  },
  {
    tiles: ["m6", "m7", "m8", "m6", "m7", "m8", "p3", "p4", "p5", "s9", "s9", "z4", "z4", "z4"],
    question: "북 3장이 자리패와 맞을 때는?",
    answers: ["역패 후보", "탕야오", "청일색", "치또이츠"],
    correct: 0,
    explanation: "자신의 장풍·바람 커쯔는 역패 후보입니다.",
  },
  {
    tiles: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "m5", "m5", "p3", "p4", "p5"],
    question: "삭수패만으로 1~9가 이어지면?",
    answers: ["일기통관", "삼색동순", "혼노두", "이페코"],
    correct: 0,
    explanation: "한 종류 수패로 1-9 슌쯔 3개면 일기통관입니다.",
  },
  {
    tiles: ["m2", "m3", "m4", "p5", "p6", "p7", "s6", "s7", "s8", "z5", "z5", "z6", "z7", "z7"],
    question: "4몸통 1머리 형태에 가깝고 역이 없다면?",
    answers: ["화료 불가", "도라만으로 화료", "쯔모만 가능", "론만 가능"],
    correct: 0,
    explanation: "모양이 맞아도 역이 없으면 화료할 수 없습니다.",
  },
  {
    tiles: ["m1", "m9", "p2", "p8", "s3", "s7", "z2", "z3", "z4", "z5", "z6", "z7", "m5", "p5"],
    question: "풍패·삼원패가 섞인 손은?",
    answers: ["자패 활용이 핵심", "수패만 사용", "도라 없음", "치또이츠만 가능"],
    correct: 0,
    explanation: "자패는 슌쯔가 안 되므로 커쯔·머리·역패로 연결합니다.",
  },
  {
    tiles: ["m1", "m9", "p1", "p9", "s2", "s3", "s4", "z5", "z5", "z6", "z7", "z7", "m5", "p6"],
    quizKind: "yakuhaiCount",
    explanation: "1·9 수패와 자패(풍·삼원)를 합쳐 요구패 장수를 셉니다.",
  },
  {
    tiles: ["m2", "m3", "m4", "p5", "p6", "p7", "s8", "s9", "z1", "z2", "m8", "p3", "p4", "s5"],
    quizKind: "yakuhaiCount",
    explanation: "1·9 수패와 자패(풍·삼원)를 합쳐 요구패 장수를 셉니다.",
  },
  {
    tiles: ["m1", "m1", "m9", "p9", "s1", "s2", "s3", "z3", "z4", "z5", "z6", "z7", "p5", "p6"],
    quizKind: "yakuhaiCount",
    explanation: "1·9 수패와 자패(풍·삼원)를 합쳐 요구패 장수를 셉니다.",
  },
];

const PROGRESS_KEY = "jaktakPartProgress";
const LEGACY_STORAGE_KEY = "jaktakCompletedViews";
const DAILY_QUIZ_KEY = "jaktakDailyQuiz";
const TILE_IMAGE_BASE_URL = "https://commons.wikimedia.org/wiki/Special:Redirect/file/";

const tileGroups = [
  {
    title: "만수패",
    description: "1만~9만. 숫자와 한자 萬이 함께 보이는 수패입니다.",
    tiles: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9"],
  },
  {
    title: "통수패",
    description: "1통~9통. 동그라미 문양으로 숫자를 구분합니다.",
    tiles: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9"],
  },
  {
    title: "삭수패",
    description: "1삭~9삭. 큰 새 모양은 1삭이므로 유의하세요.",
    tiles: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"],
  },
  {
    title: "풍패",
    description: "동·남·서·북. 장풍·자풍에 맞는 바람패는 역패(1판)가 될 수 있습니다.",
    tiles: ["z1", "z2", "z3", "z4"],
  },
  {
    title: "삼원패",
    description: "백·발·중. 3장을 모으면 역패(1판)입니다.",
    tiles: ["z5", "z6", "z7"],
  },
  {
    title: "적도라",
    description: "빨간 5. 역은 아니지만 화료 시 보너스 1판으로 계산합니다.",
    tiles: ["m5r", "p5r", "s5r"],
  },
];

const yakuCategories = [
  {
    step: "입문",
    title: "역이란?",
    short: "완성만으로는 화료 불가",
    intro:
      "리치마작에서는 손패 모양을 완성하는 것만으로는 화료할 수 없습니다. 최소 1개의 역이 있어야 론이나 쯔모로 날 수 있습니다.",
    kind: "intro",
    chips: ["역 1개 이상 필요", "도라만으로는 불가", "멘젠 조건 주의", "리치+일발"],
  },
  {
    step: "입문",
    title: "대기란?",
    short: "텐파이와 핑후 조건",
    kind: "wait",
  },
  {
    step: "1판 역",
    title: "입문 필수 역",
    short: "처음에는 이 6개부터 익힙니다.",
    intro: "화료하려면 원칙적으로 역이 1개 이상 필요합니다. 아래 역들은 초반 학습 우선순위가 가장 높습니다.",
    items: [
      {
        name: "리치",
        han: "1판",
        closedOnly: true,
        open: "멘젠 전용",
        rule: "멘젠 텐파이에서 1,000점을 공탁하고 선언합니다.",
        tip: "초보자는 ‘멘젠 텐파이 = 리치 가능’으로 먼저 기억하면 됩니다.",
        tiles: ["m2", "m3", "m4", "p5", "p6", "p7", "s6", "s7", "s8", "z5", "z5"],
      },
      {
        name: "멘젠쯔모",
        han: "1판",
        closedOnly: true,
        open: "멘젠 전용",
        rule: "울지 않고 본인이 직접 뽑은 패로 화료합니다.",
        tip: "리치와 함께 붙기 쉬운 기본 보너스 역입니다.",
        tiles: ["m3", "m4", "m5", "p6", "p7", "p8", "s2", "s3", "s4", "z2", "z2"],
      },
      {
        name: "탕야오",
        han: "1판",
        closedOnly: false,
        open: "후로 가능",
        rule: "1, 9, 자패 없이 2~8 수패만 사용합니다.",
        tip: "가장 만들기 쉬운 빠른 역입니다. 단, 룰에 따라 쿠이탕 허용 여부를 확인하세요.",
        tiles: ["m2", "m3", "m4", "p3", "p4", "p5", "s6", "s7", "s8", "p2", "p2"],
      },
      {
        name: "핑후",
        han: "1판",
        closedOnly: true,
        open: "멘젠 전용",
        rule: "모든 몸통이 슌쯔이고, 머리가 역패가 아니며, 양면 대기인 형태입니다.",
        tip: "‘슌쯔 4개 + 평범한 머리 + 양면 대기’로 먼저 감을 잡으면 됩니다.",
        tiles: ["m2", "m3", "m4", "p3", "p4", "p5", "s6", "s7", "s8", "z2", "z2"],
      },
      {
        name: "이페코",
        han: "1판",
        closedOnly: true,
        open: "멘젠 전용",
        rule: "같은 수패의 같은 슌쯔 2개를 만듭니다.",
        tip: "예: 2-3-4만이 2세트 있으면 이페코 후보입니다.",
        tiles: ["m2", "m3", "m4", "m2", "m3", "m4", "p6", "p7", "p8", "s5", "s5"],
      },
      {
        name: "역패",
        han: "1판",
        closedOnly: false,
        open: "후로 가능",
        rule: "백·발·중 또는 자신의 자풍·이번 국 장풍 바람패를 커쯔로 만듭니다.",
        tip: "삼원패 3장은 언제나 역패입니다. 바람패는 조건을 확인해야 합니다.",
        tiles: ["z7", "z7", "z7", "p2", "p3", "p4", "m7", "m8", "m9", "s5", "s5"],
      },
    ],
  },
  {
    step: "2판 중심",
    title: "모양이 보이는 역",
    short: "또이츠, 숫자 배열, 색을 봅니다.",
    intro: "패 모양이 선명해질수록 특정 역을 노릴 수 있습니다. 멘젠/후로에 따라 판수가 달라지는 역도 있습니다.",
    items: [
      {
        name: "치또이츠",
        han: "2판",
        closedOnly: true,
        open: "멘젠 전용",
        rule: "서로 다른 또이츠 7쌍으로 화료합니다.",
        tip: "몸통 4개 형태가 아니라 ‘짝 7개’라는 특수 형태입니다.",
        tiles: ["m1", "m1", "p4", "p4", "s7", "s7", "z1", "z1", "z5", "z5", "z7", "z7"],
      },
      {
        name: "또이또이",
        han: "2판",
        closedOnly: false,
        open: "후로 가능",
        rule: "커쯔 4개와 머리로 이루어진 손패입니다.",
        tip: "퐁을 많이 받은 손이라면 가장 먼저 의심해볼 역입니다.",
        tiles: ["m3", "m3", "m3", "p7", "p7", "p7", "s2", "s2", "s2", "z6", "z6"],
      },
      {
        name: "삼색동순",
        han: "2판 / 후로 1판",
        closedOnly: false,
        open: "후로 시 1판 감소",
        rule: "만수패·통수패·삭수패에서 같은 숫자 슌쯔를 각각 1개씩 만듭니다.",
        tip: "예: 3-4-5만, 3-4-5통, 3-4-5삭.",
        tiles: ["m3", "m4", "m5", "p3", "p4", "p5", "s3", "s4", "s5", "z5", "z5"],
      },
      {
        name: "일기통관",
        han: "2판 / 후로 1판",
        closedOnly: false,
        open: "후로 시 1판 감소",
        rule: "한 종류 수패로 1-2-3, 4-5-6, 7-8-9 슌쯔를 모두 만듭니다.",
        tip: "한 종류 수패가 1부터 9까지 길게 이어질 때 확인합니다.",
        tiles: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "p5", "p5"],
      },
      {
        name: "혼일색",
        han: "3판 / 후로 2판",
        closedOnly: false,
        open: "후로 시 1판 감소",
        rule: "한 종류 수패와 자패만 사용합니다.",
        tip: "한 색이 몰리고 자패가 많으면 고타점 후보가 됩니다.",
        tiles: ["m1", "m2", "m3", "m4", "m5", "m6", "z1", "z1", "z1", "z5", "z5"],
      },
    ],
  },
  {
    step: "고타점 후보",
    title: "색·끝패·역만 입문",
    short: "조건이 선명할 때 노립니다.",
    intro: "처음부터 모두 외우기보다, 손패가 한쪽으로 강하게 치우칠 때 확인하는 용도로 익히면 좋습니다.",
    items: [
      {
        name: "청일색",
        han: "6판 / 후로 5판",
        closedOnly: false,
        open: "후로 시 1판 감소",
        rule: "한 종류 수패만 사용하고 자패는 쓰지 않습니다.",
        tip: "혼일색보다 조건이 빡세지만 훨씬 높은 타점입니다.",
        tiles: ["p1", "p2", "p3", "p3", "p4", "p5", "p5", "p6", "p7", "p8", "p8"],
      },
      {
        name: "혼노두",
        han: "2판",
        closedOnly: false,
        open: "후로 가능",
        rule: "1, 9, 자패만 사용합니다.",
        tip: "치또이츠 또는 또이또이와 함께 붙는 경우가 많습니다.",
        tiles: ["m1", "m1", "m9", "m9", "p1", "p1", "s9", "s9", "z1", "z1", "z7", "z7"],
      },
      {
        name: "국사무쌍",
        han: "역만",
        closedOnly: true,
        open: "멘젠 전용",
        rule: "1·9 수패와 자패 13종을 모으고, 그중 하나를 한 쌍으로 만듭니다.",
        tip: "초반에 터미널/자패가 매우 많을 때만 노립니다.",
        tiles: ["m1", "m9", "p1", "p9", "s1", "s9", "z1", "z2", "z3", "z4", "z5", "z6", "z7", "z7"],
      },
    ],
  },
];

const quizzes = [
  {
    type: "rule",
    question: "상가에 대한 설명으로 맞는 것은?",
    tiles: [],
    answers: ["나보다 먼저 도는 사람", "나보다 나중에 도는 사람", "내 맞은편 사람", "이번 국의 친"],
    correct: 0,
    explanation: "상가는 나보다 먼저 차례가 오는 사람이며, 보통 왼쪽에 있습니다.",
  },
  {
    type: "rule",
    question: "리치마작에서 화료하기 위해 꼭 필요한 것은?",
    tiles: [],
    answers: ["도라 1개", "역 1개 이상", "깡 1번", "자패 1개"],
    correct: 1,
    explanation: "리치마작에서는 완성형이어도 최소 1개의 역이 있어야 화료할 수 있습니다.",
  },
  {
    type: "rule",
    question: "치에 대한 설명으로 맞는 것은?",
    tiles: ["m2", "m3"],
    answers: [
      "상가의 버림패로 슌쯔를 만들 수 있다",
      "누구의 버림패든 사용할 수 있다",
      "같은 패 4장을 만드는 행동이다",
      "도라를 추가하는 행동이다",
    ],
    correct: 0,
    explanation: "치는 상가가 버린 패로만 슌쯔를 만들 수 있습니다.",
  },
  {
    type: "yaku",
    question: "1, 9, 자패가 없는 이 손의 대표 역은?",
    tiles: ["m2", "m3", "m4", "p3", "p4", "p5", "s6", "s7", "s8", "p2", "p2"],
    answers: ["탕야오", "혼일색", "역패", "치또이츠"],
    correct: 0,
    explanation: "2~8 수패만 사용했으므로 탕야오입니다.",
  },
  {
    type: "yaku",
    question: "중 3장을 포함한 이 손에서 바로 보이는 역은?",
    tiles: ["z7", "z7", "z7", "p2", "p3", "p4", "m7", "m8", "m9", "s5", "s5"],
    answers: ["역패", "핑후", "탕야오", "리치"],
    correct: 0,
    explanation: "중은 삼원패라서 3장을 모으면 역패 1판입니다.",
  },
  {
    type: "yaku",
    question: "짝 7개로 완성하는 특수 형태는?",
    tiles: ["m1", "m1", "p4", "p4", "s7", "s7", "z1", "z1", "z5", "z5", "z7", "z7"],
    answers: ["치또이츠", "리치", "혼일색", "핑후"],
    correct: 0,
    explanation: "서로 다른 또이츠 7쌍이므로 치또이츠입니다.",
  },
  {
    type: "yaku",
    question: "멘젠 텐파이에서 선언할 수 있는 역은?",
    tiles: ["m3", "m4", "m5", "p6", "p7", "p8", "s2", "s3", "s4", "z2", "z2"],
    answers: ["리치", "역패", "혼일색", "또이또이"],
    correct: 0,
    explanation: "멘젠 텐파이면 리치를 선언할 수 있습니다.",
  },
  {
    type: "yaku",
    question: "같은 슌쯔가 2개 보이는 이 손의 역 후보는?",
    tiles: ["m2", "m3", "m4", "m2", "m3", "m4", "p6", "p7", "p8", "s5", "s5"],
    answers: ["이페코", "또이또이", "국사무쌍", "혼노두"],
    correct: 0,
    explanation: "같은 수패의 같은 슌쯔 2개이므로 이페코 후보입니다. 단, 멘젠 전용입니다.",
  },
  {
    type: "yaku",
    question: "3-4-5가 만·통·삭에 모두 있으면?",
    tiles: ["m3", "m4", "m5", "p3", "p4", "p5", "s3", "s4", "s5", "z5", "z5"],
    answers: ["삼색동순", "치또이츠", "역패", "청일색"],
    correct: 0,
    explanation: "세 종류 수패에 같은 숫자 슌쯔가 있으므로 삼색동순입니다.",
  },
  {
    type: "yaku",
    question: "한 종류 수패와 자패만 사용한 이 손의 역은?",
    tiles: ["m1", "m2", "m3", "m4", "m5", "m6", "z1", "z1", "z1", "z5", "z5"],
    answers: ["혼일색", "탕야오", "핑후", "이페코"],
    correct: 0,
    explanation: "만수패와 자패만 있으므로 혼일색 후보입니다.",
  },
  {
    type: "yaku",
    question: "1-2-3, 4-5-6, 7-8-9가 같은 색으로 이어지면?",
    tiles: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "p5", "p5"],
    answers: ["일기통관", "역패", "또이또이", "멘젠쯔모"],
    correct: 0,
    explanation: "한 종류 수패로 1~9가 세 슌쯔로 이어지면 일기통관입니다.",
  },
  {
    type: "tile",
    quizKind: "yakuhaiCount",
    tiles: ["m1", "m9", "p1", "p9", "s2", "s3", "s4", "z5", "z5", "z6", "z7", "z7", "m5", "p6"],
    explanation: "1·9 수패와 자패(풍·삼원)를 합쳐 요구패 장수를 셉니다.",
  },
  {
    type: "tile",
    quizKind: "yakuhaiCount",
    tiles: ["m2", "m3", "m4", "p5", "p6", "p7", "s8", "s9", "z1", "z2", "m8", "p3", "p4", "s5"],
    explanation: "1·9 수패와 자패(풍·삼원)를 합쳐 요구패 장수를 셉니다.",
  },
  {
    type: "rule",
    question: "치·퐁을 한 뒤 손 상태는?",
    tiles: ["m3", "m3", "m3", "p4", "p5", "p6"],
    answers: ["후로(멘젠 깨짐)", "멘젠 유지", "도라 추가", "노텐"],
    correct: 0,
    explanation: "치·퐁·열린 깡을 하면 후로 상태가 되어 멘젠이 깨집니다.",
  },
  {
    type: "rule",
    question: "리치 선언에 필요한 것은?",
    tiles: [],
    answers: ["멘젠 텐파이 + 1,000점", "도라 1개", "깡 1번", "유국"],
    correct: 0,
    explanation: "울지 않은 텐파이에서 1,000점을 공탁하고 리치를 선언합니다.",
  },
  {
    type: "rule",
    question: "동시에 호출할 수 있을 때 우선순위는?",
    tiles: [],
    answers: ["론 > 퐁·깡 > 치", "치 > 퐁 > 론", "깡 > 치 > 론", "퐁 > 론 > 치"],
    correct: 0,
    explanation: "동시에 가능하면 론이 퐁·깡·치보다 우선합니다.",
  },
  {
    type: "rule",
    question: "9삭이 도라 표시패일 때 도라는?",
    tiles: ["s9"],
    answers: ["1삭", "8삭", "9삭", "동"],
    correct: 0,
    explanation: "수패는 9 다음이 1입니다. 9삭 표시 → 1삭 도라.",
  },
  {
    type: "rule",
    question: "치를 할 수 있는 사람의 버림패는?",
    tiles: ["m2", "m3"],
    answers: ["상가만", "누구나", "하가만", "대면만"],
    correct: 0,
    explanation: "치는 나보다 먼저 도는 상가의 버림패로만 슌쯔를 만들 수 있습니다.",
  },
  {
    type: "yaku",
    question: "리치 후 다음 쯔모 전에 화료하면 붙을 수 있는 역은?",
    tiles: [],
    answers: ["일발", "탕야오만", "도라만", "역패만"],
    correct: 0,
    explanation: "리치 후 치·퐁·깡 없이 화료하면 일발 1판이 붙을 수 있습니다.",
  },
];

const tileMeta = {
  m: { suit: "man", filePrefix: "MJw", suitText: "만", values: ["", "1만", "2만", "3만", "4만", "5만", "6만", "7만", "8만", "9만"] },
  p: { suit: "pin", filePrefix: "MJt", suitText: "통", values: ["", "1통", "2통", "3통", "4통", "5통", "6통", "7통", "8통", "9통"] },
  s: { suit: "sou", filePrefix: "MJs", suitText: "삭", values: ["", "1삭", "2삭", "3삭", "4삭", "5삭", "6삭", "7삭", "8삭", "9삭"] },
  z: { suit: "honor", values: ["", "동", "남", "서", "북", "백", "발", "중"] },
};

const honorTileFiles = {
  z1: "MJf1-.svg",
  z2: "MJf2-.svg",
  z3: "MJf3-.svg",
  z4: "MJf4-.svg",
  z5: "MJd3e-.svg",
  z6: "MJd2-.svg",
  z7: "MJd1-.svg",
};

let currentQuiz = 0;
let quizScore = 0;
let answered = false;
let dailyAnswered = false;
let progress = readProgress();

function defaultProgress() {
  return {
    rulesUnits: [],
    tilesSeen: false,
    yakuCategories: [],
    quizAnswered: [],
    scoreSeen: false,
  };
}

function readProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) {
      return { ...defaultProgress(), ...JSON.parse(raw) };
    }
  } catch (error) {
    // Ignore parse errors.
  }
  return migrateLegacyProgress();
}

function migrateLegacyProgress() {
  const data = defaultProgress();
  try {
    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || "[]");
    if (!Array.isArray(legacy)) return data;
    if (legacy.includes("rules")) data.rulesUnits = [0];
    if (legacy.includes("tiles")) data.tilesSeen = true;
    if (legacy.includes("yaku")) data.yakuCategories = [0];
    if (legacy.includes("quiz")) data.quizAnswered = [0];
    if (legacy.includes("score")) data.scoreSeen = true;
  } catch (error) {
    // Ignore legacy storage.
  }
  return data;
}

function writeProgress() {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    // Some file:// browser contexts block storage.
  }
}

function markRuleUnitSeen(index) {
  if (!progress.rulesUnits.includes(index)) {
    progress.rulesUnits.push(index);
    writeProgress();
  }
}

function markTilesSeen() {
  if (!progress.tilesSeen) {
    progress.tilesSeen = true;
    writeProgress();
  }
}

function markYakuCategorySeen(index) {
  if (!progress.yakuCategories.includes(index)) {
    progress.yakuCategories.push(index);
    writeProgress();
  }
}

function markQuizQuestionSeen(index) {
  if (!progress.quizAnswered.includes(index)) {
    progress.quizAnswered.push(index);
    writeProgress();
  }
}

function markScoreSeen() {
  if (!progress.scoreSeen) {
    progress.scoreSeen = true;
    writeProgress();
  }
}

/** 파트별 완료 수·전체 수 */
function getPartProgress(partId) {
  const total = partTotals[partId]?.() ?? 1;
  let done = 0;

  if (partId === "rules") done = progress.rulesUnits.length;
  else if (partId === "tiles") done = progress.tilesSeen ? 1 : 0;
  else if (partId === "yaku") done = progress.yakuCategories.length;
  else if (partId === "quiz") done = progress.quizAnswered.length;
  else if (partId === "score") done = progress.scoreSeen ? 1 : 0;

  const percent = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;
  return { done, total, percent };
}

function renderPartProgressBars() {
  document.querySelectorAll("[data-part-progress]").forEach((slot) => {
    const partId = slot.dataset.partProgress;
    const { done, total, percent } = getPartProgress(partId);
    const compact = slot.classList.contains("part-progress--compact");

    slot.innerHTML = `
      <div class="part-progress-head">
        <span>${compact ? "진도" : "학습 진도"}</span>
        <strong>${done} / ${total}</strong>
      </div>
      <div class="progress-track" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-fill" style="width: ${percent}%"></div>
      </div>
    `;
  });
}

function normalizeTileCode(tileCode) {
  return String(tileCode || "").trim().toLowerCase();
}

function parseTileCode(tileCode) {
  const code = normalizeTileCode(tileCode);
  const match = code.match(/^([mpsz])([1-9])(r?)$/);
  if (!match) return null;

  const [, suitKey, rawValue, redFlag] = match;
  const value = Number(rawValue);
  const isRed = redFlag === "r";

  if (suitKey === "z" && (value < 1 || value > 7 || isRed)) return null;
  if (["m", "p", "s"].includes(suitKey) && isRed && value !== 5) return null;

  return { code, suitKey, value, isRed };
}

function getTileFileName(tileCode) {
  const tile = parseTileCode(tileCode);
  if (!tile) return null;

  if (tile.suitKey === "z") {
    return honorTileFiles[`z${tile.value}`] || null;
  }

  const meta = tileMeta[tile.suitKey];
  return `${meta.filePrefix}${tile.value}${tile.isRed ? "r" : ""}-.svg`;
}

function getTileImageUrl(tileCode) {
  const fileName = getTileFileName(tileCode);
  if (!fileName) return "";
  return `${TILE_IMAGE_BASE_URL}${encodeURIComponent(fileName)}`;
}

function getTileLabel(tileCode) {
  const tile = parseTileCode(tileCode);
  if (!tile) return "알 수 없는 패";

  const meta = tileMeta[tile.suitKey];
  const baseLabel = tile.suitKey === "z" ? meta.values[tile.value] : meta.values[tile.value];
  return tile.isRed ? `적도라 ${baseLabel}` : baseLabel;
}

/** 요구패: 1·9 수패 + 자패(풍·삼원) */
function isYakuhaiTile(tileCode) {
  const tile = parseTileCode(tileCode);
  if (!tile) return false;
  if (tile.suitKey === "z") return true;
  return tile.value === 1 || tile.value === 9;
}

function countYakuhaiTiles(tiles) {
  return (Array.isArray(tiles) ? tiles : []).filter(isYakuhaiTile).length;
}

/** 요구패 N장 퀴즈: 오답 보기를 날짜 시드로 섞어 생성 */
function buildYakuhaiCountQuiz(source, seed = 0) {
  const tiles = source.tiles || [];
  const count = countYakuhaiTiles(tiles);
  const wrong = new Set();

  let n = seed;
  const next = () => {
    n = (n * 1664525 + 1013904223) >>> 0;
    return n;
  };

  while (wrong.size < 3) {
    const offset = (next() % 5) - 2;
    const candidate = Math.max(0, Math.min(14, count + offset));
    if (candidate !== count) wrong.add(candidate);
  }

  const options = [count, ...wrong];
  for (let i = options.length - 1; i > 0; i -= 1) {
    const j = next() % (i + 1);
    [options[i], options[j]] = [options[j], options[i]];
  }

  const answers = options.map((value) => `${value}장`);
  return {
    type: source.type || "tile",
    tiles,
    question: "이 14장의 요구패(1·9·자패)는 몇 장인가요?",
    answers,
    correct: answers.indexOf(`${count}장`),
    explanation:
      source.explanation || `1·9 수패와 자패를 합치면 ${count}장입니다.`,
  };
}

/** quizKind 등 동적 문항을 실제 표시용 객체로 변환 */
function resolveQuizPayload(source, seed = 0) {
  if (source?.quizKind === "yakuhaiCount") {
    return buildYakuhaiCountQuiz(source, seed);
  }
  return source;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/** 상단 로고 패 이미지 */
function renderAppBarLogo() {
  const container = document.getElementById("appBarTile");
  if (!container) return;
  container.innerHTML = tileMarkup(appBarLogoTile);
}

function tileMarkup(tileCode) {
  const tile = parseTileCode(tileCode);
  const label = getTileLabel(tileCode);

  if (!tile) {
    return `<span class="tile tile-fallback" aria-label="${escapeHtml(label)}">?</span>`;
  }

  const src = getTileImageUrl(tile.code);
  const classes = ["tile", tileMeta[tile.suitKey].suit, `tile-${tile.code}`, tile.isRed ? "red-dora" : ""]
    .filter(Boolean)
    .join(" ");

  return `
    <span class="${classes}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">
      <img
        class="mahjong-tile-img tile-img"
        src="${src}"
        alt="${escapeHtml(label)}"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
    </span>
  `;
}

function renderHand(elementId, tiles) {
  const target = document.getElementById(elementId);
  if (!target) return;
  target.innerHTML = tiles.map(tileMarkup).join("");
}

/** YYYY-MM-DD — 같은 날에는 같은 데일리 세트 */
function getTodayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function hashDayKey(dayKey) {
  let hash = 0;
  for (let i = 0; i < dayKey.length; i += 1) {
    hash = (hash * 31 + dayKey.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function getDailySetIndex(dayKey = getTodayKey()) {
  return hashDayKey(dayKey) % DAILY_HAND_SETS.length;
}

function getDailySet(dayKey = getTodayKey()) {
  const raw = DAILY_HAND_SETS[getDailySetIndex(dayKey)];
  return resolveQuizPayload(raw, hashDayKey(`${dayKey}-quiz`));
}

function formatDailyDateLabel(dayKey = getTodayKey()) {
  const [, month, day] = dayKey.split("-");
  return `${Number(month)}월 ${Number(day)}일`;
}

function readDailyQuizState(dayKey = getTodayKey()) {
  try {
    const raw = JSON.parse(localStorage.getItem(DAILY_QUIZ_KEY) || "{}");
    if (raw.dayKey === dayKey) return raw;
  } catch (error) {
    // Ignore parse errors.
  }
  return { dayKey, correct: false };
}

function writeDailyQuizState(state) {
  try {
    localStorage.setItem(DAILY_QUIZ_KEY, JSON.stringify(state));
  } catch (error) {
    // Ignore blocked storage.
  }
}

/** 홈 데일리: 오늘 14장 + 1문항 */
function renderDailyQuiz() {
  const dayKey = getTodayKey();
  const set = getDailySet(dayKey);
  const saved = readDailyQuizState(dayKey);

  const badge = document.getElementById("dailyDateBadge");
  const hand = document.getElementById("dailyHand");
  const question = document.getElementById("dailyQuestion");
  const grid = document.getElementById("dailyAnswerGrid");
  const feedback = document.getElementById("dailyFeedback");
  const lead = document.getElementById("dailyQuizLead");

  if (badge) badge.textContent = formatDailyDateLabel(dayKey);
  if (hand) hand.innerHTML = set.tiles.map(tileMarkup).join("");
  if (question) question.textContent = set.question;
  if (lead) {
    lead.textContent = saved.correct
      ? "오늘 문제를 맞혔습니다. 내일 새 손패가 열립니다."
      : "매일 바뀌는 14장의 패를 보고 문제에 답해보자";
  }

  dailyAnswered = saved.correct;
  if (feedback) {
    const message = saved.correct ? "오늘 데일리 퀴즈 완료!" : "";
    feedback.textContent = message;
    feedback.hidden = !message;
    feedback.classList.toggle("is-success", saved.correct);
  }

  if (!grid) return;

  grid.innerHTML = set.answers
    .map(
      (answer, index) =>
        `<button type="button" data-index="${index}" ${saved.correct ? "disabled" : ""}>${escapeHtml(answer)}</button>`,
    )
    .join("");

  if (saved.correct) {
    const buttons = grid.querySelectorAll("button");
    buttons.forEach((button) => (button.disabled = true));
    buttons[set.correct]?.classList.add("correct");
  }
}

function answerDailyQuiz(index) {
  if (dailyAnswered) return;

  const dayKey = getTodayKey();
  const set = getDailySet(dayKey);
  const grid = document.getElementById("dailyAnswerGrid");
  const feedback = document.getElementById("dailyFeedback");
  const lead = document.getElementById("dailyQuizLead");
  const buttons = grid?.querySelectorAll("button") ?? [];

  dailyAnswered = true;
  buttons.forEach((button) => (button.disabled = true));
  buttons[set.correct]?.classList.add("correct");

  if (index === set.correct) {
    if (feedback) {
      feedback.textContent = `정답! ${set.explanation}`;
      feedback.hidden = false;
      feedback.classList.add("is-success");
    }
    writeDailyQuizState({ dayKey, correct: true });
    renderPartProgressBars();
  } else {
    buttons[index]?.classList.add("wrong");
    if (feedback) {
      feedback.textContent = `아쉬워요. ${set.explanation}`;
      feedback.hidden = false;
    }
  }

  if (lead && index === set.correct) {
    lead.textContent = "오늘 문제를 맞혔습니다. 내일 새 손패가 열립니다.";
  }
}

function renderSeatTermsMarkup() {
  return seatTerms
    .map(
      (term) => `
        <article class="term-card">
          <div>
            <strong>${escapeHtml(term.name)}</strong>
            <small>${escapeHtml(term.reading)}</small>
          </div>
          <p>${escapeHtml(term.short)}</p>
          <span>${escapeHtml(term.description)}</span>
        </article>
      `,
    )
    .join("");
}

function renderRuleStepsMarkup() {
  return ruleSteps
    .map(
      (step, index) => `
        <article class="rule-step-card">
          <div class="rule-step-header">
            <span class="rule-step-number">${index + 1}</span>
            <div>
              <strong>${escapeHtml(step.title)}</strong>
              <p>${escapeHtml(step.summary)}</p>
            </div>
          </div>
          <div class="hand-row">${step.tiles.map(tileMarkup).join("")}</div>
          <p class="rule-step-detail">${escapeHtml(step.detail)}</p>
          <div class="concept-chip-list">
            ${step.chips.map((chip) => `<span class="concept-chip">${escapeHtml(chip)}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderRuleTipCardsMarkup() {
  return ruleTipCards
    .map(
      (card) => `
        <article class="tip-card">
          <p class="eyebrow">${escapeHtml(card.eyebrow)}</p>
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.body)}</p>
          <div class="concept-chip-list">
            ${card.chips.map((chip) => `<span class="concept-chip">${escapeHtml(chip)}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderDoraGuideMarkup() {
  return `
    <p class="eyebrow">${escapeHtml(doraGuide.eyebrow)}</p>
    <h3>${escapeHtml(doraGuide.title)}</h3>
    <p>${escapeHtml(doraGuide.body)}</p>
    <ul class="dora-example-list">
      ${doraGuide.examples
        .map(
          (row) => `
            <li>
              <span class="dora-from">${escapeHtml(row.indicator)}</span>
              <span class="dora-arrow" aria-hidden="true">→</span>
              <span class="dora-to">${escapeHtml(row.dora)}</span>
            </li>
          `,
        )
        .join("")}
    </ul>
  `;
}

function renderBasicTermsMarkup() {
  return basicTerms
    .map(
      (term) => `
        <article class="term-card compact">
          <strong>${escapeHtml(term.name)}</strong>
          <p>${escapeHtml(term.description)}</p>
        </article>
      `,
    )
    .join("");
}

function renderRuleUnitDetail(index) {
  const unit = ruleUnits[index];
  const detail = document.getElementById("ruleDetail");
  if (!unit || !detail) return;

  let body = "";

  if (unit.id === "seats") {
    body = `
      <article class="table-card">
        <div class="mahjong-table-diagram" aria-label="작탁 자리 설명">
          <div class="seat seat-top">대면</div>
          <div class="seat seat-left">상가</div>
          <div class="seat seat-center">나</div>
          <div class="seat seat-right">하가</div>
          <div class="seat seat-bottom">내 자리</div>
        </div>
        <p>${escapeHtml(unit.intro)}</p>
      </article>
      <div class="term-list">${renderSeatTermsMarkup()}</div>
    `;
  } else if (unit.id === "flow") {
    body = `<div class="rule-step-list">${renderRuleStepsMarkup()}</div>`;
  } else if (unit.id === "riichi") {
    body = `<div class="tip-card-list">${renderRuleTipCardsMarkup()}</div>`;
  } else if (unit.id === "dora") {
    body = `<article class="dora-guide-card">${renderDoraGuideMarkup()}</article>`;
  } else if (unit.id === "terms") {
    body = `<div class="term-list">${renderBasicTermsMarkup()}</div>`;
  } else if (unit.id === "core") {
    body = `
      <div class="concept-chip-list">
        <span class="concept-chip">역 1개 이상</span>
        <span class="concept-chip">도라만으로 불가</span>
        <span class="concept-chip">멘젠 조건 주의</span>
      </div>
    `;
  }

  detail.innerHTML = `
    <p class="eyebrow">${escapeHtml(unit.step)}</p>
    <h2>${escapeHtml(unit.title)}</h2>
    <p>${escapeHtml(unit.intro)}</p>
    ${body}
  `;
}

/** 룰 단원 목록 렌더링 */
function renderRuleUnitList() {
  const list = document.getElementById("ruleUnitList");
  if (!list) return;

  list.innerHTML = ruleUnits
    .map(
      (unit, index) => `
        <button
          class="rule-unit-button ${index === activeRuleUnitIndex && rulesUnitOpen ? "active" : ""}"
          data-index="${index}"
          type="button"
          aria-pressed="${index === activeRuleUnitIndex && rulesUnitOpen}"
        >
          <strong>${escapeHtml(unit.step)} · ${escapeHtml(unit.title)}</strong>
          <small>${escapeHtml(unit.short)}</small>
        </button>
      `,
    )
    .join("");
}

function openRuleUnit(index) {
  const listPanel = document.getElementById("rulesListPanel");
  const detailPanel = document.getElementById("rulesDetailPanel");
  const unit = ruleUnits[index];
  if (!listPanel || !detailPanel || !unit) return;

  activeRuleUnitIndex = index;
  rulesUnitOpen = true;

  listPanel.hidden = true;
  detailPanel.hidden = false;

  document.querySelectorAll(".rule-unit-button").forEach((button, i) => {
    const isActive = i === index;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  markRuleUnitSeen(index);
  renderRuleUnitDetail(index);
  renderPartProgressBars();
  document.getElementById("rules")?.scrollTo({ top: 0, behavior: "smooth" });
}

function closeRuleUnit() {
  const listPanel = document.getElementById("rulesListPanel");
  const detailPanel = document.getElementById("rulesDetailPanel");
  if (!listPanel || !detailPanel) return;

  rulesUnitOpen = false;
  listPanel.hidden = false;
  detailPanel.hidden = true;
  document.querySelectorAll(".rule-unit-button").forEach((button) => {
    button.classList.remove("active");
    button.setAttribute("aria-pressed", "false");
  });
}

/** rules 뷰: 단원 목록 초기화 */
function renderRules() {
  closeRuleUnit();
  renderRuleUnitList();
}

function renderScoreGuides() {
  const container = document.getElementById("scoreGuides");
  if (!container) return;

  container.innerHTML = scoreGuides
    .map(
      (guide) => `
        <article class="score-guide-card">
          <p class="eyebrow">${escapeHtml(guide.eyebrow)}</p>
          <h3>${escapeHtml(guide.title)}</h3>
          <p>${escapeHtml(guide.body)}</p>
          <div class="concept-chip-list">
            ${guide.chips.map((chip) => `<span class="concept-chip">${escapeHtml(chip)}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

/** 화면 전환 */
function setView(viewName) {
  if (!views[viewName]) return;

  if (viewName !== "rules") closeRuleUnit();
  if (viewName !== "yaku") closeYakuUnit();

  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewName));

  const floatingHome = document.getElementById("floatingHomeBtn");
  if (floatingHome) floatingHome.hidden = viewName === "dashboard";

  if (viewName === "dashboard") renderDailyQuiz();
  if (viewName === "rules") renderRules();
  if (viewName === "yaku") renderYaku();
  if (viewName === "tiles") markTilesSeen();
  if (viewName === "score") markScoreSeen();
  if (viewName === "play") renderPlay();

  renderPartProgressBars();

  const activeView = document.getElementById(viewName);
  activeView?.scrollTo?.({ top: 0, behavior: "smooth" });
}

function getFilteredParlors(regionId = activeParlorRegion) {
  if (regionId === "all") return mahjongParlors;
  return mahjongParlors.filter((parlor) => parlor.region === regionId);
}

function renderParlorRegionBar() {
  const bar = document.getElementById("parlorRegionBar");
  if (!bar) return;

  bar.innerHTML = parlorRegions
    .map(
      (region) => `
        <button
          type="button"
          class="parlor-region-chip ${region.id === activeParlorRegion ? "active" : ""}"
          data-region="${region.id}"
          role="tab"
          aria-selected="${region.id === activeParlorRegion}"
        >${escapeHtml(region.name)}</button>
      `,
    )
    .join("");
}

function renderParlorList() {
  const list = document.getElementById("parlorList");
  const countEl = document.getElementById("parlorCount");
  if (!list) return;

  const filtered = getFilteredParlors();
  const regionName = parlorRegions.find((r) => r.id === activeParlorRegion)?.name ?? "전국";

  if (countEl) {
    countEl.textContent =
      filtered.length > 0 ? `${regionName} ${filtered.length}곳` : `${regionName}에 등록된 마장이 없습니다`;
  }

  if (filtered.length === 0) {
    list.innerHTML = `
      <article class="parlor-card parlor-card--empty">
        <p>아직 이 지역 마장 정보가 없습니다.</p>
        <p class="parlor-card-note"><code>parlors.js</code>에 항목을 추가하면 여기에 표시됩니다.</p>
      </article>
    `;
    return;
  }

  list.innerHTML = filtered
    .map(
      (parlor, index) => `
        <article class="parlor-card" data-parlor-index="${index}">
          <button type="button" class="parlor-card-header" aria-expanded="false">
            <div class="parlor-card-head">
              <h3>${escapeHtml(parlor.name)}</h3>
              ${parlor.district ? `<span class="parlor-district">${escapeHtml(parlor.district)}</span>` : ""}
            </div>
            <span class="parlor-expand-icon" aria-hidden="true">▼</span>
          </button>
          <div class="parlor-card-details">
            ${parlor.address ? `<p class="parlor-address">${escapeHtml(parlor.address)}</p>` : ""}
            ${parlor.hours ? `<p class="parlor-meta"><strong>영업</strong> ${escapeHtml(parlor.hours)}</p>` : ""}
            ${parlor.phone ? `<p class="parlor-meta"><strong>연락</strong> <a href="tel:${escapeHtml(parlor.phone.replace(/\s/g, ""))}">${escapeHtml(parlor.phone)}</a></p>` : ""}
            ${
              parlor.url
                ? `<p class="parlor-meta"><strong>링크</strong> <a href="${escapeHtml(parlor.url)}" target="_blank" rel="noopener noreferrer">홈페이지·지도</a></p>`
                : ""
            }
            ${
              parlor.tags?.length
                ? `<div class="concept-chip-list">${parlor.tags.map((tag) => `<span class="concept-chip">${escapeHtml(tag)}</span>`).join("")}</div>`
                : ""
            }
            ${parlor.note ? `<p class="parlor-card-note">${escapeHtml(parlor.note)}</p>` : ""}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderPlay() {
  renderParlorRegionBar();
  renderParlorList();
}

function renderTileCatalog() {
  const intro = `
    <article class="tile-group tile-intro-group">
      <h3>패의 분류</h3>
      <p>수패(만수패·통수패·삭수패)는 각 1~9, 자패는 풍패(동남서북)와 삼원패(백발중)입니다. 모든 패는 각 4장씩 있습니다.</p>
      <p><strong>요구패</strong> — 1·9 수패와 자패(풍·삼원)를 말합니다. 역 판단·퀴즈에서 자주 셉니다.</p>
      <p><strong>중장패</strong> — 2~8 수패를 말합니다. 탕야오·핑후 등 역과도 연결됩니다.</p>
      <div class="concept-chip-list">
        <span class="concept-chip">만수패·통수패·삭수패</span>
        <span class="concept-chip">풍패 동남서북</span>
        <span class="concept-chip">삼원 백발중</span>
      </div>
    </article>
  `;

  document.getElementById("tileCatalog").innerHTML =
    intro +
    tileGroups
      .map(
        (group) => `
        <article class="tile-group">
          <h3>${escapeHtml(group.title)}</h3>
          <p>${escapeHtml(group.description)}</p>
          <div class="hand-row" aria-label="${escapeHtml(group.title)} 패 목록">${group.tiles.map(tileMarkup).join("")}</div>
        </article>
      `,
      )
      .join("");
}

/** 역 단원 목록 렌더링 */
function renderYakuUnitList() {
  const list = document.getElementById("yakuUnitList");
  if (!list) return;

  list.innerHTML = yakuCategories
    .map(
      (category, index) => `
        <button
          class="rule-unit-button ${index === activeYakuUnitIndex && yakuUnitOpen ? "active" : ""}"
          data-index="${index}"
          type="button"
          aria-pressed="${index === activeYakuUnitIndex && yakuUnitOpen}"
        >
          <strong>${escapeHtml(category.step)} · ${escapeHtml(category.title)}</strong>
          <small>${escapeHtml(category.short)}</small>
        </button>
      `,
    )
    .join("");
}

function openYakuUnit(index) {
  const listPanel = document.getElementById("yakuListPanel");
  const detailPanel = document.getElementById("yakuDetailPanel");
  const category = yakuCategories[index];
  if (!listPanel || !detailPanel || !category) return;

  activeYakuUnitIndex = index;
  yakuUnitOpen = true;

  listPanel.hidden = true;
  detailPanel.hidden = false;

  document.querySelectorAll("#yakuUnitList .rule-unit-button").forEach((button, i) => {
    const isActive = i === index;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  markYakuCategorySeen(index);
  renderYakuDetail(index);
  renderPartProgressBars();
  document.getElementById("yaku")?.scrollTo({ top: 0, behavior: "smooth" });
}

function closeYakuUnit() {
  const listPanel = document.getElementById("yakuListPanel");
  const detailPanel = document.getElementById("yakuDetailPanel");
  if (!listPanel || !detailPanel) return;

  yakuUnitOpen = false;
  listPanel.hidden = false;
  detailPanel.hidden = true;
  document.querySelectorAll("#yakuUnitList .rule-unit-button").forEach((button) => {
    button.classList.remove("active");
    button.setAttribute("aria-pressed", "false");
  });
}

/** yaku 뷰: 단원 목록 초기화 */
function renderYaku() {
  closeYakuUnit();
  renderYakuUnitList();
}

function renderYakuDetail(index) {
  const category = yakuCategories[index];
  const container = document.getElementById("yakuDetail");
  if (!category || !container) return;

  if (category.kind === "intro") {
    container.innerHTML = `
      <p class="eyebrow">${escapeHtml(category.step)}</p>
      <h2>${escapeHtml(category.title)}</h2>
      <p>${escapeHtml(category.intro)}</p>
      <div class="concept-chip-list">
        ${(category.chips || [])
          .map((chip) => `<span class="concept-chip">${escapeHtml(chip)}</span>`)
          .join("")}
      </div>
    `;
    return;
  }

  if (category.kind === "wait") {
    container.innerHTML = `
      <p class="eyebrow">${escapeHtml(waitGuide.eyebrow)}</p>
      <h2>${escapeHtml(waitGuide.title)}</h2>
      <p>${escapeHtml(waitGuide.body)}</p>
      <ul class="wait-list">
        ${waitGuide.items
          .map(
            (item) => `
              <li>
                <strong>${escapeHtml(item.name)}</strong>
                <span>${escapeHtml(item.short)}</span>
              </li>
            `,
          )
          .join("")}
      </ul>
    `;
    return;
  }

  container.innerHTML = `
    <p class="eyebrow">${escapeHtml(category.step)}</p>
    <h2>${escapeHtml(category.title)}</h2>
    <p>${escapeHtml(category.intro)}</p>
    <div class="yaku-items">
      ${(category.items || [])
        .map(
          (item) => `
            <section class="yaku-stage">
              <div class="yaku-stage-header">
                <div>
                  <strong>${escapeHtml(item.name)}</strong>
                  <small>${escapeHtml(item.han)} · ${escapeHtml(item.rule)}</small>
                </div>
                <span class="yaku-tag ${item.closedOnly ? "closed" : "open"}">${escapeHtml(item.open)}</span>
              </div>
              <div class="hand-row" aria-label="${escapeHtml(item.name)} 예시 패">${item.tiles.map(tileMarkup).join("")}</div>
              <p class="yaku-tip">${escapeHtml(item.tip)}</p>
            </section>
          `,
        )
        .join("")}
    </div>
  `;
}

/** 현재 퀴즈 문항 렌더링 (tiles가 비어 있으면 손패 영역 숨김) */
function renderQuiz() {
  const quiz = resolveQuizPayload(quizzes[currentQuiz], currentQuiz + 1);
  answered = false;

  document.getElementById("quizCount").textContent = `문제 ${currentQuiz + 1} / ${quizzes.length}`;
  document.getElementById("quizScore").textContent = `정답 ${quizScore}`;
  document.getElementById("quizQuestion").textContent = quiz.question;

  const quizTiles = document.getElementById("quizTiles");
  const tileList = Array.isArray(quiz.tiles) ? quiz.tiles : [];
  const hasTiles = tileList.length > 0;
  if (quizTiles) {
    quizTiles.innerHTML = hasTiles ? tileList.map(tileMarkup).join("") : "";
    quizTiles.hidden = !hasTiles;
    quizTiles.classList.toggle("is-empty", !hasTiles);
  }
  document.getElementById("feedback").textContent = "";
  document.getElementById("nextQuiz").textContent = currentQuiz === quizzes.length - 1 ? "처음부터" : "다음";
  document.getElementById("answerGrid").innerHTML = quiz.answers
    .map((answer, index) => `<button type="button" data-index="${index}">${escapeHtml(answer)}</button>`)
    .join("");
}

function answerQuiz(index) {
  if (answered) return;
  answered = true;

  const quiz = resolveQuizPayload(quizzes[currentQuiz], currentQuiz + 1);
  const buttons = document.querySelectorAll("#answerGrid button");
  buttons.forEach((button) => (button.disabled = true));
  buttons[quiz.correct].classList.add("correct");

  if (index === quiz.correct) {
    quizScore += 1;
    document.getElementById("feedback").textContent = `정답! ${quiz.explanation}`;
  } else {
    buttons[index]?.classList.add("wrong");
    document.getElementById("feedback").textContent = `아쉬워요. ${quiz.explanation}`;
  }

  document.getElementById("quizScore").textContent = `정답 ${quizScore}`;
  markQuizQuestionSeen(currentQuiz);
  renderPartProgressBars();
}

function nextQuiz() {
  currentQuiz = (currentQuiz + 1) % quizzes.length;
  if (currentQuiz === 0) quizScore = 0;
  renderQuiz();
}

function calculateScore() {
  const han = Number(document.getElementById("hanInput").value);
  const fu = Number(document.getElementById("fuInput").value);
  const capped = han >= 5;
  const base = capped ? 2000 : fu * Math.pow(2, han + 2);
  const ron = capped ? 8000 : Math.ceil((base * 4) / 100) * 100;
  const dealerTsumo = capped ? 4000 : Math.ceil((base * 2) / 100) * 100;
  const childTsumo = capped ? 2000 : Math.ceil(base / 100) * 100;

  document.getElementById("hanValue").textContent = `${han}판`;
  document.getElementById("fuValue").textContent = `${fu}부`;
  document.getElementById("ronScore").textContent = `${ron.toLocaleString("ko-KR")}점`;
  document.getElementById("tsumoScore").textContent = `${dealerTsumo.toLocaleString("ko-KR")} / ${childTsumo.toLocaleString("ko-KR")}점`;
  document.getElementById("scoreNote").textContent = capped
    ? "5판 이상은 만관 기준입니다. 본장·도라 등은 추가로 더해집니다"
    : "친·자 구분, 본장, 도라 등은 추가로 더해집니다";
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (!button) return;
  setView(button.dataset.view);
});

document.getElementById("answerGrid").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) answerQuiz(Number(button.dataset.index));
});

document.getElementById("appBarLogo")?.addEventListener("click", () => setView("dashboard"));
document.getElementById("floatingHomeBtn")?.addEventListener("click", () => setView("dashboard"));

document.getElementById("parlorRegionBar")?.addEventListener("click", (event) => {
  const chip = event.target.closest(".parlor-region-chip");
  if (!chip) return;
  activeParlorRegion = chip.dataset.region || "all";
  renderPlay();
});

document.getElementById("parlorList")?.addEventListener("click", (event) => {
  const header = event.target.closest(".parlor-card-header");
  if (!header) return;
  
  const card = header.closest(".parlor-card");
  const details = card.querySelector(".parlor-card-details");
  const isExpanded = header.getAttribute("aria-expanded") === "true";
  
  header.setAttribute("aria-expanded", !isExpanded);
  card.classList.toggle("parlor-card--expanded", !isExpanded);
  
  if (!isExpanded) {
    details.style.maxHeight = details.scrollHeight + "px";
  } else {
    details.style.maxHeight = "0";
  }
});

document.getElementById("ruleUnitList")?.addEventListener("click", (event) => {
  const button = event.target.closest(".rule-unit-button");
  if (button) openRuleUnit(Number(button.dataset.index));
});

document.getElementById("rulesBackLink")?.addEventListener("click", closeRuleUnit);

document.getElementById("yakuUnitList")?.addEventListener("click", (event) => {
  const button = event.target.closest(".rule-unit-button");
  if (button) openYakuUnit(Number(button.dataset.index));
});

document.getElementById("yakuBackLink")?.addEventListener("click", closeYakuUnit);
document.getElementById("nextQuiz").addEventListener("click", nextQuiz);
document.getElementById("hanInput").addEventListener("input", () => {
  markScoreSeen();
  calculateScore();
  renderPartProgressBars();
});
document.getElementById("fuInput").addEventListener("input", () => {
  markScoreSeen();
  calculateScore();
  renderPartProgressBars();
});
document.getElementById("dailyAnswerGrid")?.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) answerDailyQuiz(Number(button.dataset.index));
});

renderAppBarLogo();
renderPlay();
renderTileCatalog();
renderYaku();
renderRules();
renderScoreGuides();
renderDailyQuiz();
renderQuiz();
calculateScore();
renderPartProgressBars();
