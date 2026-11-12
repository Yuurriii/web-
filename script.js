
// ===================================
// Mellow Café
// ゲームの設定
// ===================================

// ドリンクのレシピ
const recipes = [
  { name: "カフェラテ", character: "bear", needs: ["coffee", "milk"] },
  { name: "ストロベリーミルク", character: "bunny", needs: ["strawberry", "milk"] },
  { name: "抹茶ラテ", character: "frog", needs: ["matcha", "milk"] },
  { name: "チョコアイス", character: "cat", needs: ["chocolate", "ice"] },
  { name: "アイスコーヒー", character: "panda", needs: ["coffee", "ice"] },
  { name: "ミルクチョコレート", character: "bear", needs: ["chocolate", "milk"] },
  { name: "ミルクティー", character: "bunny", needs: ["tea", "milk"] },
  { name: "いちごミルクティー", character: "cat", needs: ["tea", "strawberry", "milk"] },
  { name: "ハニーミルク", character: "panda", needs: ["honey", "milk"] },
  { name: "レモンティー", character: "frog", needs: ["tea", "lemon", "ice"] },
  { name: "チョコレートミルクシェイク", character: "bear", needs: ["chocolate", "milk", "ice"] },
  { name: "ストロベリーシェイク", character: "bunny", needs: ["strawberry", "milk", "ice"] }
];


// ===================================
// 材料
// ===================================

const ingredientData = {
  coffee: { name: "コーヒー", emoji: "☕" },
  milk: { name: "ミルク", emoji: "🥛" },
  strawberry: { name: "いちご", emoji: "🍓" },
  matcha: { name: "抹茶", emoji: "🍵" },
  chocolate: { name: "チョコ", emoji: "🍫" },
  ice: { name: "氷", emoji: "🧊" },
  tea: { name: "紅茶", emoji: "🫖" },
  honey: { name: "はちみつ", emoji: "🍯" },
  lemon: { name: "レモン", emoji: "🍋" }
};


// ===================================
// お店で購入できるアイテム
// ===================================

const itemData = {
  flower: {
    emoji: "🌷",
    name: "お花",
    cost: 4
  },
  lamp: {
    emoji: "🪔",
    name: "ランプ",
    cost: 6
  },
  cat: {
    emoji: "🐈",
    name: "ねこ店員",
    cost: 8
  },
  cake: {
    emoji: "🍰",
    name: "ケーキ棚",
    cost: 10
  }
};


// ===================================
// ゲームデータ・セーブ
// ===================================

let state;

try {
  state = JSON.parse(
    localStorage.getItem("littlePixelCafe") || "null"
  );
} catch (error) {
  state = null;
}

if (
  !state ||
  typeof state !== "object" ||
  !Array.isArray(state.owned)
) {
  state = {
    points: 0,
    day: 1,
    happy: 0,
    served: 0,
    owned: []
  };
}

// 古いコインデータをポイントに変換
if (state.points === undefined) {
  state.points = 0;
}

if (state.coins !== undefined) {
  state.points = Math.floor(state.coins / 5);
  delete state.coins;
}

// 古いデータの不足項目を補う
state.day = state.day || 1;
state.happy = state.happy || 0;
state.served = state.served || 0;

let selected = [];
let current = null;

// カウントダウン設定
let timeLeft = 3;
let countdownInterval = null;

// タイマー表示
function updateTimer() {
  $("timer").textContent = timeLeft;

  // 残り10秒以下で赤くする
  document.querySelector(".timer").classList.toggle(
    "warning",
    timeLeft <= 10
  );
}

// タイマー開始
function startCountdown() {
  clearInterval(countdownInterval);

  timeLeft = 10;
  updateTimer();

  countdownInterval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      timeUp();
    }
  }, 1000);
}

// 時間切れ
function timeUp() {
  current = null;

  $("message").textContent =
    "時間切れ！次のお客さんを迎えよう！";

  $("orderText").textContent =
    "ドリンクが間に合わなかったみたい...";

  document.querySelectorAll(".ingredient").forEach(btn => {
    btn.disabled = true;
  });

  $("serve").disabled = true;

  setTimeout(() => {
    $("serve").disabled = false;
    newOrder();
  }, 1500);
}

let finished = false;

const $ = id => document.getElementById(id);


// ===================================
// セーブ機能
// ===================================

function save() {
  localStorage.setItem(
    "littlePixelCafe",
    JSON.stringify(state)
  );
}


// ===================================
// お客さんの画像
// ===================================

function showCustomer(happy = false) {

  const imageMap = {
    bear: "bear.png",
    bunny: "bunny.png",
    frog: "frog.png",
    cat: "cat.png",
    panda: "panda.png"
  };

  const image = imageMap[current.character];

  if (!image) {
    $("customer").textContent = "画像が見つかりません";
    return;
  }

  $("customer").innerHTML = `
    <img
      src="images/${image}"
      alt="Mellow Caféのお客さん"
      class="${happy ? "customer-happy" : ""}"
      onerror="this.outerHTML='<p style=&quot;color:#b66&quot;>画像を読み込めません</p>'"
    >
  `;
}


// ===================================
// 材料ボタンを自動で作る
// ===================================

