const views = {
  dashboard: "오늘 학습",
  tiles: "패 익히기",
  yaku: "역 단계",
  quiz: "퀴즈",
  score: "점수",
};

const heroHand = ["m2", "m3", "m4", "p5", "p6", "p7", "s6", "s7", "s8", "z5", "z5"];

const tileGroups = [
  {
    title: "만수",
    description: "1만~9만. 같은 패는 4장씩 있습니다.",
    tiles: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9"],
  },
  {
    title: "통수",
    description: "1통~9통. 같은 패는 4장씩 있습니다.",
    tiles: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9"],
  },
  {
    title: "삭수",
    description: "1삭~9삭. 같은 패는 4장씩 있습니다.",
    tiles: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"],
  },
  {
    title: "자패",
    description: "동남서북, 백발중. 각 4장씩 있습니다.",
    tiles: ["z1", "z2", "z3", "z4", "z5", "z6", "z7"],
  },
  {
    title: "적도라",
    description: "빨간 5. 역은 아니고 보너스 1판입니다.",
    tiles: ["m5r", "p5r", "s5r"],
  },
];

const yakuCategories = [
  {
    step: "1단계",
    title: "화료 조건",
    short: "역이 하나는 있어야 납니다.",
    intro: "처음에는 '이 손으로 날 수 있는가'부터 봅니다.",
    items: [
      {
        name: "리치",
        han: "1판",
        rule: "울지 않고 텐파이하면 선언",
        tiles: ["m2", "m3", "m4", "p5", "p6", "p7", "s6", "s7", "s8", "z5", "z5"],
      },
      {
        name: "역패",
        han: "1판",
        rule: "백, 발, 중 또는 조건 바람패 3장",
        tiles: ["z7", "z7", "z7", "p2", "p3", "p4", "m7", "m8", "m9", "s5", "s5"],
      },
    ],
  },
  {
    step: "2단계",
    title: "울어도 되는 빠른 역",
    short: "초반 실전에서 가장 자주 씁니다.",
    intro: "속도를 낼 수 있지만 방어가 약해질 수 있습니다.",
    items: [
      {
        name: "탕야오",
        han: "1판",
        rule: "1, 9, 자패 없이 2~8만 사용",
        tiles: ["m2", "m3", "m4", "p3", "p4", "p5", "s6", "s7", "s8", "p2", "p2"],
      },
      {
        name: "혼일색",
        han: "3판",
        rule: "한 종류 수패와 자패만 사용",
        tiles: ["m1", "m2", "m3", "m4", "m5", "m6", "z1", "z1", "z1", "z5", "z5"],
      },
    ],
  },
  {
    step: "3단계",
    title: "멘젠 중심 역",
    short: "울지 않을 때 가치가 큽니다.",
    intro: "리치와 함께 붙는 역을 먼저 익히면 좋습니다.",
    items: [
      {
        name: "핑후",
        han: "1판",
        rule: "몸통이 모두 슌쯔, 양면 대기",
        tiles: ["m2", "m3", "m4", "p3", "p4", "p5", "s6", "s7", "s8", "z2", "z2"],
      },
      {
        name: "멘젠쯔모",
        han: "1판",
        rule: "울지 않고 직접 뽑아 화료",
        tiles: ["m3", "m4", "m5", "p6", "p7", "p8", "s2", "s3", "s4", "z2", "z2"],
      },
    ],
  },
  {
    step: "4단계",
    title: "모양으로 보는 역",
    short: "손패 모양이 힌트입니다.",
    intro: "몸통이 안 보일 때는 특수 형태를 의심합니다.",
    items: [
      {
        name: "치또이츠",
        han: "2판",
        rule: "서로 다른 또이츠 7쌍",
        tiles: ["m1", "m1", "p4", "p4", "s7", "s7", "z1", "z1", "z5", "z5", "z7", "z7"],
      },
      {
        name: "또이또이",
        han: "2판",
        rule: "커쯔 4개와 머리",
        tiles: ["m3", "m3", "m3", "p7", "p7", "p7", "s2", "s2", "s2", "z6", "z6"],
      },
    ],
  },
  {
    step: "5단계",
    title: "고타점 후보",
    short: "조건이 선명할 때 노립니다.",
    intro: "색, 숫자, 자패가 강하게 몰리면 타점 역을 봅니다.",
    items: [
      {
        name: "청일색",
        han: "6판",
        rule: "한 종류 수패만 사용",
        tiles: ["p1", "p2", "p3", "p3", "p4", "p5", "p5", "p6", "p7", "p8", "p8"],
      },
      {
        name: "혼노두",
        han: "2판",
        rule: "1, 9, 자패만 사용",
        tiles: ["m1", "m1", "m9", "m9", "p1", "p1", "s9", "s9", "z1", "z1", "z7", "z7"],
      },
    ],
  },
];