function createIngredients() {

  const container = $("ingredients");

  if (!container) return;

  container.innerHTML = "";

  Object.entries(ingredientData).forEach(([key, item]) => {

    const button = document.createElement("button");

    button.className = "ingredient";
    button.dataset.value = key;
    button.textContent = `${item.emoji} ${item.name}`;

    button.addEventListener("click", () => {

      if (finished) return;

      if (selected.includes(key)) {

        selected = selected.filter(x => x !== key);
        button.classList.remove("selected");

      } else {

        selected.push(key);
        button.classList.add("selected");

      }

    });

    container.appendChild(button);
  });
}


// ===================================
// ショップを自動で作る
// ===================================

function createShop() {

  const container = $("shopItems");

  if (!container) return;

  container.innerHTML = "";

  Object.entries(itemData).forEach(([key, item]) => {

    const button = document.createElement("button");

    button.dataset.item = key;
    button.dataset.cost = item.cost;

    button.addEventListener("click", () => {
      buyItem(key);
    });

    container.appendChild(button);
  });
}


// ===================================
// 画面の更新
// ===================================

function update() {

  $("coins").textContent = state.points;
  $("day").textContent = state.day;
  $("happy").textContent = state.happy;

  const pointLabel = $("pointLabel");

  if (pointLabel) {
    pointLabel.textContent = "POINT";
  }

  // デコレーションの進行状況
  $("progressBar").style.width =
    (state.owned.length / 4 * 100) + "%";

  $("growthText").textContent =
    state.owned.length === 4
      ? "Mellow Caféが完成したよ！♡"
      : `デコレーション ${state.owned.length}/4 個`;

  // お花の表示
  $("scenePlant").textContent =
    state.owned.includes("flower") ? "🌷" : "🪴";

  // ショップの購入状態
  Object.entries(itemData).forEach(([key, item]) => {

    const button = document.querySelector(
      `#shopItems button[data-item="${key}"]`
    );

    if (!button) return;

    const owned = state.owned.includes(key);

    button.classList.toggle("owned", owned);

    button.disabled =
      owned || state.points < item.cost;

    button.innerHTML = `
      <span>${item.emoji}</span>
      ${item.name}<br>
      ${owned ? "飾りつけ済み" : item.cost + " POINT"}
    `;
  });

  // お店の飾り付けを表示
  const decorations = $("sceneDecorations");

  if (decorations) {

    decorations.innerHTML = "";

    state.owned.forEach(key => {

      const item = itemData[key];

      if (item) {

        const decoration = document.createElement("span");

        decoration.className = "decoration";
        decoration.textContent = item.emoji;
        decoration.title = item.name;

        decorations.appendChild(decoration);
      }

    });
  }

  save();
}


// ===================================
// 新しい注文
// ===================================

function newOrder() {

  current = recipes[
    Math.floor(Math.random() * recipes.length)
  ];

  selected = [];
  finished = false;

  // 材料の選択をリセット
  document.querySelectorAll(".ingredient").forEach(btn => {
    btn.classList.remove("selected");
    btn.disabled = false;
  });

  // お客さんの画像を表示
  showCustomer(false);

  // 注文を表示（ヒントなし）
  $("orderText").textContent =
    `「${current.name}をひとつお願いします！」`;

  $("message").textContent =
    "材料を選んでドリンクを作ろう！";

  $("serve").textContent = "できあがり！";
  $("serve").disabled = false;
  startCountdown();
}


// ===================================
// やりなおしボタン
// ===================================

$("clear").addEventListener("click", () => {

  if (finished) return;

  selected = [];

  document.querySelectorAll(".ingredient").forEach(btn => {
    btn.classList.remove("selected");
  });

  $("message").textContent =
    "材料を選びなおしてね。";
});


// ===================================
// ドリンクを完成させる・NEXT
// ===================================

$("serve").addEventListener("click", () => {

  // 正解後はNEXTボタンになる
  if (finished) {
    newOrder();
    return;
  }

  if (!current) return;

  // 正解判定
  const correct =
    selected.length === current.needs.length &&
    current.needs.every(x => selected.includes(x));

  if (correct) {
    clearInterval(countdownInterval);

    // ポイントと幸福度を追加
    state.points += 2;
    state.happy += 1;
    state.served += 1;

    finished = true;

    $("message").textContent =
      "大正解！おいしい〜！ +2 POINT ♡";

    $("orderText").textContent =
      `${current.name} が完成！お客さんが笑顔になったよ。`;

    // お客さんの画像を表示
    showCustomer(true);

    // 材料を選べなくする
    document.querySelectorAll(".ingredient").forEach(btn => {
      btn.disabled = true;
    });

    // NEXTボタンに変更
    $("serve").textContent = "NEXT";

    // 5回接客すると1日進む
    if (state.served % 5 === 0) {

      state.day += 1;

      $("message").textContent +=
        " 新しい一日が始まったよ！";
    }

    update();

  } else {

    $("message").textContent =
      "あれれ？材料がちがうみたい。もう一度！";
  }

});


// ===================================
// アイテム購入
// ===================================

function buyItem(key) {

  const item = itemData[key];

  if (!item) return;

  if (
    state.owned.includes(key) ||
    state.points < item.cost
  ) {
    return;
  }

  // ポイントを消費
  state.points -= item.cost;

  // 購入済みにする
  state.owned.push(key);

  $("message").textContent =
    `${item.name}を飾ったよ！お店がかわいくなったね ✿`;

  update();
}


// ===================================
// ゲームスタート
// ===================================

createIngredients();
createShop();
update();
newOrder();