const quizzes = [
  {
    question: "가장 쉬운 역은?",
    tiles: ["m2", "m3", "m4", "p3", "p4", "p5", "s6", "s7", "s8", "p2", "p2"],
    answers: ["탕야오", "혼일색", "역패", "치또이츠"],
    correct: 0,
    explanation: "1, 9, 자패가 없습니다.",
  },
  {
    question: "중 3장은 어떤 역?",
    tiles: ["z7", "z7", "z7", "p2", "p3", "p4", "m7", "m8", "m9", "s5", "s5"],
    answers: ["역패", "핑후", "탕야오", "리치"],
    correct: 0,
    explanation: "중은 삼원패입니다.",
  },
  {
    question: "짝 7개 역은?",
    tiles: ["m1", "m1", "p4", "p4", "s7", "s7", "z1", "z1", "z5", "z5", "z7", "z7"],
    answers: ["치또이츠", "리치", "혼일색", "핑후"],
    correct: 0,
    explanation: "또이츠 7쌍입니다.",
  },
  {
    question: "멘젠 텐파이 역은?",
    tiles: ["m3", "m4", "m5", "p6", "p7", "p8", "s2", "s3", "s4", "z2", "z2"],
    answers: ["리치", "역패", "혼일색", "탕야오"],
    correct: 0,
    explanation: "닫힌 텐파이면 리치입니다.",
  },
];

const tileMeta = {
  m: { suit: "man", prefix: "MJw", suitText: "萬", values: ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"] },
  p: { suit: "pin", prefix: "MJt", suitText: "筒" },
  s: { suit: "sou", prefix: "MJs", suitText: "索" },
  z: { suit: "honor", values: ["", "東", "南", "西", "北", "白", "發", "中"] },
};

const honorFiles = {
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
const completed = new Set(readCompleted());

function readCompleted() {
  try {
    return JSON.parse(localStorage.getItem("manyfastCompleted") || "[]");
  } catch (error) {
    return [];
  }
}

function writeCompleted() {
  try {
    localStorage.setItem("manyfastCompleted", JSON.stringify([...completed]));
  } catch (error) {
    // Some file:// browser contexts block storage. Navigation should still work.
  }
}

function tileMarkup(code) {
  const suitKey = code[0];
  const isRed = code.endsWith("r");
  const value = Number(code.replace("r", "").slice(1));
  const meta = tileMeta[suitKey];
  const label = suitKey === "z" ? meta.values[value] : `${value}${meta.suitText}`;
  const fileName = getTileFileName(suitKey, value, isRed);
  const src = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}`;
  const face = `<img class="tile-img" src="${src}" alt="" loading="lazy" decoding="async">`;

  return `<span class="tile ${meta.suit} tile-${code} ${isRed ? "red-dora" : ""}" aria-label="${isRed ? "적도라 " : ""}${label}">${face}</span>`;
}

function getTileFileName(suitKey, value, isRed) {
  if (suitKey === "z") {
    return honorFiles[`z${value}`];
  }
  const meta = tileMeta[suitKey];
  return `${meta.prefix}${value}${isRed ? "r" : ""}-.svg`;
}

function renderHand(elementId, tiles) {
  document.getElementById(elementId).innerHTML = tiles.map(tileMarkup).join("");
}

function setView(viewName) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewName));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  document.getElementById("viewTitle").textContent = views[viewName];
  completed.add(viewName);
  saveProgress();
}

function saveProgress() {
  writeCompleted();
  const percent = Math.min(100, Math.round((completed.size / Object.keys(views).length) * 100));
  document.getElementById("progressFill").style.width = `${percent}%`;
  document.getElementById("progressText").textContent = `${percent}%`;
}

function renderTileCatalog() {
  document.getElementById("tileCatalog").innerHTML = tileGroups
    .map(
      (group) => `
        <article class="tile-group">
          <h3>${group.title}</h3>
          <p>${group.description}</p>
          <div class="hand-row">${group.tiles.map(tileMarkup).join("")}</div>
        </article>
      `,
    )
    .join("");
}

function renderYakuList() {
  const list = document.getElementById("yakuList");
  list.innerHTML = yakuCategories
    .map(
      (category, index) => `
        <button class="yaku-button ${index === 0 ? "active" : ""}" data-index="${index}" type="button">
          <span><strong>${category.step} · ${category.title}</strong><br><small>${category.short}</small></span>
          <strong>${category.items.length}개</strong>
        </button>
      `,
    )
    .join("");
  list.addEventListener("click", (event) => {
    const button = event.target.closest(".yaku-button");
    if (!button) return;
    document.querySelectorAll(".yaku-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderYakuDetail(Number(button.dataset.index));
  });
  renderYakuDetail(0);
}

function renderYakuDetail(index) {
  const category = yakuCategories[index];
  document.getElementById("yakuDetail").innerHTML = `
    <p class="eyebrow">${category.step}</p>
    <h2>${category.title}</h2>
    <p>${category.intro}</p>
    <div class="yaku-items">
      ${category.items
        .map(
          (item) => `
            <section class="yaku-stage">
              <div>
                <strong>${item.name}</strong>
                <small>${item.han} · ${item.rule}</small>
              </div>
              <div class="hand-row">${item.tiles.map(tileMarkup).join("")}</div>
            </section>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderQuiz() {
  const quiz = quizzes[currentQuiz];
  answered = false;
  document.getElementById("quizCount").textContent = `문제 ${currentQuiz + 1} / ${quizzes.length}`;
  document.getElementById("quizScore").textContent = `정답 ${quizScore}`;
  document.getElementById("quizQuestion").textContent = quiz.question;
  document.getElementById("quizTiles").innerHTML = quiz.tiles.map(tileMarkup).join("");
  document.getElementById("feedback").textContent = "";
  document.getElementById("answerGrid").innerHTML = quiz.answers
    .map((answer, index) => `<button type="button" data-index="${index}">${answer}</button>`)
    .join("");
}

function answerQuiz(index) {
  if (answered) return;
  answered = true;
  const quiz = quizzes[currentQuiz];
  const buttons = document.querySelectorAll("#answerGrid button");
  buttons[quiz.correct].classList.add("correct");
  if (index === quiz.correct) {
    quizScore += 1;
  } else {
    buttons[index].classList.add("wrong");
  }
  document.getElementById("quizScore").textContent = `정답 ${quizScore}`;
  document.getElementById("feedback").textContent = quiz.explanation;
  completed.add("quiz");
  saveProgress();
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
  document.getElementById("scoreNote").textContent = capped ? "5판 이상은 만관부터 봅니다." : "먼저 대략값만 익힙니다.";
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

document.getElementById("backButton").addEventListener("click", () => setView("dashboard"));
document.getElementById("nextQuiz").addEventListener("click", nextQuiz);
document.getElementById("hanInput").addEventListener("input", calculateScore);
document.getElementById("fuInput").addEventListener("input", calculateScore);
document.getElementById("resetProgress").addEventListener("click", () => {
  completed.clear();
  try {
    localStorage.removeItem("manyfastCompleted");
  } catch (error) {
    // Ignore blocked storage.
  }
  saveProgress();
});

renderHand("heroHand", heroHand);
renderTileCatalog();
renderYakuList();
renderQuiz();
calculateScore();
saveProgress();
